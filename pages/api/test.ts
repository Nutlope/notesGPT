import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const togetherApiKey = process.env.TOGETHER_API_KEY ?? 'undefined';

  // Together client for LLM extraction
  const togetherai = new OpenAI({
    apiKey: togetherApiKey,
    baseURL: 'https://api.together.xyz/v1',
  });

  const transcript =
    'I want to get my chores done when I get home and get my homework done too';

  const getEmbedding = await togetherai.embeddings.create({
    input: transcript,
    model: 'togethercomputer/m2-bert-80M-32k-retrieval',
    encoding_format: 'float',
  });
  console.log({ getEmbedding });
  const embedding = getEmbedding.data[0].embedding;

  res.status(200).json({ embedding });
}
