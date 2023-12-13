import { api } from '@/convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import Link from 'next/link';

const RecordedfileItemCard = ({
  title,
  _creationTime,
  _id,
}: {
  title?: string;
  _creationTime: number;
  _id: any;
}) => {
  const deleteNote = useMutation(api.notes.removeNote);
  const actionItemLength = useQuery(api.notes.actionItemsForNote, {
    noteId: _id,
  });

  return (
    <Link
      href={`/recording/${_id}`}
      className="hover:bg-gray-100 transition w-full px-[23px] py-[17px] flex items-center justify-between bg-white border-[0.5px] border-[#00000050]"
    >
      <div className="w-fit flex items-center gap-[23px]">
        <div className="p-2.5 rounded-[50%] bg-dark md:flex items-center justify-center hidden ">
          <img
            src="/icons/file_symbol.svg"
            width={20}
            height={20}
            alt="file"
            className="w-5 h-5 md:w-[20px] md:h-[20px]"
          />
        </div>
        <h1
          className="text-[17px] md:text-xl lg:text-2xl text-dark font-light"
          style={{
            lineHeight: '114.3%',
            letterSpacing: '-0.6px',
          }}
        >
          {title}
        </h1>
      </div>
      <div className="w-fit flex items-center gap-x-[40px] 2xl:gap-x-[56px]">
        <h3 className="font-[200] text-xl leading-[114.3%] tracking-[-0.5px] hidden md:inline-block">
          {new Date(_creationTime).toDateString()}
        </h3>
        <h3 className="font-[200] text-xl leading-[114.3%] tracking-[-0.5px] hidden md:inline-block">
          {actionItemLength} tasks
        </h3>
        <Link href={`/dashboard`}>
          <button
            onClick={() => {
              deleteNote({ id: _id });
            }}
            className="gap-5 hover:scale-125 transition p-2 bg-transparent flex items-center justify-center h-fit w-fit md:inline-block"
          >
            <img
              src={'/icons/delete.svg'}
              alt="delete"
              width={20}
              height={20}
            />
          </button>
        </Link>
      </div>
    </Link>
  );
};

export default RecordedfileItemCard;
