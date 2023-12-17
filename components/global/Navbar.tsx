'use client';

import { useUser } from '@clerk/clerk-react';
import Link from 'next/link';
import { UserNav } from '../ui/UserNav';

const Navbar = () => {
  const { user } = useUser();

  return (
    <div className="max-w-7xl mx-auto py-10 md:px-10 relative m-0">
      <div className="max-width flex items-center justify-between">
        {/* logo */}
        <div className="flex items-center gap-[2px] w-fit">
          <img
            src="/logo.svg"
            width={50}
            height={50}
            alt="logo"
            className="w-5 h-5 md:w-8 md:h-8"
          />
          <h1 className="text-[#25292F] text-xl md:text-3xl font-medium">
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
    </div>
  );
};

export default Navbar;
