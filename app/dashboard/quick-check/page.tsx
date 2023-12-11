'use client';
import CustomNav from '@/components/global/CustomNav';
import Image from 'next/image';
import React, { useState } from 'react';

const original: string =
  "Just a quick check-in on today's to-dos. First off, gotta finalize the project proposal; the deadline's looming. Also, don't forget to call Sarah about the weekend plans—dinner reservations need to be sorted. Feeling a bit overwhelmed, but taking it one task at a time. Need to squeeze in a workout; it always helps clear the mind. Oh, and grab groceries on the way home. Feeling a mix of excitement and stress. Anyway, that's the update for now. Just wrapped up the client meeting, action items noted for the presentation revamp. Feeling a bit drained but motivated. Also, gotta pick up dry cleaning—long overdue. Mental note: check in with mom, it's been a while. Workouts? Need to make them more consistent. Energy's been a bit low. Oh, and that podcast recommendation from Jake—don't forget to check it out. Overall, a bit scattered but optimistic";
const summary: string =
  "Need to squeeze in a workout; it always helps clear the mind. Oh, and grab groceries on the way home. Feeling a mix of excitement and stress. Anyway, that's the update for now. Just wrapped up the client meeting, action items noted for the presentation revamp. Feeling a bit drained but motivated. Also, gotta pick up dry cleaning—long overdue. Workouts? Need to make them more consistent. Energy's been a bit low. Oh, and that podcast recommendation from Jake—don't forget to check it out. Overall, a bit scattered but optimistic";

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

const QuickCheckPage = () => {
  const [originalIsOpen, setOriginalIsOpen] = useState<boolean>(true);
  const [transcriptOpen, setTranscriptOpen] = useState<boolean>(true);
  const [summaryOpen, setSummaryOpen] = useState<boolean>(false);
  const [actionItemOpen, setActionItemOpen] = useState<boolean>(false);
  return (
    <div className="">
      <CustomNav title={'Quick Check-in'} />
      <div className="hidden md:flex items-center justify-between max-width">
        <div className=""></div>
        <h1
          className="text-xl md:text-[35px] lg:text-[43px] font-medium text-dark text-center mt-[21px] "
          style={{
            lineHeight: '114.3%',
            letterSpacing: '-1.075px',
          }}
        >
          Quick Check-in
        </h1>
        <div className="flex flex-col items-end">
          <p className="text-sm opacity-80">12/08/2023</p>
          <p className="text-sm opacity-80">01:52</p>
        </div>
      </div>
      <div className="w-full h-fit md:grid grid-cols-2 px-[30px] lg:px-[45px] border mt-[18px] hidden">
        <div className="w-full flex items-center gap-[50px] lg:gap-[70px] border-r py-[19px] ">
          <div className="flex items-center gap-4">
            <button
              className={`text-xl lg:text-2xl text-dark tracking-[-0.6px] leading-[114.3%] ${
                originalIsOpen ? 'opacity-100' : 'opacity-40'
              } transition-all duration-300`}
            >
              Original
            </button>
            <div
              onClick={() => setOriginalIsOpen(!originalIsOpen)}
              className="w-[36px] h-[20px] rounded-full bg-dark flex items-center px-[1px] cursor-pointer"
            >
              <div
                className={`w-4 h-[18px] bg-light rounded-[50%] ${
                  originalIsOpen ? 'translate-x-0' : 'translate-x-[18px]'
                } transition-all duration-300`}
              ></div>
            </div>
            <button
              className={`text-xl lg:text-2xl text-dark tracking-[-0.6px] leading-[114.3%] ${
                !originalIsOpen ? 'opacity-100' : 'opacity-40'
              } transition-all duration-300`}
            >
              Summary
            </button>
          </div>
          <div className="text-xl lg:text-2xl xl:text-[30px] text-dark tracking-[-0.75px] leading-[114.3%]">
            <h1>Transcript</h1>
          </div>
        </div>
        <div className="py-[19px] text-center">
          <h1 className="text-xl lg:text-2xl xl:text-[30px] text-dark tracking-[-0.75px] leading-[114.3%]">
            Action Items
          </h1>
        </div>
      </div>
      <div className="w-full h-full hidden md:grid grid-cols-2 px-[30px] lg:px-[45px] ">
        <div className="py-3 px-5 w-full text-justify text-xl lg:text-2xl font-[300] tracking-[-0.6px] leading-[114.3%] border-r min-h-[70vh] relative">
          <div className="">{originalIsOpen ? original : summary}</div>
          <div className="flex items-center justify-center absolute bottom-5 left-1/2 -translate-x-1/2">
            <button className="mt-[55px]">
              <Image
                src={'/icons/mic_plus.svg'}
                alt="mic plus"
                width={88}
                height={88}
                className="w-[52px] h-[52px] md:h-[74px] md:w-[74px]"
              />
            </button>
          </div>
        </div>
        <div className="w-full max-w-[900px] px-5 mx-auto mt-[27px] md:mt-[45px] relative">
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
                  className="w-5 h-5 bg-transparent"
                />
                <div className="w-full">
                  <p className="text-[17px] md:text-xl lg:text-2xl text-dark font-[300]">
                    {item?.title}
                  </p>
                </div>
              </div>
              <div className="flex items-end justify-end">
                {' '}
                <p className="opacity-60 text-dark font-[300] hidden md:inline-block text-[17px] md:text-xl lg:text-2xl tracking-[-0.6px] leading-[249%]">
                  {item?.date}
                </p>
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
          <div className="flex items-center justify-center absolute bottom-5 left-1/2 -translate-x-1/2">
            <button
              className="text-[17px] md:text-xl tracking-[-0.75px] leading-[79%] text-light px-5 lg:px-[37px] py-[15px] bg-dark rounded-[7px]"
              style={{ boxShadow: ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
            >
              View Action Items
            </button>
          </div>
        </div>
      </div>

      {/* for mobile devices */}
      <div className="w-full grid grid-cols-3 md:hidden ">
        <button
          onClick={() => (
            setTranscriptOpen(!transcriptOpen),
            setActionItemOpen(false),
            setSummaryOpen(false)
          )}
          className={`text-[17px] tracking-[-0.425px] leading-[114.3%] py-[12px] ${
            transcriptOpen ? 'action-btn-active' : 'action-btn'
          }`}
        >
          Transcript
        </button>
        <button
          onClick={() => (
            setTranscriptOpen(false),
            setActionItemOpen(false),
            setSummaryOpen(!summaryOpen)
          )}
          className={`text-[17px] tracking-[-0.425px] leading-[114.3%] py-[12px] ${
            summaryOpen ? 'action-btn-active' : 'action-btn'
          }`}
        >
          Summary
        </button>
        <button
          onClick={() => (
            setTranscriptOpen(false),
            setActionItemOpen(!actionItemOpen),
            setSummaryOpen(false)
          )}
          className={`text-[17px] tracking-[-0.425px] leading-[114.3%] py-[12px] ${
            actionItemOpen ? 'action-btn-active' : 'action-btn'
          }`}
        >
          Action Items
        </button>
      </div>
      <div className="w-full ">
        {transcriptOpen && (
          <div className="py-3 px-4 w-full text-justify text-base font-[300] tracking-[-0.425px] leading-[114.3%]  min-h-[70vh] relative">
            <div className="">{original}</div>
            <div className="flex items-center justify-center absolute bottom-5 left-1/2 -translate-x-1/2">
              <button className="mt-[55px]">
                <Image
                  src={'/icons/mic_plus.svg'}
                  alt="mic plus"
                  width={88}
                  height={88}
                  className="w-[52px] h-[52px] md:h-[74px] md:w-[74px]"
                />
              </button>
            </div>
          </div>
        )}
        {summaryOpen && (
          <div className="py-3 px-4 w-full text-justify text-base font-[300] tracking-[-0.425px] leading-[114.3%]  min-h-[70vh] relative">
            {' '}
            {summary}{' '}
          </div>
        )}
        {actionItemOpen && (
          <div className="py-3 px-4 w-full min-h-[70vh] relative">
            {' '}
            <div className="w-full max-w-[900px] px-5 mx-auto mt-[27px] md:mt-[45px] relative">
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
                      className="w-5 h-5 bg-transparent"
                    />
                    <div className="w-full">
                      <p className="text-[17px] md:text-xl lg:text-2xl text-dark font-[300]">
                        {item?.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-end justify-end">
                    {' '}
                    <p className="opacity-60 text-dark font-[300] hidden md:inline-block text-[17px] md:text-xl lg:text-2xl tracking-[-0.6px] leading-[249%]">
                      {item?.date}
                    </p>
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
              <div className="flex items-center justify-center fixed bottom-5 left-1/2 -translate-x-1/2">
                <button
                  className="text-[17px] md:text-xl tracking-[-0.75px] leading-[79%] text-light px-5 lg:px-[37px] py-[15px] bg-dark rounded-[7px]"
                  style={{ boxShadow: ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
                >
                  View Action Items
                </button>
              </div>
            </div>{' '}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickCheckPage;
