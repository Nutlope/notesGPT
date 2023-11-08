'use client';

import { useState } from 'react';
import * as Bytescale from '@bytescale/sdk';

const uploadManager = new Bytescale.UploadManager({
  apiKey: process.env.NEXT_PUBLIC_BYTESCALE_API_KEY!,
});

export default function AudioRecorder() {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioURL, setAudioURL] = useState('');
  const [transcript, setTranscript] = useState('');

  async function startRecording() {
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

      // saveAs(audioBlob, 'recording.mp3');
      const { fileUrl } = await uploadManager.upload({
        data: audioBlob,
      });
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
      console.log({ fileUrl });
    };

    setMediaRecorder(recorder as any);
    recorder.start();
  }

  function stopRecording() {
    // @ts-ignore
    mediaRecorder.stop();
  }

  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      {audioURL && <audio src={audioURL} controls />}
      {transcript && <p>{transcript}</p>}
    </div>
  );
}
