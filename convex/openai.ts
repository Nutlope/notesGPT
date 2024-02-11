('use node');

import OpenAI from 'openai';
import { action, internalMutation, internalQuery } from './_generated/server';
import { v } from 'convex/values';
import { internal } from './_generated/api';
import { getEmbedding } from '../lib/utils';
import Instructor from '@instructor-ai/instructor';
import { z } from 'zod';

const togetherApiKey = process.env.TOGETHER_API_KEY!;
const openaiApiKey = process.env.OPENAI_API_KEY!;

// OpenAI client for embeddings
const openai = new OpenAI({
  apiKey: openaiApiKey,
});

// Together client for chat
const togetherai = new OpenAI({
  apiKey: togetherApiKey,
  baseURL: 'https://api.together.xyz/v1',
});

// Instructor for JSON mode
const client = Instructor({
  client: togetherai,
  mode: 'TOOLS',
});

const NoteSchema = z.object({
  summary: z.string(),
  actionItems: z.array(z.string()),
  title: z.string(),
});

// type NoteInfo = z.infer<typeof NoteSchema>;

export const chat = action({
  args: {
    id: v.id('notes'),
    transcript: v.string(),
  },
  handler: async (ctx, args) => {
    const { transcript } = args;

    const prompt = `Take in the following transcript and return a summary of it from the first person point of view of the person speaking, a list of extracted action items from it, and a short title for the transcript. Here is the transcript: ${transcript}`;

    const messageContent = await client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant designed to output JSON',
        },
        { role: 'user', content: prompt },
      ],
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      response_model: { schema: NoteSchema, name: 'NoteInfo' },
    });

    console.log({ messageContent });

    await ctx.runMutation(internal.openai.saveSummary, {
      id: args.id,
      summary: messageContent.summary,
      actionItems: messageContent.actionItems,
      title: messageContent.title,
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
      generatingTitle: false,
    });

    let note = await ctx.db.get(id);

    if (!note) {
      console.error(`Couldn't find note ${id}`);
      return;
    }
    for (let actionItem of actionItems) {
      await ctx.db.insert('actionItems', {
        task: actionItem,
        noteId: id,
        userId: note.userId,
      });
    }

    await ctx.db.patch(id, {
      generatingActionItems: false,
    });
  },
});

export const similarNotes = action({
  args: {
    searchQuery: v.string(),
  },
  handler: async (ctx, args) => {
    const embedding = await getEmbedding({
      apiKey: openaiApiKey,
      searchQuery: args.searchQuery,
    });

    // 2. Then search for similar notes
    const results = await ctx.vectorSearch('notes', 'by_embedding', {
      vector: embedding,
      limit: 16,
    });

    console.log({ results });

    const rows: SearchResult[] = await ctx.runQuery(
      internal.openai.fetchResults,
      { results },
    );
    return rows;
  },
});

export type SearchResult = {
  _id: string;
  _score: number;
  title?: string;
  _creationTime: number;
};

export const fetchResults = internalQuery({
  args: {
    results: v.array(v.object({ _id: v.id('notes'), _score: v.float64() })),
  },
  handler: async (ctx, args) => {
    const out: SearchResult[] = [];
    for (const result of args.results) {
      const doc = await ctx.db.get(result._id);
      if (!doc) {
        continue;
      }
      out.push({
        _id: doc._id,
        _score: result._score,
        title: doc.title,
        _creationTime: doc._creationTime,
      });
    }
    return out;
  },
});

export const embed = action({
  args: {
    id: v.id('notes'),
    transcript: v.string(),
  },
  handler: async (ctx, args) => {
    const embedding = await getEmbedding({
      apiKey: openaiApiKey,
      searchQuery: args.transcript,
    });

    await ctx.runMutation(internal.openai.saveEmbedding, {
      id: args.id,
      embedding,
    });
  },
});

export const saveEmbedding = internalMutation({
  args: {
    id: v.id('notes'),
    embedding: v.array(v.float64()),
  },
  handler: async (ctx, args) => {
    const { id, embedding } = args;
    await ctx.db.patch(id, {
      embedding: embedding,
    });
  },
});
