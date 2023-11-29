import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  notes: defineTable({
    audioFileId: v.string(),
    audioFileUrl: v.string(),
    transcription: v.optional(v.string()),
  }),
});
