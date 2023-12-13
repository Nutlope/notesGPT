import { getCurrentDate, getCurrentFormattedDate } from '@/lib/utils';
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
      <div className="flex items-center justify-center max-width my-5">
        <h1 className="text-xl md:text-[35px] lg:text-[43px] font-medium text-dark text-center leading tracking-[-0.75px] leading-[114.3%]">
          {title ?? 'Untitled Note'}
        </h1>
      </div>
      <div className="w-full grid grid-cols-3 ">
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
      <div className="w-full">
        {transcriptOpen && (
          <div className="py-3 px-4 w-full text-justify text-base font-[300] tracking-[-0.425px] leading-[114.3%] min-h-[70vh] relative">
            <div className="">{transcription}</div>
            <div className="flex items-center justify-center absolute bottom-5 left-1/2 -translate-x-1/2">
              <button className="mt-[55px]">
                <img
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
                        {item}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-end justify-end">
                    {' '}
                    <p className="opacity-60 text-dark font-[300] hidden md:inline-block text-[17px] md:text-xl lg:text-2xl tracking-[-0.6px] leading-[249%]">
                      {getCurrentDate()}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-center fixed bottom-5 left-1/2 -translate-x-1/2">
                <button
                  className="text-[17px] md:text-xl tracking-[-0.75px] leading-[79%] text-light px-5 lg:px-[37px] py-[15px] bg-dark rounded-[7px]"
                  style={{
                    boxShadow: ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                  }}
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
}
