import { NextResponse } from 'next/server';
import * as fal from '@fal-ai/serverless-client';

export async function GET(request: Request) {
  // const body = await request.json();

  const result = await fal.subscribe('110602490-whisper', {
    input: {
      url: 'https://cdn.freesound.org/previews/324/324783_5589643-lq.mp3',
    },
    logs: true,
    onQueueUpdate: (update: any) => {
      if (update.status === 'IN_PROGRESS') {
        update.logs.map((log: any) => log.message).forEach(console.log);
      }
    },
  });

  console.log({ result });

  return NextResponse.json(result);
}
