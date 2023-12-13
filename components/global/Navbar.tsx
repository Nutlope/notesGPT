import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div className="w-full py-4 px-10 relative m-0">
      <div className="max-width flex items-center justify-between">
        {/* logo */}
        <div className="flex items-center gap-[2px] w-fit">
          <img
            src="/logo.svg"
            width={50}
            height={50}
            alt="logo"
            className="w-[21px] h-[21px] md:w-[30px] md:h-[30px]"
          />
          <h1 className="text-[#25292F] text-xl md:text-[26px] lg:text-[33px] font-medium">
            NotesGPT
          </h1>
        </div>
        {/* buttons */}
        <div className="w-fit flex items-center gap-[22px]">
          <Link href="/dashboard">
            <button
              className="text-lg lg:text-xl w-[107px] h-[46px] text-center rounded-lg hidden md:inline-block"
              style={{ border: '1px solid var(--White, #2D2D2D)' }}
            >
              Sign in
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="text-sm md:text-lg lg:text-xl w-[109px] md:w-[140px] h-[32px] lg:w-[163px] md:h-[46px] text-center rounded-lg primary-gradient primary-shadow text-light">
              Get Started
            </button>
          </Link>
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
