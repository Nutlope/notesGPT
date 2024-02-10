import { getAuthToken } from '@/app/auth';
import { api } from '@/convex/_generated/api';
import { preloadQuery } from 'convex/nextjs';
import ActionItemsPage from './ais';

const Page = async () => {
  const token = await getAuthToken();
  const preloadedItems = await preloadQuery(
    api.notes.getActionItems,
    {},
    { token },
  );

  return <ActionItemsPage preloadedItems={preloadedItems} />;
};

export default Page;
