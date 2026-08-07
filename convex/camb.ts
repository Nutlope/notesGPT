("use node");

import { internalAction, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

const CAMB_API_BASE = "https://client.camb.ai/apis";

function getCambApiKey(): string {
  const key = process.env.CAMB_API_KEY;
  if (!key) {
    throw new Error("CAMB_API_KEY environment variable is not set");
  }
  return key;
}

// Generate TTS audio of a note summary using CAMB AI
export const generateSpeech = internalAction({
  args: {
    id: v.id("notes"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = getCambApiKey();

    const res = await fetch(`${CAMB_API_BASE}/tts-stream`, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: args.text,
        voice_id: 147320,
        language: "en-us",
        speech_model: "mars-flash",
        output_configuration: { format: "wav" },
      }),
    });

    if (!res.ok) {
      throw new Error(`CAMB TTS failed: ${await res.text()}`);
    }

    const audioBuffer = await res.arrayBuffer();
    const blob = new Blob([audioBuffer], { type: "audio/wav" });

    const storageId = await ctx.storage.store(blob);

    await ctx.runMutation(internal.camb.saveSummaryAudio, {
      id: args.id,
      summaryAudioFileId: storageId,
    });
  },
});

export const saveSummaryAudio = internalMutation({
  args: {
    id: v.id("notes"),
    summaryAudioFileId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.summaryAudioFileId);
    await ctx.db.patch(args.id, {
      summaryAudioFileId: args.summaryAudioFileId,
      summaryAudioUrl: url ?? undefined,
    });
  },
});
