('use node');

import { internalAction, internalMutation } from './_generated/server';
import { v } from 'convex/values';
import { Together } from 'together-ai';
import { api, internal } from './_generated/api';

function getTogetherClient() {
  return new Together({ apiKey: process.env.TOGETHER_API_KEY });
}

interface whisperOutput {
  detected_language: string;
  segments: any;
  transcription: string;
  translation: string | null;
}

export const chat = internalAction({
  args: {
    fileUrl: v.string(),
    id: v.id('notes'),
  },
  handler: async (ctx, args) => {
    const res = await getTogetherClient().audio.transcriptions.create({
      // @ts-ignore: Together API accepts file URL as string, even if types do not allow
      file: args.fileUrl,
      model: 'openai/whisper-large-v3',
      language: 'en',
    });

    const transcript = (res.text as string) || 'error';

    await ctx.runMutation(internal.whisper.saveTranscript, {
      id: args.id,
      transcript,
    });
  },
});

export const saveTranscript = internalMutation({
  args: {
    id: v.id('notes'),
    transcript: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, transcript } = args;

    await ctx.db.patch(id, {
      transcription: transcript,
      generatingTranscript: false,
    });

    const note = (await ctx.db.get(id))!;
    await ctx.storage.delete(note.audioFileId);

    await ctx.scheduler.runAfter(0, internal.together.chat, {
      id: args.id,
      transcript,
    });

    await ctx.scheduler.runAfter(0, internal.together.embed, {
      id: args.id,
      transcript: transcript,
    });
  },
});
