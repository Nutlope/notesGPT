import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import Link from 'next/link';

const RecordedfileItemCard = ({
  title,
  count,
  _creationTime,
  _id,
}: {
  title?: string;
  count: number;
  _creationTime: number;
  _id: any;
}) => {
  const deleteNote = useMutation(api.notes.removeNote);

  return (
    <Link
      href={`/recording/${_id}`}
      className="mx-2 flex items-center justify-between border-[0.5px] border-[#00000050] bg-white px-[23px] py-[17px] transition hover:bg-gray-100 md:w-full"
    >
      <div className="flex w-fit items-center gap-[23px]">
        <div className="hidden items-center justify-center rounded-[50%] bg-dark p-2.5 md:flex ">
          <img
            src="/icons/file_symbol.svg"
            width={20}
            height={20}
            alt="file"
            className="h-5 w-5 md:h-[20px] md:w-[20px]"
          />
        </div>
        <h1
          className="text-[17px] font-light text-dark md:text-xl lg:text-2xl"
          style={{
            lineHeight: '114.3%',
            letterSpacing: '-0.6px',
          }}
        >
          {title}
        </h1>
      </div>
      <div className="flex w-fit items-center gap-x-[40px] 2xl:gap-x-[56px]">
        <h3 className="hidden text-xl font-[200] leading-[114.3%] tracking-[-0.5px] md:inline-block">
          {new Date(_creationTime).toDateString()}
        </h3>
        <h3 className="hidden text-xl font-[200] leading-[114.3%] tracking-[-0.5px] md:inline-block">
          {count} tasks
        </h3>
        <button
          onClick={(e) => {
            e.preventDefault();
            deleteNote({ id: _id });
          }}
          className="flex h-fit w-fit cursor-pointer items-center justify-center gap-5 bg-transparent p-2 transition hover:scale-125 md:inline-block"
        >
          <img src={'/icons/delete.svg'} alt="delete" width={20} height={20} />
        </button>
      </div>
    </Link>
  );
};

export default RecordedfileItemCard;
