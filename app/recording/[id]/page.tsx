'use client';

import DashboardNav from '@/components/global/dashboardNav/DashboardNav';
import RecordingDesktop from '@/components/pages/recording/RecordingDesktop';
import RecordingMobile from '@/components/pages/recording/RecordingMobile';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

const QuickCheckPage = ({ params }: { params: { id: string } }) => {
  const id = params.id as any;
  const currentNote = useQuery(api.notes.getNote, { id });
  if (!currentNote) return null; // Some 404 page maybe

  return (
    <div className="min-h-screen bg-light">
      <DashboardNav />
      <div className="mx-auto max-w-[1500px]">
        <RecordingDesktop {...currentNote} />
        <RecordingMobile {...currentNote} />
      </div>
    </div>
  );
};

export default QuickCheckPage;
