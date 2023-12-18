'use client';

import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/clerk-react';
import { useMutation, useQuery } from 'convex/react';
import toast, { Toaster } from 'react-hot-toast';

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
    <div className="h-screen">
      <div className="flex-col items-center justify-center text-center md:flex">
        <div className="w-full pb-1 pt-4">
          <h1 className="text-center text-2xl font-medium text-dark md:text-4xl">
            Action Items
          </h1>
        </div>
        <h3 className="mt-3 text-gray-600 md:text-xl">
          {actionItems?.length ? actionItems?.length : 0} tasks
        </h3>
      </div>
      <div className="mx-auto mt-[27px] w-full max-w-[900px] px-5 md:mt-[45px]">
        {actionItems?.map((item, idx) => (
          <div
            className="border-[#00000033] py-1 md:border-t-[1px] md:py-2"
            key={idx}
          >
            <div className="flex w-full justify-center">
              <div className="group w-full items-center rounded p-2 text-lg font-[300] text-dark transition-colors duration-300 checked:text-gray-300 hover:bg-gray-100 md:text-2xl">
                <div className="flex items-center">
                  <input
                    onChange={(e) => {
                      if (e.target.checked) {
                        removeActionItem(item._id);
                        toast.success('1 task completed.');
                      }
                    }}
                    type="checkbox"
                    checked={false}
                    className="mr-4 h-5 w-5 cursor-pointer rounded-sm border-2 border-gray-300"
                  />
                  <label className="">{item?.task}</label>
                </div>
                <div className="flex justify-between md:mt-2">
                  <p className="ml-9 text-[15px] font-[300] leading-[249%] tracking-[-0.6px] text-dark opacity-60 md:inline-block md:text-xl lg:text-xl">
                    {new Date(item?._creationTime).toLocaleDateString()}
                  </p>
                  <p className=" text-[15px] font-[300] leading-[249%] tracking-[-0.6px] text-dark opacity-60 md:inline-block md:text-xl lg:text-xl">
                    From: {item?.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <Toaster position="bottom-left" reverseOrder={false} />
      </div>
    </div>
  );
};

export default ActionItemsPage;
