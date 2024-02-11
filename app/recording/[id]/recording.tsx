'use client';

import Header from '@/components/ui/Header';
import RecordingDesktop from '@/components/pages/recording/RecordingDesktop';
import RecordingMobile from '@/components/pages/recording/RecordingMobile';
import { api } from '@/convex/_generated/api';
import { Preloaded } from 'convex/react';
import { useAuthenticatedPreloadedQuery } from '@/hooks/preloading';

const RecordingPage = ({
  preloadedNote,
}: {
  preloadedNote: Preloaded<typeof api.notes.getNote>;
}) => {
  const currentNote = useAuthenticatedPreloadedQuery(preloadedNote);

  return (
    <div className="">
      <Header />
      <div className="mx-auto max-w-[1500px]">
        <RecordingDesktop {...currentNote} />
        <RecordingMobile {...currentNote} />
      </div>
    </div>
  );
};

export default RecordingPage;
