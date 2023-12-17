'use client';

import { useUser } from '@clerk/clerk-react';
import Link from 'next/link';
import { UserNav } from '../ui/UserNav';

const Navbar = () => {
  const { user } = useUser();

  return (
    <div className="w-full py-4 md:px-10 relative m-0">
      <div className="max-width flex items-center justify-between">
        {/* logo */}
        <div className="flex items-center gap-[2px] w-fit">
          <img
            src="/logo.svg"
            width={50}
            height={50}
            alt="logo"
            className="w-5 h-5 md:w-7 md:h-7"
          />
          <h1 className="text-[#25292F] text-xl md:text-2xl font-medium">
            NotesGPT
          </h1>
        </div>
        {/* buttons */}
        <div className="w-fit flex items-center gap-[22px]">
          {user ? (
            <UserNav
              image={user?.imageUrl}
              name={user?.fullName!}
              email={user?.primaryEmailAddress?.emailAddress!}
            />
          ) : (
            <Link href="/dashboard">
              <button className="text-md md:text-xl px-5 md:px-10 py-1 md:py-2 text-center rounded-lg primary-gradient primary-shadow text-light">
                Sign in
              </button>
            </Link>
          )}
        </div>
      </div>
      <div
        className="absolute bottom-0 right-0 left-0 w-full h-[2px]"
        style={{
          background:
            'linear-gradient(to right, #161616, #0D0C0C42, #0000003D, #00000082',
        }}
      />
    </div>
  );
};

export default Navbar;
