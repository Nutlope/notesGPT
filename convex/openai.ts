import OpenAI from 'openai';
import {
  internalAction,
  internalMutation,
  internalQuery,
} from './_generated/server';
import { v } from 'convex/values';
import { internal } from './_generated/api';
import { getEmbedding } from '../lib/utils';
import Instructor from '@instructor-ai/instructor';
import { z } from 'zod';
import { actionWithUser } from './utils';

const togetherApiKey = process.env.TOGETHER_API_KEY ?? 'undefined';
const openaiApiKey = process.env.OPENAI_API_KEY ?? 'undefined';

// Together client for LLM extraction
const togetherai = new OpenAI({
  apiKey: togetherApiKey,
  baseURL: 'https://api.together.xyz',
});

// Instructor for returning structured JSON
const client = Instructor({
  client: togetherai,
  mode: 'TOOLS',
});

const NoteSchema = z.object({
  title: z.string().describe('Short descriptive title of voice message'),
  summary: z.string().describe('Short summary of voice message'),
  actionItems: z
    .array(z.string())
    .describe(
      'A list of action items from the voice note, short and to the point. Make sure all action item lists are fully resolved if they are nested',
    ),
});

export const chat = internalAction({
  args: {
    id: v.id('notes'),
    transcript: v.string(),
  },
  handler: async (ctx, args) => {
    const { transcript } = args;

    console.log('its about to run');
    const extract = await client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content:
            'The following is a transcript of a voice message. Extract the relevant actions from it and correctly return JSON.',
        },
        { role: 'user', content: transcript },
      ],
      model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
      response_model: { schema: NoteSchema, name: 'SummarizeNotes' },
      max_retries: 2,
    });

    await ctx.runMutation(internal.openai.saveSummary, {
      id: args.id,
      summary: extract.summary,
      actionItems: extract.actionItems,
      title: extract.title,
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

export const similarNotes = actionWithUser({
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
  id: string;
  score: number;
};

export const fetchResults = internalQuery({
  args: {
    results: v.array(v.object({ _id: v.id('notes'), _score: v.float64() })),
  },
  handler: async (ctx, args) => {
    const out: SearchResult[] = [];
    for (const result of args.results) {
      out.push({ id: result._id, score: result._score });
    }
    return out;
  },
});

export const embed = internalAction({
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
