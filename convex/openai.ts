('use node');

import OpenAI from 'openai';
import { action, internalMutation, internalQuery } from './_generated/server';
import { v } from 'convex/values';
import { internal } from './_generated/api';

const apiKey = process.env.OPENAI_API_KEY!;
const openai = new OpenAI({ apiKey });

export const chat = action({
  args: {
    id: v.id('notes'),
  },
  handler: async (ctx, args) => {
    const transcript = await ctx.runQuery(internal.openai.getTranscript, {
      id: args.id,
    });

    console.log({ transcript });

    const prompt = `Take in the following transcript and return a summary of it from the first person point of view of the person speaking, a list of extracted action items from it, and a short title for the transcript. Here is the transcript: ${transcript}`;

    const output = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant designed to output JSON in this format: {summary: string, actionItems: string[], title: string}',
        },
        { role: 'user', content: prompt },
      ],
      model: 'gpt-4-1106-preview',
      response_format: { type: 'json_object' },
    });

    // Pull the message content out of the response
    const messageContent = output.choices[0].message.content;

    console.log({ messageContent });

    const parsedOutput = JSON.parse(messageContent!);
    console.log({ parsedOutput });

    await ctx.runMutation(internal.openai.saveSummary, {
      id: args.id,
      summary: parsedOutput.summary,
      actionItems: parsedOutput.actionItems,
      title: parsedOutput.title,
    });
  },
});

export const getTranscript = internalQuery({
  args: {
    id: v.id('notes'),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    const note = await ctx.db.get(id);
    return note?.transcription;
  },
});

export const saveSummary = internalMutation({
  args: {
    id: v.id('notes'),
    summary: v.string(),
    title: v.string(),
    actionItems: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, summary, actionItems, title } = args;
    await ctx.db.patch(id, {
      summary: summary,
      title: title,
    });

    let note = await ctx.db.get(id);

    for (let actionItem of actionItems) {
      await ctx.db.insert('actionItems', {
        task: actionItem,
        noteId: id,
        userId: note!.userId,
      });
    }
  },
});
