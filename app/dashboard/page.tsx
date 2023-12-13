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
    <div className="w-full bg-light min-h-[100vh]">
      <div
        className="w-full py-[23px] md:py-4 lg:py-[25px] hidden md:inline-block"
        style={{ borderBottom: ' 0.3px solid rgba(158, 158, 158, 0.40)' }}
      >
        <h1 className="text-xl md:text-[35px] lg:text-[43px] font-medium text-dark text-center">
          Your Voice Notes
        </h1>
      </div>
      {/* search bar */}
      <div
        className="w-[90%] mx-auto md:w-[623px] mt-4 mb-4 md:mb-[42px] bg-white rounded h-fit px-[11px] sm:px-[15px] md:px-[40px] py-[10px] md:py-[13px] flex items-center gap-[17px]"
        style={{ border: ' 1px solid rgba(0, 0, 0, 0.40)' }}
      >
        <Image
          src="/icons/search.svg"
          width={27}
          height={26}
          alt="search"
          className="w-5 h-5 md:w-[27px] md:h-[26px]"
        />
        <input
          type="text"
          placeholder="Search"
          className="w-full outline-none bg-transparent font-normal text-[17px] md:text-xl lg:text-2xl"
        />
      </div>
      {/* recorded items */}
      <div className="w-full max-w-[1360px] h-fit md:px-5 xl:mx-auto">
        {/* file item */}
        {allNotes &&
          allNotes.map((item, index) => (
            <RecordedfileItemCard {...item} key={index} />
          ))}
        {!allNotes && (
          <div className="w-full flex items-center justify-center h-[50vh]">
            <p className="text-2xl text-dark text-center">
              You currently have no <br /> recordings.
            </p>
          </div>
        )}
      </div>
      {/* actions button container */}
      <div className="w-full mx-auto px-5 mt-[40px] md:mt-[50px] border h-fit flex flex-col items-center pb-10 lg:pb-5">
        <div className="space-x-6 mt-10 flex">
          <Link
            className="text-[17px] md:text-2xl tracking-[-0.75px] leading-[79%] text-light px-[37px] py-[15px] bg-dark rounded-[7px]"
            style={{ boxShadow: ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
            href="/record"
          >
            Record a New Voice Note
          </Link>
          {allNotes && (
            <Link
              className="text-[17px] md:text-2xl tracking-[-0.75px] leading-[79%] px-[37px] py-[15px] rounded-[7px]"
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
