import { NextResponse } from 'next/server';
import * as fal from '@fal-ai/serverless-client';

export async function POST(request: Request) {
  const { fileUrl } = await request.json();

  const result = await fal.subscribe('110602490-whisper', {
    input: {
      url: fileUrl,
    },
    logs: true,
    onQueueUpdate: (update: any) => {
      if (update.status === 'IN_PROGRESS') {
        update.logs.map((log: any) => log.message).forEach(console.log);
      }
    },
  });

  console.log({ result });

  // @ts-ignore
  return NextResponse.json({ text: result.result || 'nothing' });
}
