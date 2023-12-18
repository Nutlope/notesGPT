import Image from 'next/image';

const HowItWorks = () => {
  return (
    <div className="h-full w-full pb-[150px]">
      {/* section header */}
      <div className="relative flex w-full items-center justify-center md:h-[261px]">
        <div
          className="h-[1.5px] w-full"
          style={{
            background:
              'linear-gradient(to right, #00000082, #0D0C0C42, #0000003D, #161616',
          }}
        ></div>
        <h1
          className="shrink-0 text-[30px] font-medium text-dark md:text-5xl lg:text-[63px]"
          style={{
            lineHeight: '90.3%',
            letterSpacing: '-1.575px',
          }}
        >
          How it Works
        </h1>
        <div
          className="h-[1.5px] w-full"
          style={{
            background:
              'linear-gradient(to right, #00000082, #0D0C0C42, #0000003D, #161616',
          }}
        ></div>
        {/* gradient container */}
        <div className="max-width  absolute bottom-0 left-0 right-0 top-0 z-[-1] hidden h-full w-full grid-cols-3 md:grid">
          <div
            className="h-full w-full rounded-full"
            style={{
              opacity: '0.8',
              background:
                'radial-gradient(54.14% 54.14% at 50% 50%, #40023A 0%, rgba(61, 0, 108, 0.02) 100%)',
              filter: 'blur(177px)',
            }}
          ></div>
          <div
            className="h-full w-full rounded-full"
            style={{
              opacity: '1',
              background:
                'radial-gradient(54.14% 54.14% at 50% 50%, #40023A 0%, rgba(61, 0, 108, 0.02) 100%)',
              filter: 'blur(177px)',
            }}
          ></div>
          <div
            className="h-full w-full rounded-full"
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
      <div className="max-width mt-[55px] h-fit w-full items-stretch md:mt-[34px]  lg:flex lg:gap-[75px]">
        <div className="flex  w-fit gap-4">
          <div className="relative my-[27.5px] flex shrink-0 flex-col justify-between gap-[74px] md:my-[52.5px] md:gap-[144px]">
            <div className="z-10 h-[16px] w-[16px] border border-primary md:h-[25px] md:w-[25px] lg:h-[32px] lg:w-[32px] "></div>
            <div className="z-10 h-[16px] w-[16px] border border-primary bg-primary md:h-[25px] md:w-[25px] lg:h-[32px] lg:w-[32px]"></div>
            <div className="z-10 h-[16px] w-[16px] border border-primary md:h-[25px] md:w-[25px] lg:h-[32px] lg:w-[32px]"></div>
            {/* progress */}
            <div className="progress-bar  absolute bottom-4 left-1/2 top-4 z-[-1] w-[1px] -translate-x-1/2 md:bottom-[25px] md:top-[25px] lg:bottom-8 lg:top-8"></div>
          </div>
          <div className="relative flex w-full flex-col justify-between gap-[21px] md:gap-[41px]">
            <div
              className="flex h-[71px] w-full shrink-0 items-center gap-[21px] rounded-[2px] px-[19px] py-[22px] md:h-[135px] md:gap-[31px] md:px-[28px] md:py-[38px] lg:w-[590px]"
              style={{
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
              }}
            >
              <div
                className="flex h-[26px] w-[26px] items-center justify-center rounded-[50%] border border-black text-[17px] md:h-[60px] md:w-[60px] md:text-[30px]"
                style={{
                  lineHeight: '87%',
                  letterSpacing: '-2.7px',
                }}
              >
                1
              </div>
              <h1
                className="grow text-[17px] font-medium md:text-2xl lg:text-[30px]"
                style={{
                  lineHeight: '87%',
                }}
              >
                Sign up with ease
              </h1>
            </div>
            <div
              className="flex h-[71px] w-full grow    items-center gap-[21px] rounded-[2px] px-[19px] py-[22px] md:h-[135px] md:gap-[31px] md:px-[28px] md:py-[38px] lg:w-[590px]"
              style={{
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                background:
                  'linear-gradient(89deg, #290248 -3.13%, rgba(63, 17, 100, 0.94) 47.81%, rgba(14, 14, 18, 0.82) 108.57%)',
              }}
            >
              <div
                className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[50%] bg-white text-[17px] md:h-[60px] md:w-[60px] md:text-[30px]"
                style={{
                  lineHeight: '87%',
                  letterSpacing: '-2.7px',
                }}
              >
                2
              </div>
              <h1
                className="grow text-[17px] font-medium text-light md:text-2xl lg:text-[30px]"
                style={{
                  lineHeight: '87%',
                }}
              >
                Start recording instantly
              </h1>
            </div>
            <div
              className="flex h-[71px] w-full grow   items-center gap-[21px] rounded-[2px] px-[19px] py-[22px] md:h-[135px] md:gap-[31px] md:px-[28px] md:py-[38px] lg:w-[590px]"
              style={{
                boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
              }}
            >
              <div
                className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[50%] border border-black text-[17px] md:h-[60px] md:w-[60px] md:text-[30px]"
                style={{
                  lineHeight: '87%',
                  letterSpacing: '-2.7px',
                }}
              >
                3
              </div>
              <h1
                className="grow text-[17px] font-medium md:text-2xl lg:text-[30px]"
                style={{
                  lineHeight: '87%',
                }}
              >
                Check out the AI generated action items/summaries
              </h1>
            </div>
          </div>
        </div>
        <div className="hidden h-full w-full items-center border lg:flex ">
          <Image
            src="/images/dashboard.png"
            width={1000}
            height={800}
            alt="Dashboard"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
