import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { timestampToDate } from '@/convex/utils';
import { formatTimestamp } from '@/lib/utils';
import { useMutation } from 'convex/react';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function RecordingDesktop({
  note,
  actionItems,
}: {
  note: Doc<'notes'>;
  actionItems: Doc<'actionItems'>[];
}) {
  const {
    generatingActionItems,
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

  const mutateActionItems = useMutation(api.notes.removeActionItem);
  const mutateTranscription = useMutation(api.notes.modifyNoteByUsage)
  const mutateNote = useMutation(api.notes.updateNote)

  function removeActionItem(actionId: any) {
    // Trigger a mutation to remove the item from the list
    mutateActionItems({ id: actionId });
  }

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
  console.log({generatingActionItems, generatingTitle,generatingTranscript})

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

  return (
    <div className="hidden md:block">
      <div className="max-width mt-5 flex items-center justify-between">
        <div />
        <h1
          className={`leading text-center text-xl font-medium leading-[114.3%] tracking-[-0.75px] text-dark md:text-[35px] lg:text-[43px] ${
            generatingTitle && 'animate-pulse'
          }`}
        >
          {generatingTitle ? 'Generating Title...' : title ?? 'Untitled Note'}
        </h1>
        <div className="flex items-center justify-center">
          <p className="text-lg opacity-80">
            {formatTimestamp(Number(_creationTime))}
          </p>
        </div>
      </div>
      <div className="mt-[18px] grid h-fit w-full grid-cols-2 px-[30px] py-[19px] lg:px-[45px]">
        <div className="flex w-full items-center justify-center gap-[50px] border-r  lg:gap-[70px]">
          <div className="flex items-center gap-4">
            <button
              className={`text-xl leading-[114.3%] tracking-[-0.6px] text-dark lg:text-2xl ${
                originalIsOpen ? 'opacity-100' : 'opacity-40'
              } transition-all duration-300`}
            >
              Transcript
            </button>
            <div
              onClick={() => setOriginalIsOpen(!originalIsOpen)}
              className="flex h-[20px] w-[36px] cursor-pointer items-center rounded-full bg-dark px-[1px]"
            >
              <div
                className={`h-[18px] w-4 rounded-[50%] bg-light ${
                  originalIsOpen ? 'translate-x-0' : 'translate-x-[18px]'
                } transition-all duration-300`}
              />
            </div>
            <button
              className={`text-xl leading-[114.3%] tracking-[-0.6px] text-dark lg:text-2xl ${
                !originalIsOpen ? 'opacity-100' : 'opacity-40'
              } transition-all duration-300`}
            >
              Summary
            </button>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-xl leading-[114.3%] tracking-[-0.75px] text-dark lg:text-2xl xl:text-[30px]">
            Action Items
          </h1>
        </div>
      </div>
      <div className="grid h-full w-full grid-cols-2 px-[30px] lg:px-[45px]">
        <div className="relative min-h-[70vh] w-full border-r px-5 py-3 text-justify text-xl font-[300] leading-[114.3%] tracking-[-0.6px] lg:text-2xl">
          {transcription ? (
            <div className="">{originalIsOpen ? transcription : summary}</div>
          ) : (
            // Loading state for transcript
            <ul className="animate-pulse space-y-3">
              <li className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-700"></li>
              <li className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-700"></li>
              <li className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-700"></li>
              <li className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-700"></li>
              <li className="h-6 w-full rounded-full bg-gray-200 dark:bg-gray-700"></li>
            </ul>
          )}
        </div>
        <div className="relative mx-auto mt-[27px] w-full max-w-[900px] px-5 md:mt-[45px]">
          {generatingActionItems
            ? [0, 1, 3].map((item: any, idx: number) => (
                <div
                  className="animate-pulse border-[#00000033] py-1 md:border-t-[1px] md:py-2"
                  key={idx}
                >
                  <div className="flex w-full justify-center">
                    <div className="group w-full items-center rounded p-2 text-lg font-[300] text-dark transition-colors duration-300 checked:text-gray-300 hover:bg-gray-100 md:text-2xl">
                      <div className="flex items-center">
                        <input
                          disabled
                          type="checkbox"
                          checked={false}
                          className="mr-4 h-5 w-5 cursor-pointer rounded-sm border-2 border-gray-300"
                        />
                        <label className="h-5 w-full rounded-full bg-gray-200" />
                      </div>
                      <div className="flex justify-between md:mt-2">
                        <p className="ml-9 text-[15px] font-[300] leading-[249%] tracking-[-0.6px] text-dark opacity-60 md:inline-block md:text-xl lg:text-xl">
                          {new Date(Number(_creationTime)).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : actionItems?.map((item: any, idx: number) => (
                <div
                  className="border-[#00000033] py-1 md:border-t-[1px] md:py-2"
                  key={idx}
                >
                  <div className="flex w-full justify-center">
                    <div className="group w-full items-center rounded p-2 text-lg font-[300] text-dark transition-colors duration-300 checked:text-gray-300 hover:bg-gray-100 md:text-2xl">
                      <div className="flex items-center">
                        <input
                          onChange={(e) => {
                            if (e.target.checked) {
                              removeActionItem(item._id);
                              toast.success('1 task completed.');
                            }
                          }}
                          type="checkbox"
                          checked={false}
                          className="mr-4 h-5 w-5 cursor-pointer rounded-sm border-2 border-gray-300"
                        />
                        <label className="">{item?.task}</label>
                      </div>
                      <div className="flex justify-between md:mt-2">
                        <p className="ml-9 text-[15px] font-[300] leading-[249%] tracking-[-0.6px] text-dark opacity-60 md:inline-block md:text-xl lg:text-xl">
                          {new Date(Number(_creationTime)).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center justify-center">
            <Link
              className="rounded-[7px] bg-dark px-5 py-[15px] text-[17px] leading-[79%] tracking-[-0.75px] text-light md:text-xl lg:px-[37px]"
              style={{ boxShadow: ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
              href="/dashboard/action-items"
            >
              View All Action Items
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
