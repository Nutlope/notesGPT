'use client';

import Header from '@/components/ui/Header';
import RecordingDesktop from '@/components/pages/recording/RecordingDesktop';
import RecordingMobile from '@/components/pages/recording/RecordingMobile';
import { api } from '@/convex/_generated/api';
import { Preloaded } from 'convex/react';
import AuthenticatedPreload from '@/components/preloading';
import { FunctionReturnType } from 'convex/server';

const PreloadedRecordingPage = ({
  preloadedNote,
}: {
  preloadedNote: Preloaded<typeof api.notes.getNote>;
}) => {
  return (
    <AuthenticatedPreload preload={preloadedNote}>
      <RecordingPage preloaded={undefined} />
    </AuthenticatedPreload>
  );
};

const RecordingPage = ({
  preloaded,
}: {
  preloaded: FunctionReturnType<typeof api.notes.getNote> | undefined;
}) => {
  const currentNote = preloaded!;

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

export default PreloadedRecordingPage;
