import { getCurrentDate, getCurrentFormattedDate } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';

export default function RecordingMobile({
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
  const [transcriptOpen, setTranscriptOpen] = useState<boolean>(true);
  const [summaryOpen, setSummaryOpen] = useState<boolean>(false);
  const [actionItemOpen, setActionItemOpen] = useState<boolean>(false);
  return (
    <div className="md:hidden">
      <div className="max-width my-5 flex items-center justify-center">
        <h1 className="leading text-center text-xl font-medium leading-[114.3%] tracking-[-0.75px] text-dark md:text-[35px] lg:text-[43px]">
          {title ?? 'Untitled Note'}
        </h1>
      </div>
      <div className="grid w-full grid-cols-3 ">
        <button
          onClick={() => (
            setTranscriptOpen(!transcriptOpen),
            setActionItemOpen(false),
            setSummaryOpen(false)
          )}
          className={`py-[12px] text-[17px] leading-[114.3%] tracking-[-0.425px] ${
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
          className={`py-[12px] text-[17px] leading-[114.3%] tracking-[-0.425px] ${
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
          className={`py-[12px] text-[17px] leading-[114.3%] tracking-[-0.425px] ${
            actionItemOpen ? 'action-btn-active' : 'action-btn'
          }`}
        >
          Action Items
        </button>
      </div>
      <div className="w-full">
        {transcriptOpen && (
          <div className="relative min-h-[70vh] w-full px-4 py-3 text-justify text-base font-[300] leading-[114.3%] tracking-[-0.425px]">
            <div className="">{transcription}</div>
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center justify-center">
              <button className="mt-[55px]">
                <img
                  src={'/icons/mic_plus.svg'}
                  alt="mic plus"
                  width={88}
                  height={88}
                  className="h-[52px] w-[52px] md:h-[74px] md:w-[74px]"
                />
              </button>
            </div>
          </div>
        )}
        {summaryOpen && (
          <div className="relative min-h-[70vh] w-full px-4 py-3 text-justify text-base font-[300]  leading-[114.3%] tracking-[-0.425px]">
            {' '}
            {summary}{' '}
          </div>
        )}
        {actionItemOpen && (
          <div className="relative min-h-[70vh] w-full px-4 py-3">
            {' '}
            <div className="relative mx-auto mt-[27px] w-full max-w-[900px] px-5 md:mt-[45px]">
              {actionItems?.map((item: any, index: number) => (
                <div
                  className="border-[#00000033] py-2 md:border-t-[1px]"
                  key={index}
                >
                  <div className="flex w-full items-center gap-[21px]">
                    <input
                      type="checkbox"
                      name=""
                      id=""
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
              <div className="fixed bottom-5 left-1/2 flex -translate-x-1/2 items-center justify-center">
                <Link
                  className="rounded-[7px] bg-dark px-5 py-[15px] text-[17px] leading-[79%] tracking-[-0.75px] text-light md:text-xl lg:px-[37px]"
                  style={{
                    boxShadow: ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                  }}
                  href="/dashboard/action-items"
                >
                  View Action Items
                </Link>
              </div>
            </div>{' '}
          </div>
        )}
      </div>
    </div>
  );
}
