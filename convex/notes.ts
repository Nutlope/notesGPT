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
    let fileUrl = (await ctx.storage.getUrl(storageId)) as string;

    const noteId = await ctx.db.insert('notes', {
      userId,
      audioFileId: storageId,
      audioFileUrl: fileUrl,
      generatingTranscript: true,
      generatingTitle: true,
      generatingActionItems: true,
    });

    await ctx.scheduler.runAfter(0, internal.whisper.chat, {
      fileUrl,
      id: noteId,
    });

    return noteId;
  },
});

export const getNote = queryWithUser({
  args: {
    id: v.optional(v.id('notes')),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    if (!id) return null;
    const note = await ctx.db.get(id);
    if (note?.userId !== ctx.userId) {
      throw new ConvexError('Not your note.');
    }

    const actionItems = await ctx.db
      .query('actionItems')
      .withIndex('by_noteId', (q) => q.eq('noteId', note._id))
      .collect();

    return {
      ...note,
      actionItems: actionItems,
    };
  },
});

export const getActionItems = queryWithUser({
  args: {},
  handler: async (ctx, args) => {
    const userId = ctx.userId;

    const actionItems = await ctx.db
      .query('actionItems')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .collect();

    let fullActionItems = [];

    for (let item of actionItems) {
      const note = await ctx.db.get(item.noteId);
      if (!note) continue;
      fullActionItems.push({
        ...item,
        title: note.title,
      });
    }

    return fullActionItems;
  },
});

export const getNotes = queryWithUser({
  args: {},
  handler: async (ctx, args) => {
    const userId = ctx.userId;
    const notes = await ctx.db
      .query('notes')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .collect();

    const results = Promise.all(
      notes.map(async (note) => {
        const count = (
          await ctx.db
            .query('actionItems')
            .withIndex('by_noteId', (q) => q.eq('noteId', note._id))
            .collect()
        ).length;
        return {
          count,
          ...note,
        };
      }),
    );

    return results;
  },
});

export const removeActionItem = mutationWithUser({
  args: {
    id: v.id('actionItems'),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    const existing = await ctx.db.get(id);
    if (existing) {
      if (existing.userId !== ctx.userId) {
        throw new ConvexError('Not your action item');
      }
      await ctx.db.delete(id);
    }
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
      // NB: Removing note does *not* remove action items.
    }
  },
});

export const actionItemCountForNote = queryWithUser({
  args: {
    noteId: v.id('notes'),
  },
  handler: async (ctx, args) => {
    const { noteId } = args;
    const actionItems = await ctx.db
      .query('actionItems')
      .withIndex('by_noteId', (q) => q.eq('noteId', noteId))
      .collect();
    for (const ai of actionItems) {
      if (ai.userId !== ctx.userId) {
        throw new ConvexError('Not your action items');
      }
    }
    return actionItems.length;
  },
});
