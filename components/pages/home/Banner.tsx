import Link from 'next/link';
import React from 'react';

const Banner = () => {
  return (
    <div className="w-full h-[350px] md:h-[605px]  relative px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-0">
      <div className="w-full h-full flex flex-col justify-center">
        <h1 className="text-dark text-4xl lg:text-7xl font-medium text-center inline-block tracking-tighter">
          AI-Powered Voice <br className="hidden lg:inline-block" />
          Note Taking
        </h1>
        <p className="text-xl lg:text-3xl mt-8 text-center font-light tracking-tight">
          NotesGPT seamlessly converts your voice notes into{' '}
          <span className="font-bold">
            organized <br className="hidden lg:inline-block" />
            summaries
          </span>{' '}
          and <span className="font-bold">clear action items</span> using AI.
        </p>
        <div className="flex w-full h-fit justify-center items-center absolute right-0 left-0 bottom-0">
          <Link
            href={'/dashboard'}
            className="shrink-0 text-sm md:text-2xl py-2 px-4 md:py-4 md:px-12 text-center rounded-full primary-gradient primary-shadow text-light flex gap-5 items-center justify-center"
          >
            Get Started
            <img
              src="/icons/logout-03.svg"
              alt=""
              className="mt-2 h-6 w-6 md:w-9 md:h-9"
            />
          </Link>
        </div>
      </div>
      {/* background gradient */}
      <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full md:grid grid-cols-3 hidden z-[-1]">
        <BackgroundGradient />
        <BackgroundGradient />
        <BackgroundGradient />
      </div>
    </div>
  );
};

function BackgroundGradient() {
  return (
    <div
      className="w-full h-full rounded-full"
      style={{
        opacity: '0.4',
        background:
          'radial-gradient(54.14% 54.14% at 50% 50%, #650293 0%, rgba(103, 2, 139, 0.02) 100%)',
        filter: 'blur(177px)',
      }}
    />
  );
}

export default Banner;
