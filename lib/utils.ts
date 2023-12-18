import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentFormattedDate(): string {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(currentDate);
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const dateString = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeString = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return `${dateString} at ${timeString}`;
}

export async function getEmbedding({
  apiKey,
  searchQuery,
}: {
  apiKey: string;
  searchQuery: string;
}) {
  const fetchEmbedding = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      input: searchQuery,
      model: 'text-embedding-ada-002',
    }),
  });
  const json = await fetchEmbedding.json();
  const embedding = json['data'][0]['embedding'];

  return embedding;
}
