'use client';

import { useEffect, useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { getCurrentFormattedDate } from '@/lib/utils';
import Image from 'next/image';

const RecordVoicePage = () => {
  const [title, setTitle] = useState('Record your voice note');

  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const [transcript, setTranscript] = useState('');
  const [summary, setSummary] = useState('');
  const [actionItems, setActionItems] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const generateUploadUrl = useMutation(api.notes.generateUploadUrl);
  const createNote = useMutation(api.notes.createNote);

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
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioURL(audioUrl);

      const postUrl = await generateUploadUrl();
      const result = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'audio/mp3' },
        body: audioBlob,
      });
      const { storageId } = await result.json();
      let fileUrl = await createNote({
        storageId,
      });

      console.log({ fileUrl });

      let res = await fetch('/api/whisper', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileUrl,
        }),
      });

      let data = await res.json();
      setTranscript(data.text);

      let res2 = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript: data.text,
        }),
      });

      let openaiRes = await res2.json();
      const parsedOutput = JSON.parse(openaiRes.output);
      console.log({ parsedOutput });
      setSummary(parsedOutput.summary);
      setActionItems(parsedOutput.actionItems);
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
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleRecordClick = () => {
    if (title === 'Record your voice note') {
      setTitle('Recording...');
      startRecording();
    } else if (title === 'Recording...') {
      setTitle('Processing...');
      stopRecording();
      // TODO: Do a router.push here when it's done processing OR just combine this page with quick-check
    }
  };

  return (
    <div className="bg-light flex flex-col justify-between items-center">
      <h1 className="text-xl pt-[25px] md:pt-[47px] md:text-[35px] font-medium text-dark text-center">
        {title}
      </h1>
      <p className="text-gray-400 mb-5 mt-2">{formattedDate}</p>
      <div className="w-[316px] h-[316px] mx-auto relative flex items-center justify-center">
        <div
          className={`w-full h-full recording-box rounded-[50%] p-[12%] pt-[17%] absolute ${
            title !== 'Record your voice note' && title !== 'Processing...'
              ? 'record-animation'
              : ''
          }`}
        >
          <div
            className="w-full h-full rounded-[50%]"
            style={{ background: 'linear-gradient(#E31C1CD6, #003EB6CC)' }}
          />
        </div>
        <div className="z-50 flex w-fit h-fit items-center justify-center flex-col">
          <h1 className="text-light text-[60px] leading-[114.3%] tracking-[-1.5px]">
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </h1>
        </div>
      </div>
      <div className="w-fit flex items-center justify-center gap-[33px] md:gap-[77px] pb-7 ">
        <button
          onClick={handleRecordClick}
          className="border-[2px] rounded-[50%] w-fit h-fit mt-10"
          style={{ boxShadow: '0px 0px 8px 5px rgba(0,0,0,0.3)' }}
        >
          <Image
            src={'/icons/recording_mic.svg'}
            alt="recording mic"
            width={148}
            height={148}
            className={`w-[110px] h-[110px] ${
              isRunning && 'animate-pulse border-red-500'
            }`}
          />
        </button>
      </div>
      {/* {audioURL && <audio src={audioURL} controls />} */}
      <div className="space-y-4 mt-5">
        {transcript && (
          <>
            <h1 className="text-xl">Transcript</h1>
            <p className="text-sm text-gray-500">{transcript}</p>
          </>
        )}
        {summary && (
          <>
            <h1 className="text-xl">Summary</h1>
            <p className="text-sm text-gray-500">{summary}</p>
          </>
        )}
        {actionItems.length > 0 && (
          <>
            <h1 className="text-xl">Action Items</h1>
            <ul className="list-disc">
              {actionItems.map((item, idx) => (
                <li className="text-sm text-gray-500 ml-5" key={idx}>
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default RecordVoicePage;
