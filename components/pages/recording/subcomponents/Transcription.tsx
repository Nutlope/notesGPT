import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { MutableRefObject, useMemo, useRef, useState } from 'react';

enum Title {
  transcription = 'Transcription',
  tweet = 'Tweet',
  blogPost = 'Blog post',
}

export const Transcription = ({
  note,
  target,
}: {
  note: Doc<'notes'>;
  target: 'transcription' | 'tweet' | 'blogPost';
}) => {
  const text = useMemo(() => note[target] || '', [note, target]);

  const [disabled, setDisabled] = useState(true);
  const textAreaRef: MutableRefObject<any> = useRef(null);

  const mutateNote = useMutation(api.notes.updateNote);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };

  const handleEdit = () => {
    setDisabled(false);
  };

  const handleSubmit = () => {
    mutateNote({ noteId: note._id, target: target, transcription: textAreaRef.current?.value });
    setDisabled(true);
  };

  return (
    <div className="my-10">
      <div className="mx-auto flex max-w-7xl justify-between sm:px-6 lg:px-8">
        <h4 className="text-l text-gray-400">{Title[target]}</h4>
        <div>
          <button className="mx-5 text-blue-400" onClick={handleCopy}>
            Copy
          </button>
          {disabled ? (
            <button className="mx-5 text-blue-400" onClick={handleEdit}>
              Edit
            </button>
          ) : (
            <button className="mx-5 text-green-400" onClick={handleSubmit}>
              Save
            </button>
          )}
        </div>
      </div>
      {disabled ? (
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{text}</div>
      ) : (
        <textarea
          ref={textAreaRef}
          className="mx-auto block w-full max-w-7xl resize-none border-0 border-b border-transparent lg:px-8"
          id="comment"
          defaultValue={text}
        />
      )}
    </div>
  );
};
