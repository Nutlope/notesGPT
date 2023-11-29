import { mutation } from './_generated/server';

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const createNote = mutation(
  async (ctx, { storageId }: { storageId: string }) => {
    let fileUrl = (await ctx.storage.getUrl(storageId)) as string;

    await ctx.db.insert('notes', {
      audioFileId: storageId,
      audioFileUrl: fileUrl,
    });

    return await ctx.storage.getUrl(storageId);
  }
);
