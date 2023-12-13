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
      <div className="hidden md:flex items-center justify-center flex-col">
        <h1
          className="text-xl md:text-[35px] lg:text-[43px] font-medium text-dark text-center mt-[21px]"
          style={{
            lineHeight: '114.3%',
            letterSpacing: '-1.075px',
          }}
        >
          Action Items
        </h1>
        <h3 className="mt-3 text-gray-600 text-xl">
          {actionItems?.length} tasks
        </h3>
      </div>

      <div className="w-full max-w-[900px] px-5 mx-auto mt-[27px] md:mt-[45px]">
        {actionItems?.map((item, idx) => (
          <div className="md:border-t-[1px] border-[#00000033] py-2" key={idx}>
            <div className="w-full flex justify-center">
              <label
                className={`group text-[17px] md:text-xl lg:text-2xl text-dark font-[300] w-full cursor-pointer select-none items-center rounded p-2 text-sm transition-colors duration-300 checked:text-gray-300 hover:bg-gray-200`}
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
                  <p className="ml-9 opacity-60 text-dark font-[300] hidden md:inline-block text-[17px] md:text-xl lg:text-xl tracking-[-0.6px] leading-[249%]">
                    {new Date(item?._creationTime).toDateString()}
                  </p>
                  <p className="opacity-60 text-dark font-[300] hidden md:inline-block text-[15px] md:text-xl lg:text-xl tracking-[-0.6px] leading-[249%]">
                    From: {item?.title}
                  </p>
                </div>
              </label>
            </div>
          </div>
        ))}
      </div>
      <div className="md:hidden w-full flex items-center justify-center">
        <button className="mt-[55px]">
          <img
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
