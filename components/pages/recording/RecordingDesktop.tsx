import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { timestampToDate } from '@/convex/utils';
import { useMutation } from 'convex/react';
import { useState } from 'react';

export default function RecordingDesktop({
  note,
}: {
  note: Doc<'notes'>;
}) {
  const {
    generatingTitle,
    generatingTranscript,
    summary,
    transcription = '',
    title,
    _creationTime,
  } = note;
  const [originalIsOpen, setOriginalIsOpen] = useState<boolean>(true);
  const [disabled, setDisabled] = useState(true)
  const [localTranscription, setLocalTranscription] = useState<string | undefined>(undefined)

  const mutateTranscription = useMutation(api.notes.modifyNoteByUsage)
  const mutateNote = useMutation(api.notes.updateNote)

  const handleCopy = () => {
    navigator.clipboard.writeText(note.transcription || '')
  }

  const handleEdit = () => {
    setLocalTranscription(transcription)
    setDisabled(false)
  }

  const handleSubmit = () => {
    localTranscription && mutateNote({noteId: note._id, transcription: localTranscription})
    setDisabled(true)
  }

  const modifyToTweet = () => {
    setLocalTranscription(undefined)
    mutateTranscription({noteId: note._id, transcript: localTranscription ?? transcription, target: 'tweet'})
  }

  const modifyToBlogPost = () => {
    setLocalTranscription(undefined)
    mutateTranscription({noteId: note._id, transcript: localTranscription ?? transcription, target: 'blog post'})
  }

  const modifyToCustom = (target?: string) => {
    if(!target) {
      return
    }
    setLocalTranscription(undefined)
    mutateTranscription({noteId: note._id, transcript: localTranscription ?? transcription, target})
  }

  return (
    <div className="min-h-full">
      {generatingTranscript || generatingTitle && <div
      className="self-center mx-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-[#332d2d] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status">
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span>
    </div>}
      <div className="py-10">
        <header>
          <div className="flex justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">{title}</h1>
          <h4 className="text-l font-bold leading-tight tracking-tight text-gray-400">{timestampToDate(_creationTime)}</h4>
          </div>
        </header>
        <main>
          <div className="my-10">
            <div className="flex justify-between mx-auto max-w-7xl sm:px-6 lg:px-8">
              <h4 className="text-l text-gray-400">Summary</h4>
              <div>
                <button className='text-blue-400 mx-5' onClick={handleCopy}>Copy</button>
                {disabled ? 
                <button className='text-blue-400 mx-5' onClick={handleEdit}>Edit</button> : 
                <button className='text-green-400 mx-5' onClick={handleSubmit}>Save</button>}
              </div>
            </div>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{note.summary}</div>
          </div>
          <div className="my-10">
            <div className="mx-auto max-w-7xl max-h-30 sm:px-6 lg:px-8 text-gray-400">Transcript</div>
            <textarea
              onChange={e => setLocalTranscription(e.target.value)}
              disabled={disabled} 
              rows={4}
              name="comment"
              id="comment"
              className="mx-auto block w-full max-w-7xl lg:px-8 resize-none border-0 border-b border-transparent"
              value={localTranscription ?? transcription}
            />
          </div>
        </main>
      </div>
      <footer>
        <div className="min-h-full py-10 mx-auto max-w-7xl">
          <div className="text-gray-400">Create</div>
          <div className="flex flex-row">
            <button className='text-blue-400 mr-5' onClick={modifyToTweet}>Tweet</button> 
            <button className='text-blue-400 mr-5' onClick={modifyToBlogPost}>Blog post</button> 
            <input
              type="text"
              id="custom target"
              className="text-blue-400 mr-5"
              placeholder="type your target"
              onKeyDown={(event: any)=>{
                if (event.key === 'Enter') {
                  modifyToCustom(event.target.value)
                }
              }}
            />
          </div>
        </div>
      </footer>
    </div>

  )
}
