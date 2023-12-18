import { getCurrentDate, getCurrentFormattedDate } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

export default function RecordingDesktop({
  actionItems,
  summary,
  transcription,
  title,
}: {
  actionItems?: string[];
  summary?: string;
  transcription?: string;
  title?: string;
}) {
  const [originalIsOpen, setOriginalIsOpen] = useState<boolean>(true);

  return (
    <div className="hidden md:block">
      <div className="max-width mt-5 flex items-center justify-between">
        <div />
        <h1 className="leading text-center text-xl font-medium leading-[114.3%] tracking-[-0.75px] text-dark md:text-[35px] lg:text-[43px]">
          {title ?? 'Untitled Note'}
        </h1>
        <div className="flex items-center justify-center">
          <p className="text-lg opacity-80">{getCurrentFormattedDate()}</p>
        </div>
      </div>
      <div className="mt-[18px] grid h-fit w-full grid-cols-2 border px-[30px] py-[19px] lg:px-[45px]">
        <div className="flex w-full items-center justify-center gap-[50px] border-r  lg:gap-[70px]">
          <div className="flex items-center gap-4">
            <button
              className={`text-xl leading-[114.3%] tracking-[-0.6px] text-dark lg:text-2xl ${
                originalIsOpen ? 'opacity-100' : 'opacity-40'
              } transition-all duration-300`}
            >
              Transcript
            </button>
            <div
              onClick={() => setOriginalIsOpen(!originalIsOpen)}
              className="flex h-[20px] w-[36px] cursor-pointer items-center rounded-full bg-dark px-[1px]"
            >
              <div
                className={`h-[18px] w-4 rounded-[50%] bg-light ${
                  originalIsOpen ? 'translate-x-0' : 'translate-x-[18px]'
                } transition-all duration-300`}
              ></div>
            </div>
            <button
              className={`text-xl leading-[114.3%] tracking-[-0.6px] text-dark lg:text-2xl ${
                !originalIsOpen ? 'opacity-100' : 'opacity-40'
              } transition-all duration-300`}
            >
              Summary
            </button>
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-xl leading-[114.3%] tracking-[-0.75px] text-dark lg:text-2xl xl:text-[30px]">
            Action Items
          </h1>
        </div>
      </div>
      <div className="grid h-full w-full grid-cols-2 px-[30px] lg:px-[45px]">
        <div className="relative min-h-[70vh] w-full border-r px-5 py-3 text-justify text-xl font-[300] leading-[114.3%] tracking-[-0.6px] lg:text-2xl">
          <div className="">{originalIsOpen ? transcription : summary}</div>
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center justify-center">
            <Link href="/record" className="mt-[55px]">
              <img
                src={'/icons/mic_plus.svg'}
                alt="mic plus"
                width={88}
                height={88}
                className="h-[52px] w-[52px] md:h-[74px] md:w-[74px]"
              />
            </Link>
          </div>
        </div>
        <div className="relative mx-auto mt-[27px] w-full max-w-[900px] px-5 md:mt-[45px]">
          {actionItems?.map((item: any, index: number) => (
            <div
              className="border-[#00000033] py-2 md:border-t-[1px]"
              key={index}
            >
              <div className="flex w-full items-center gap-[21px]">
                <input
                  type="checkbox"
                  name="task"
                  id="task"
                  className="h-5 w-5 bg-transparent"
                />
                <div className="w-full">
                  <p className="text-[17px] font-[300] text-dark md:text-xl lg:text-2xl">
                    {item}
                  </p>
                </div>
              </div>
              <div className="flex items-end justify-end">
                {' '}
                <p className="hidden text-[17px] font-[300] leading-[249%] tracking-[-0.6px] text-dark opacity-60 md:inline-block md:text-xl lg:text-2xl">
                  {getCurrentDate()}
                </p>
              </div>
            </div>
          ))}
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center justify-center">
            <Link
              className="rounded-[7px] bg-dark px-5 py-[15px] text-[17px] leading-[79%] tracking-[-0.75px] text-light md:text-xl lg:px-[37px]"
              style={{ boxShadow: ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
              href="/dashboard/action-items"
            >
              View All Action Items
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
