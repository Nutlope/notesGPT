('use node');

import OpenAI from 'openai';
import { action } from './_generated/server';
import { v } from 'convex/values';
import { api } from '../convex/_generated/api';

const apiKey = process.env.OPENAI_API_KEY!;
const openai = new OpenAI({ apiKey });

export const chat = action({
  args: {
    transcript: v.string(),
    id: v.id('notes'),
  },
  handler: async (ctx, args) => {
    const prompt = `Take in the following transcript and return a summary of it from the first person point of view of the person speaking and a list of extracted action items from it. Here is the transcript: ${args.transcript}`;

    const output = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant designed to output JSON in this format: {summary: string, actionItems: string[]}',
        },
        { role: 'user', content: prompt },
      ],
      model: 'gpt-4-1106-preview',
      response_format: { type: 'json_object' },
    });

    // Pull the message content out of the response
    const messageContent = output.choices[0].message.content;

    // @ts-ignore
    const parsedOutput = JSON.parse(messageContent!.output);

    await ctx.runMutation(api.notes.addToNote, {
      id: args.id,
      summary: parsedOutput.summary,
      actionItems: parsedOutput.actionItems,
      transcript: args.transcript,
    });
  },
});
