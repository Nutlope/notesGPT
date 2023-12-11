import Image from 'next/image';
import React from 'react';

const actionItems: any = [
  {
    title: 'Finalize the project proposal with a looming deadline.',
    date: '11/02/2023',
    from: 'Workout Plans Note',
  },
  {
    title: 'Finalize the project proposal with a looming deadline.',
    date: '11/02/2023',
  },
  {
    title: 'Finalize the project proposal with a looming deadline.',
    date: '11/02/2023',
    from: 'Workout Plans Note',
  },
  {
    title: 'Finalize the project proposal with a looming deadline.',
    date: '11/02/2023',
  },
];

const ActionItemsPage = () => {
  return (
    <div className="w-full bg-light md:bg-transparent h-full min-h-[100vh]">
      {/* search bar visible only mobile devices */}
      <div
        className="w-[90%] mx-auto md:w-[623px] mt-4 mb-4 md:mb-[42px] bg-white rounded h-fit px-[11px] sm:px-[15px] md:px-[40px] py-[10px] md:py-[13px] flex items-center gap-[17px] md:hidden"
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
      {/* action items */}
      <div className="hidden md:flex items-center justify-center">
        <h1
          className="text-xl md:text-[35px] lg:text-[43px] font-medium text-dark text-center mt-[21px] "
          style={{
            lineHeight: '114.3%',
            letterSpacing: '-1.075px',
          }}
        >
          Action Items
        </h1>
      </div>
      <div className="w-full max-w-[900px] px-5 mx-auto mt-[27px] md:mt-[45px]">
        {actionItems?.map((item: any, index: number) => (
          <div
            className="md:border-t-[1px] border-[#00000033] py-2"
            key={index}
          >
            <div className="w-full flex gap-[21px] items-center">
              <input
                type="checkbox"
                name=""
                id=""
                className="w-5 h-5 md:mt-[12px] bg-transparent"
              />
              <div className="w-full">
                <p className="text-[17px] md:text-xl lg:text-2xl text-dark font-[300]">
                  {item?.title}
                </p>
                <p className="opacity-60 text-dark font-[300] hidden md:inline-block text-[17px] md:text-xl lg:text-2xl tracking-[-0.6px] leading-[249%]">
                  {item?.date}
                </p>
              </div>
            </div>
            <div className="flex items-end justify-end">
              {item?.from ? (
                <p className="opacity-60 text-dark font-[300] hidden md:inline-block text-[17px] md:text-xl lg:text-2xl tracking-[-0.6px] leading-[249%]">
                  From: {item?.from}
                </p>
              ) : (
                <p className="md:pt-6"></p>
              )}
            </div>
          </div>
        ))}
        <div className="md:border-t-[1px] border-[#00000033] py-2 md:flex items-center gap-5 cursor-pointer hidden ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
          >
            <g opacity="0.6">
              <line
                x1="10.5449"
                x2="10.5449"
                y2="21"
                stroke="#2D2D2D"
                stroke-width="2"
              />
              <line
                x1="21"
                y1="10.5455"
                y2="10.5455"
                stroke="#2D2D2D"
                stroke-width="2"
              />
            </g>
          </svg>
          <p className="text-xl lg:text-2xl text-dark opacity-60 ">
            Add a task
          </p>
        </div>
      </div>
      <div className="md:hidden w-full flex items-center justify-center">
        <button className="mt-[55px]">
          <Image
            src={'/icons/mic_plus.svg'}
            alt="mic plus"
            width={88}
            height={88}
            className="w-[52px] h-[52px]"
          />
        </button>
      </div>
    </div>
  );
};

export default ActionItemsPage;
