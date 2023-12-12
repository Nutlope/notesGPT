import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
import { api } from '../convex/_generated/api';

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// Stores audio file in Convex file storage, invokes whisper Convex action, and invokes OpenAI Convex action to get the transcript, summary, and action items
export const createNote = mutation(
  async (ctx, { storageId, userId }: { storageId: string; userId: string }) => {
    let fileUrl = (await ctx.storage.getUrl(storageId)) as string;

    const noteId = await ctx.db.insert('notes', {
      userId,
      audioFileId: storageId,
      audioFileUrl: fileUrl,
    });

    await ctx.scheduler.runAfter(0, api.whisper.chat, {
      fileUrl,
      id: noteId,
    });

    return noteId;
  }
);

export const getNote = query({
  args: {
    id: v.optional(v.id('notes')),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    if (!id) return null;
    const note = await ctx.db.get(id);

    return note;
  },
});
