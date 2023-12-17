'use client';

import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'convex/react';
import Image from 'next/image';

const ActionItemsPage = () => {
  const { user } = useUser();
  const id = user?.id;

  const mutateActionItems = useMutation(api.notes.removeActionItem);

  function removeActionItem(actionId: any) {
    // Trigger a mutation to remove the item from the list
    mutateActionItems({ id: actionId });
  }

  const actionItems = useQuery(api.notes.getActionItems, { userId: id });
  return (
    <div className="h-full min-h-[100vh] w-full bg-light md:bg-transparent">
      {/* search bar visible only mobile devices */}
      <div
        className="mx-auto mb-4 mt-4 flex h-fit w-[90%] items-center gap-[17px] rounded bg-white px-[11px] py-[10px] sm:px-[15px] md:mb-[42px] md:hidden md:w-[623px] md:px-[40px] md:py-[13px]"
        style={{ border: ' 1px solid rgba(0, 0, 0, 0.40)' }}
      >
        <Image
          src="/icons/search.svg"
          width={27}
          height={26}
          alt="search"
          className="h-5 w-5 md:h-[26px] md:w-[27px]"
        />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-transparent text-[17px] font-normal outline-none md:text-xl lg:text-2xl"
        />
      </div>
      <div className="hidden flex-col items-center justify-center md:flex">
        <h1
          className="mt-[21px] text-center text-xl font-medium text-dark md:text-[35px] lg:text-[43px]"
          style={{
            lineHeight: '114.3%',
            letterSpacing: '-1.075px',
          }}
        >
          Action Items
        </h1>
        <h3 className="mt-3 text-xl text-gray-600">
          {actionItems?.length ? actionItems?.length : 0} tasks
        </h3>
      </div>

      <div className="mx-auto mt-[27px] w-full max-w-[900px] px-5 md:mt-[45px]">
        {actionItems?.map((item, idx) => (
          <div className="border-[#00000033] py-2 md:border-t-[1px]" key={idx}>
            <div className="flex w-full justify-center">
              <label
                className={`group w-full cursor-pointer select-none items-center rounded p-2 text-[17px] text-sm font-[300] text-dark transition-colors duration-300 checked:text-gray-300 hover:bg-gray-200 md:text-xl lg:text-2xl`}
              >
                <div>
                  <input
                    onChange={() => removeActionItem(item._id)}
                    type="checkbox"
                    checked={false}
                    className="mr-4 h-5 w-5 rounded-sm border-2 border-gray-300 text-sky-600 transition-colors duration-300 focus:ring-0 focus:ring-offset-0 focus-visible:ring-2 focus-visible:ring-sky-600/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-100 group-active:border-sky-600 group-active:checked:text-sky-600/25"
                  />
                  {item?.task}
                </div>
                <div className="flex justify-between">
                  <p className="ml-9 hidden text-[17px] font-[300] leading-[249%] tracking-[-0.6px] text-dark opacity-60 md:inline-block md:text-xl lg:text-xl">
                    {new Date(item?._creationTime).toDateString()}
                  </p>
                  <p className="hidden text-[15px] font-[300] leading-[249%] tracking-[-0.6px] text-dark opacity-60 md:inline-block md:text-xl lg:text-xl">
                    From: {item?.title}
                  </p>
                </div>
              </label>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full items-center justify-center md:hidden">
        <button className="mt-[55px]">
          <img
            src={'/icons/mic_plus.svg'}
            alt="mic plus"
            width={88}
            height={88}
            className="h-[52px] w-[52px]"
          />
        </button>
      </div>
    </div>
  );
};

export default ActionItemsPage;
