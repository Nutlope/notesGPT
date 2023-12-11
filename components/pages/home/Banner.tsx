import Link from 'next/link';
import React from 'react';

const Banner = () => {
  return (
    <div className="w-full h-[350px] md:h-[605px]  relative px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-0">
      <div className="w-full h-full flex flex-col justify-center">
        <h1
          className="text-dark text-[45px] lg:text-[80px] font-medium text-center inline-block"
          style={{
            lineHeight: '90.3%',
            letterSpacing: '-2.5px',
          }}
        >
          AI-Powered Voice <br className="hidden lg:inline-block" />
          Note Taking
        </h1>
        <p
          className="text-xl lg:text-[30px] mt-[34px] text-center"
          style={{
            lineHeight: '114.3%',
            letterSpacing: ' -0.75px',
            fontWeight: 300,
          }}
        >
          NotesGPT seamlessly converts your voice notes into{' '}
          <span className="font-bold">
            organized <br className="hidden lg:inline-block" />
            summaries
          </span>{' '}
          and <span className="font-bold">clear action items</span> using AI.
        </p>
        <div className="flex w-full h-fit justify-center items-center absolute right-0 left-0 bottom-0">
          <div
            className="w-full h-[1.5px]"
            style={{
              background:
                'linear-gradient(to right, #00000082, #0D0C0C42, #0000003D, #161616',
            }}
          ></div>
          <Link
            href={'/dashboard'}
            className=" shrink-0 text-sm  md:text-lg lg:text-[30px] py-[10px] px-[15px] md:py-4 md:px-[50px] text-center rounded-lg primary-gradient primary-shadow text-light"
          >
            Get Started
          </Link>
          <div
            className="w-full h-[1.5px]"
            style={{
              background:
                'linear-gradient(to right, #00000082, #0D0C0C42, #0000003D, #161616',
            }}
          ></div>
        </div>
      </div>
      {/* background gradient */}
      <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full md:grid grid-cols-3 hidden z-[-1]">
        <div
          className="w-full h-full rounded-full"
          style={{
            opacity: '0.4',
            background:
              'radial-gradient(54.14% 54.14% at 50% 50%, #650293 0%, rgba(103, 2, 139, 0.02) 100%)',
            filter: 'blur(177px)',
          }}
        ></div>
        <div
          className="w-full h-full rounded-full"
          style={{
            opacity: '0.4',
            background:
              'radial-gradient(54.14% 54.14% at 50% 50%, #650293 0%, rgba(103, 2, 139, 0.02) 100%)',
            filter: 'blur(177px)',
          }}
        ></div>
        <div
          className="w-full h-full rounded-full"
          style={{
            opacity: '0.4',
            background:
              'radial-gradient(54.14% 54.14% at 50% 50%, #650293 0%, rgba(103, 2, 139, 0.02) 100%)',
            filter: 'blur(177px)',
          }}
        ></div>
      </div>
    </div>
  );
};

export default Banner;
