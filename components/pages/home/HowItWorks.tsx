import Image from 'next/image';
import React from 'react';

const HowItWorks = () => {
  return (
    <div className="w-full h-full pb-[150px]">
      {/* section header */}
      <div className="flex w-full md:h-[261px] justify-center items-center relative">
        <div
          className="w-full h-[1.5px]"
          style={{
            background:
              'linear-gradient(to right, #00000082, #0D0C0C42, #0000003D, #161616',
          }}
        ></div>
        <h1
          className="shrink-0 text-dark text-[30px] md:text-5xl lg:text-[63px] font-medium"
          style={{
            lineHeight: '90.3%',
            letterSpacing: '-1.575px',
          }}
        >
          How it Works
        </h1>
        <div
          className="w-full h-[1.5px]"
          style={{
            background:
              'linear-gradient(to right, #00000082, #0D0C0C42, #0000003D, #161616',
          }}
        ></div>
        {/* gradient container */}
        <div className="max-width  absolute top-0 right-0 bottom-0 left-0 w-full h-full md:grid grid-cols-3 hidden z-[-1]">
          <div
            className="w-full h-full rounded-full"
            style={{
              opacity: '0.8',
              background:
                'radial-gradient(54.14% 54.14% at 50% 50%, #40023A 0%, rgba(61, 0, 108, 0.02) 100%)',
              filter: 'blur(177px)',
            }}
          ></div>
          <div
            className="w-full h-full rounded-full"
            style={{
              opacity: '1',
              background:
                'radial-gradient(54.14% 54.14% at 50% 50%, #40023A 0%, rgba(61, 0, 108, 0.02) 100%)',
              filter: 'blur(177px)',
            }}
          ></div>
          <div
            className="w-full h-full rounded-full"
            style={{
              opacity: '0.8',
              background:
                'radial-gradient(54.14% 54.14% at 50% 50%, #40023A 0%, rgba(61, 0, 108, 0.02) 100%)',
              filter: 'blur(177px)',
            }}
          ></div>
        </div>
      </div>
      {/* content body */}
      <div className="mt-[55px] md:mt-[34px] lg:flex w-full max-width lg:gap-[75px]  h-fit items-stretch">
        <div className="w-fit  flex gap-4">
          <div className="flex shrink-0 flex-col justify-between gap-[74px] md:gap-[144px] relative my-[27.5px] md:my-[52.5px]">
            <div className="w-[16px] h-[16px] md:w-[25px] md:h-[25px] lg:w-[32px] lg:h-[32px] border border-primary z-10 "></div>
            <div className="w-[16px] h-[16px] md:w-[25px] md:h-[25px] lg:w-[32px] lg:h-[32px] border border-primary bg-primary z-10"></div>
            <div className="w-[16px] h-[16px] md:w-[25px] md:h-[25px] lg:w-[32px] lg:h-[32px] border border-primary z-10"></div>
            {/* progress */}
            <div className="w-[1px]  progress-bar left-1/2 -translate-x-1/2 absolute top-4 bottom-4 md:top-[25px] md:bottom-[25px] lg:top-8 lg:bottom-8 z-[-1]"></div>
          </div>
          <div className="flex flex-col justify-between gap-[21px] md:gap-[41px] relative w-full">
            <div
              className="h-[71px] md:h-[135px] w-full lg:w-[590px] rounded-[2px] flex items-center gap-[21px] md:gap-[31px] px-[19px] py-[22px] md:px-[28px] md:py-[38px] shrink-0"
              style={{
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
              }}
            >
              <div
                className="w-[26px] h-[26px] md:w-[60px] md:h-[60px] rounded-[50%] border border-black flex items-center justify-center text-[17px] md:text-[30px]"
                style={{
                  lineHeight: '87%',
                  letterSpacing: '-2.7px',
                }}
              >
                1
              </div>
              <h1
                className="text-[17px] md:text-2xl lg:text-[30px] font-medium grow"
                style={{
                  lineHeight: '87%',
                }}
              >
                Sign up with ease
              </h1>
            </div>
            <div
              className="h-[71px] md:h-[135px] grow w-full    lg:w-[590px] rounded-[2px] flex items-center gap-[21px] md:gap-[31px] px-[19px] py-[22px] md:px-[28px] md:py-[38px]"
              style={{
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                background:
                  'linear-gradient(89deg, #290248 -3.13%, rgba(63, 17, 100, 0.94) 47.81%, rgba(14, 14, 18, 0.82) 108.57%)',
              }}
            >
              <div
                className="w-[26px] h-[26px] md:w-[60px] md:h-[60px] rounded-[50%] flex items-center justify-center text-[17px] md:text-[30px] shrink-0 bg-white"
                style={{
                  lineHeight: '87%',
                  letterSpacing: '-2.7px',
                }}
              >
                2
              </div>
              <h1
                className="text-[17px] md:text-2xl lg:text-[30px] font-medium grow text-light"
                style={{
                  lineHeight: '87%',
                }}
              >
                Start recording instantly
              </h1>
            </div>
            <div
              className="h-[71px] md:h-[135px] grow w-full   lg:w-[590px] rounded-[2px] flex items-center gap-[21px] md:gap-[31px] px-[19px] py-[22px] md:px-[28px] md:py-[38px]"
              style={{
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
              }}
            >
              <div
                className="w-[26px] h-[26px] md:w-[60px] md:h-[60px] rounded-[50%] border border-black flex items-center justify-center text-[17px] md:text-[30px] shrink-0"
                style={{
                  lineHeight: '87%',
                  letterSpacing: '-2.7px',
                }}
              >
                3
              </div>
              <h1
                className="text-[17px] md:text-2xl lg:text-[30px] font-medium grow"
                style={{
                  lineHeight: '87%',
                }}
              >
                Check out the AI generated action items/summaries
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full h-full hidden lg:flex items-center border ">
          <Image
            src="/images/dashboard1.png"
            width={1000}
            height={800}
            alt="dashboard1"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
