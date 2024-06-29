import Instructor from '@instructor-ai/instructor';
import { v } from 'convex/values';
import OpenAI from 'openai';
import { z } from 'zod';
import { internal } from './_generated/api';
import { internalAction, internalMutation, internalQuery } from './_generated/server';
import { actionWithUser } from './utils';

const togetherApiKey = process.env.TOGETHER_API_KEY ?? 'undefined';

// Together client for LLM extraction
const togetherai = new OpenAI({
  apiKey: togetherApiKey,
  baseURL: 'https://api.together.xyz/v1',
});

// Instructor for returning structured JSON
const client = Instructor({
  client: togetherai,
  mode: 'JSON_SCHEMA',
});

const NoteSchema = z.object({
  title: z.string().describe('Short descriptive title of what the voice message is about'),
  summary: z
    .string()
    .describe(
      'A short summary in the first person point of view of the person recording the voice message',
    )
    .max(500),
});

export const chat = internalAction({
  args: {
    id: v.id('notes'),
    transcript: v.string(),
  },
  handler: async (ctx, args) => {
    const { transcript } = args;

    try {
      const extract = await client.chat.completions.create({
        messages: [
          {
            role: 'system',
            content:
              'The following is a transcript of a voice message. Extract a title, summary (summary should be max 20 words long) from it and answer in JSON in this format: {title: string, summary: string}',
          },
          { role: 'user', content: transcript },
        ],
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        response_model: { schema: NoteSchema, name: 'SummarizeNotes' },
        max_tokens: 1000,
        temperature: 0.6,
        max_retries: 3,
      });
      const { title, summary } = extract;

      await ctx.runMutation(internal.together.saveSummary, {
        id: args.id,
        summary,
        title,
      });
    } catch (e) {
      console.error('Error extracting from voice message', e);
      await ctx.runMutation(internal.together.saveSummary, {
        id: args.id,
        summary: 'Summary failed to generate',
        title: 'Title',
      });
    }
  },
});

const TransformationSchema = z.object({
  modifiedTranscript: z.string().describe('new modified transcription').max(1000),
});

export const transformTranscript = internalAction({
  args: {
    id: v.id('notes'),
    transcript: v.string(),
    target: v.string(),
  },
  handler: async (ctx, args) => {
    const { transcript, target } = args;

    try {
      const extract = await client.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: `The following is a transcript of a voice message. Transform given transcript to be useful as ${target}, taking under consideration limitation related with it. Answer in JSON in this format: {modifiedTranscript: string}`,
          },
          { role: 'user', content: transcript },
        ],
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        response_model: { schema: TransformationSchema, name: 'TransformedNote' },
        max_tokens: 1000,
        temperature: 0.6,
        max_retries: 3,
      });
      const { modifiedTranscript } = extract;
    
      await ctx.runMutation(internal.together.saveTarget, {
        id: args.id,
        target: target,
        value: modifiedTranscript
      });

    } catch (e) {
      console.error('Error transforming transcript for targeted purpose', e);
    }
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
  },
  handler: async (ctx, args) => {
    const { id, summary, title } = args;
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
  },
});

export const saveTarget = internalMutation({
  args: {
    id: v.id('notes'),
    target: v.string(),
    value: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, target, value } = args;
    await ctx.db.patch(id, {
      [target]: value,
      generatingTranscript: false,
    });

    let note = await ctx.db.get(id);

    if (!note) {
      console.error(`Couldn't find note ${id}`);
      return;
    }
  },
});

export type SearchResult = {
  id: string;
  score: number;
};

export const similarNotes = actionWithUser({
  args: {
    searchQuery: v.string(),
  },
  handler: async (ctx, args): Promise<SearchResult[]> => {
    const getEmbedding = await togetherai.embeddings.create({
      input: [args.searchQuery.replace('/n', ' ')],
      model: 'togethercomputer/m2-bert-80M-32k-retrieval',
    });
    const embedding = getEmbedding.data[0].embedding;

    // 2. Then search for similar notes
    const results = await ctx.vectorSearch('notes', 'by_embedding', {
      vector: embedding,
      limit: 16,
      filter: (q) => q.eq('userId', ctx.userId), // Only search my notes.
    });

    return results.map((r) => ({
      id: r._id,
      score: r._score,
    }));
  },
});

export const embed = internalAction({
  args: {
    id: v.id('notes'),
    transcript: v.string(),
  },
  handler: async (ctx, args) => {
    const getEmbedding = await togetherai.embeddings.create({
      input: [args.transcript.replace('/n', ' ')],
      model: 'togethercomputer/m2-bert-80M-32k-retrieval',
    });
    const embedding = getEmbedding.data[0].embedding;

    await ctx.runMutation(internal.together.saveEmbedding, {
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
