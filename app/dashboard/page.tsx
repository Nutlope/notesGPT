import { api } from '@/convex/_generated/api';
import { auth } from '@clerk/nextjs';
import { preloadQuery } from 'convex/nextjs';
import DashboardHomePage from './dashboard';
import { getAuthToken } from '../auth';

const ServerDashboardHomePage = async () => {
  const token = await getAuthToken();

  const preloadedNotes = await preloadQuery(api.notes.getNotes, {}, { token });

  return <DashboardHomePage preloadedNotes={preloadedNotes} />;
};

export default ServerDashboardHomePage;
