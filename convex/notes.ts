import { mutation } from './_generated/server';
import { v } from 'convex/values';
import { api } from '../convex/_generated/api';

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const createNote = mutation(
  async (ctx, { storageId, userId }: { storageId: string; userId: string }) => {
    let fileUrl = (await ctx.storage.getUrl(storageId)) as string;

    const noteId = await ctx.db.insert('notes', {
      userId,
      audioFileId: storageId,
      audioFileUrl: fileUrl,
    });

    const transcript = await ctx.scheduler.runAfter(0, api.whisper.chat, {
      fileUrl,
    });

    await ctx.scheduler.runAfter(0, api.openai.chat, {
      transcript: transcript,
      id: noteId,
    });

    return await ctx.storage.getUrl(storageId);
  }
);

export const addToNote = mutation({
  args: {
    id: v.id('notes'),
    transcript: v.string(),
    summary: v.string(),
    actionItems: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, transcript, summary, actionItems } = args;
    await ctx.db.patch(id, {
      actionItems: actionItems,
      summary: summary,
      transcription: transcript,
    });
  },
});
