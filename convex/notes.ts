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
  },
);

export const getNote = query({
  args: {
    id: v.optional(v.id('notes')),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    if (!id) return null;
    const note = await ctx.db.get(id);

    const actionItems = await ctx.db
      .query('actionItems')
      .filter((q) => q.eq(q.field('noteId'), id))
      .collect();

    return {
      ...note,
      actionItems: actionItems.map((actionItem) => actionItem.task),
    };
  },
});

export const getActionItems = query({
  args: {
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId } = args;
    if (!userId) return null;

    const actionItems = await ctx.db
      .query('actionItems')
      .filter((q) => q.eq(q.field('userId'), userId))
      .collect();

    let fullActionItems = [];

    for (let item of actionItems) {
      const note = await ctx.db.get(item.noteId);
      fullActionItems.push({
        ...item,
        title: note!.title,
      });
    }

    return fullActionItems;
  },
});

export const getNotes = query({
  args: {
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId } = args;
    if (!userId) return null;

    const notes = await ctx.db
      .query('notes')
      .filter((q) => q.eq(q.field('userId'), userId))
      .collect();

    return notes;
  },
});

export const removeActionItem = mutation({
  args: {
    id: v.id('actionItems'),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    await ctx.db.delete(id);
  },
});

export const removeNote = mutation({
  args: {
    id: v.id('notes'),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    await ctx.db.delete(id);
  },
});

export const actionItemsForNote = query({
  args: {
    noteId: v.id('notes'),
  },
  handler: async (ctx, args) => {
    const { noteId } = args;
    const actionItems = await ctx.db
      .query('actionItems')
      .filter((q) => q.eq(q.field('noteId'), noteId))
      .collect();

    return actionItems.length;
  },
});
