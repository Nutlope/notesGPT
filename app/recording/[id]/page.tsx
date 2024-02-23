import { api } from '@/convex/_generated/api';
import { preloadQuery } from 'convex/nextjs';
import { getAuthToken } from '@/app/auth';
import RecordingPage from './recording';
import { Id } from '@/convex/_generated/dataModel';

const Page = async ({ params: { id } }: { params: { id: Id<'notes'> } }) => {
  const token = await getAuthToken();
  const preloadedNote = await preloadQuery(
    api.notes.getNote,
    { id },
    { token },
  );

  return <RecordingPage preloadedNote={preloadedNote} />;
};

export default Page;
