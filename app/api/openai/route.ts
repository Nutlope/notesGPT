import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

export async function POST(request: Request) {
  const { transcript } = await request.json();
  // const transcript =
  //   "Oh, what a day! It's like every possible thing that could go wrong, did go wrong. First, the alarm clock decides to play dead, of all the days! So, I'm late. I rush out, skip breakfast – big mistake, by the way – and guess what? The car won't start. Of course, it won't start! Why would it, on a day when I have back-to-back meetings? So, I call a cab, and you won't believe it. The driver, he's a chatterbox! Talks my ear off about his cousin's new bakery or something. I mean, come on! I'm not even a morning person on the best of days. Work was a circus. Emails piling up, the printer jams when I need it most, and the presentation? Oh, the presentation... I spill coffee on my notes right before. It's like Murphy’s Law in full swing! And don't even get me started on the way back home. The traffic was a nightmare. Honking horns, endless red lights, and that's not the worst part. I get home, and I realize I've left my house keys at the office. The office, which is now locked. So here I am, locked out, tired, hungry, and... Okay, okay, enough ranting. I need to do something productive. Let's think... tasks, tasks. I could start with dinner, but that means I need to go grocery shopping. Great, another trip outside.";

  const prompt = `Take in the following transcript and return a summary of it from the first person point of view of the person speaking and a list of extracted action items from it. Here is the transcript: ${transcript}`;
  const output = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful assistant designed to output JSON in this format: {summary: string, actionItems: string[]}',
      },
      { role: 'user', content: prompt },
    ],
    model: 'gpt-4-1106-preview',
    response_format: { type: 'json_object' },
  });

  console.log(output.choices[0].message.content);

  return NextResponse.json({ output: output.choices[0].message.content });
}
