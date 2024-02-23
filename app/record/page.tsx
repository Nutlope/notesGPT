'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { getCurrentFormattedDate } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/ui/Header';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

const RecordVoicePage = () => {
  const [title, setTitle] = useState('Record your voice note');
  const envVarsUrl = useQuery(api.utils.envVarsMissing);

  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const { user } = useUser();

  const generateUploadUrl = useMutation(api.notes.generateUploadUrl);
  const createNote = useMutation(api.notes.createNote);

  const router = useRouter();

  async function startRecording() {
    setIsRunning(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    let audioChunks: any = [];

    recorder.ondataavailable = (e) => {
      audioChunks.push(e.data);
    };

    recorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/mp3' });

      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'audio/mp3' },
        body: audioBlob,
      });
      const { storageId } = await result.json();

      if (user) {
        let noteId = await createNote({
          storageId,
        });

        router.push(`/recording/${noteId}`);
      }
    };
    setMediaRecorder(recorder as any);
    recorder.start();
  }

  function stopRecording() {
    // @ts-ignore
    mediaRecorder.stop();
    setIsRunning(false);
  }

  const formattedDate = getCurrentFormattedDate();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setTotalSeconds((prevTotalSeconds) => prevTotalSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  function formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  const handleRecordClick = () => {
    if (title === 'Record your voice note') {
      setTitle('Recording...');
      startRecording();
    } else if (title === 'Recording...') {
      setTitle('Processing...');
      stopRecording();
    }
  };

  return (
    <div className=" flex flex-col items-center justify-between">
      <h1 className="pt-[25px] text-center text-xl font-medium text-dark md:pt-[47px] md:text-4xl">
        {title}
      </h1>
      <p className="mb-20 mt-4 text-gray-400">{formattedDate}</p>
      <div className="relative mx-auto flex h-[316px] w-[316px] items-center justify-center">
        <div
          className={`recording-box absolute h-full w-full rounded-[50%] p-[12%] pt-[17%] ${
            title !== 'Record your voice note' && title !== 'Processing...'
              ? 'record-animation'
              : ''
          }`}
        >
          <div
            className="h-full w-full rounded-[50%]"
            style={{ background: 'linear-gradient(#E31C1CD6, #003EB6CC)' }}
          />
        </div>
        <div className="z-50 flex h-fit w-fit flex-col items-center justify-center">
          <h1 className="text-[60px] leading-[114.3%] tracking-[-1.5px] text-light">
              {formatTime(Math.floor(totalSeconds / 60))}:{formatTime(totalSeconds % 60)}
          </h1>
        </div>
      </div>
      <div className="mt-10 flex w-fit items-center justify-center gap-[33px] pb-7 md:gap-[77px] ">
        {envVarsUrl ? (
          <MissingEnvVars url={envVarsUrl} />
        ) : (
          <button
            onClick={handleRecordClick}
            className="mt-10 h-fit w-fit rounded-[50%] border-[2px]"
            style={{ boxShadow: '0px 0px 8px 5px rgba(0,0,0,0.3)' }}
          >
            {!isRunning ? (
              <Image
                src={'/icons/nonrecording_mic.svg'}
                alt="recording mic"
                width={148}
                height={148}
                className="h-[70px] w-[70px] md:h-[100px] md:w-[100px]"
              />
            ) : (
              <Image
                src={'/icons/recording_mic.svg'}
                alt="recording mic"
                width={148}
                height={148}
                className="h-[70px] w-[70px] animate-pulse transition md:h-[100px] md:w-[100px]"
              />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default RecordVoicePage;

function MissingEnvVars(props: { url: string }) {
  return (
    <div className="rounded-md bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Missing Environment Variables
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              Set up your{' '}
              <a className="underline" target="_blank" href={props.url}>
                Convex environment variables here
              </a>{' '}
              with API keys from{' '}
              <a
                className="underline"
                target="_blank"
                href="https://api.together.xyz/settings/api-keys"
              >
                Together.ai
              </a>{' '}
              and{' '}
              <a
                className="underline"
                target="_blank"
                href="https://replicate.com/account/api-tokens"
              >
                Replicate
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
