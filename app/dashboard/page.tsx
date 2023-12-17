'use client';
import RecordedfileItemCard from '@/components/pages/dashboard/RecordedfileItemCard';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/clerk-react';
import { useQuery } from 'convex/react';
import Image from 'next/image';
import Link from 'next/link';

const DashboardHomePage = () => {
  const { user } = useUser();
  const id = user?.id;

  const allNotes = useQuery(api.notes.getNotes, { userId: id });

  return (
    <div className="min-h-[100vh] w-full bg-light">
      <div
        className="hidden w-full py-[23px] md:inline-block md:py-4 lg:py-[25px]"
        style={{ borderBottom: ' 0.3px solid rgba(158, 158, 158, 0.40)' }}
      >
        <h1 className="text-center text-xl font-medium text-dark md:text-[35px] lg:text-[43px]">
          Your Voice Notes
        </h1>
      </div>
      {/* search bar */}
      <div
        className="mx-auto mb-4 mt-4 flex h-fit w-[90%] items-center gap-[17px] rounded bg-white px-[11px] py-[10px] sm:px-[15px] md:mb-[42px] md:w-[623px] md:px-[40px] md:py-[13px]"
        style={{ border: ' 1px solid rgba(0, 0, 0, 0.40)' }}
      >
        <Image
          src="/icons/search.svg"
          width={27}
          height={26}
          alt="search"
          className="h-5 w-5 md:h-[26px] md:w-[27px]"
        />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-transparent text-[17px] font-normal outline-none md:text-xl lg:text-2xl"
        />
      </div>
      {/* recorded items */}
      <div className="h-fit w-full max-w-[1360px] md:px-5 xl:mx-auto">
        {/* file item */}
        {allNotes &&
          allNotes.map((item, index) => (
            <RecordedfileItemCard {...item} key={index} />
          ))}
        {!allNotes && (
          <div className="flex h-[50vh] w-full items-center justify-center">
            <p className="text-center text-2xl text-dark">
              You currently have no <br /> recordings.
            </p>
          </div>
        )}
      </div>
      {/* actions button container */}
      <div className="mx-auto mt-[40px] flex h-fit w-full flex-col items-center border px-5 pb-10 md:mt-[50px] lg:pb-5">
        <div className="mt-10 flex space-x-6">
          <Link
            className="rounded-[7px] bg-dark px-[37px] py-[15px] text-[17px] leading-[79%] tracking-[-0.75px] text-light md:text-2xl"
            style={{ boxShadow: ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
            href="/record"
          >
            Record a New Voice Note
          </Link>
          {allNotes && (
            <Link
              className="rounded-[7px] px-[37px] py-[15px] text-[17px] leading-[79%] tracking-[-0.75px] md:text-2xl"
              style={{ boxShadow: ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
              href="/dashboard/action-items"
            >
              View Action Items
            </Link>
          )}
        </div>
      </div>
      )
    </div>
  );
};

export default DashboardHomePage;
