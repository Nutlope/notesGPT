import { api } from '@/convex/_generated/api';
import { preloadQuery } from 'convex/nextjs';
import { getAuthToken } from '@/app/auth';
import RecordingPage from './recording';

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id as any;
  const token = await getAuthToken();
  const preloadedNote = await preloadQuery(
    api.notes.getNote,
    { id },
    { token },
  );

  return <RecordingPage preloadedNote={preloadedNote} />;
};

export default Page;
