'use client';

import RecordingDesktop from '@/components/pages/recording/RecordingDesktop';
import RecordingMobile from '@/components/pages/recording/RecordingMobile';
import Header from '@/components/ui/Header';
import { api } from '@/convex/_generated/api';
import { usePreloadedQueryWithAuth } from '@/lib/hooks';
import { Preloaded } from 'convex/react';

export default function RecordingPage({
  preloadedNote,
}: {
  preloadedNote: Preloaded<typeof api.notes.getNote>;
}) {
  const currentNote = usePreloadedQueryWithAuth(preloadedNote);

  return (
    <div>
      <Header />
      <div className="mx-auto max-w-[1500px]">
        <RecordingDesktop {...currentNote} />
        <RecordingMobile {...currentNote} />
      </div>
    </div>
  );
}
