import { ConvexError, v } from 'convex/values';
import { internal } from '../convex/_generated/api';
import { mutationWithUser, queryWithUser } from './utils';

export const generateUploadUrl = mutationWithUser({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const createNote = mutationWithUser({
  args: {
    storageId: v.id('_storage'),
  },
  handler: async (ctx, { storageId }) => {
    const userId = ctx.userId;
    const fileUrl = (await ctx.storage.getUrl(storageId))!;

    const noteId = await ctx.db.insert('notes', {
      userId,
      audioFileId: storageId,
      audioFileUrl: fileUrl,
      generatingTranscript: true,
      generatingTitle: true,
      generatingBlogPost: false,
      generatingTweet: false,
    });

    await ctx.scheduler.runAfter(0, internal.whisper.chat, {
      fileUrl,
      id: noteId,
    });

    return noteId;
  },
});

export enum GeneratingValue {
  tweet = 'generatingTweet',
  blogPost = 'generatingBlogPost',
  transcription = 'generatingTranscription',
}

export const modifyNoteByUsage = mutationWithUser({
  args: {
    noteId: v.id('notes'),
    transcript: v.string(),
    target: v.union(v.literal('tweet'), v.literal('blogPost'), v.literal('transcription')),
  },
  handler: async (ctx, { noteId, transcript, target }) => {
    const field = GeneratingValue[target];
    console.log({ field });
    await ctx.db.patch(noteId, {
      [field]: true,
    });

    await ctx.scheduler.runAfter(0, internal.together.transformTranscript, {
      id: noteId,
      transcript,
      target,
    });
  },
});

export const getNote = queryWithUser({
  args: {
    id: v.optional(v.id('notes')),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    if (ctx.userId === undefined) {
      return null;
    }
    if (id === undefined) {
      return { note: null };
    }
    const note = await ctx.db.get(id);
    if (note?.userId !== ctx.userId) {
      throw new ConvexError('Not your note.');
    }

    return { note };
  },
});

export const getNotes = queryWithUser({
  handler: async (ctx) => {
    const userId = ctx.userId;
    if (userId === undefined) {
      return null;
    }
    const notes = await ctx.db
      .query('notes')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .collect();

    return notes;
  },
});

export const removeNote = mutationWithUser({
  args: {
    id: v.id('notes'),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    const existing = await ctx.db.get(id);
    if (existing) {
      if (existing.userId !== ctx.userId) {
        throw new ConvexError('Not your note');
      }
      await ctx.db.delete(id);
    }
  },
});

export const updateNote = mutationWithUser({
  args: {
    noteId: v.id('notes'),
    target: v.union(v.literal('tweet'), v.literal('blogPost'), v.literal('transcription')),
    transcription: v.string(),
  },
  handler: async (ctx, { noteId, target, transcription }) => {
    await ctx.db.patch(noteId, {
      [target]: transcription,
    });
    const note = await ctx.db.get(noteId);
    return note;
  },
});
