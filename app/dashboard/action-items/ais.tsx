'use client';

import { api } from '@/convex/_generated/api';
import { usePreloadedQueryWithAuth } from '@/lib/hooks';
import { Preloaded, useMutation } from 'convex/react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ActionItemsPage({
  preloadedItems,
}: {
  preloadedItems: Preloaded<typeof api.notes.getActionItems>;
}) {
  const actionItems = usePreloadedQueryWithAuth(preloadedItems);
  const mutateActionItems = useMutation(api.notes.removeActionItem);

  function removeActionItem(actionId: any) {
    // Trigger a mutation to remove the item from the list
    mutateActionItems({ id: actionId });
  }

  return (
    <div className="min-h-[100vh]">
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
                <div className="flex justify-between gap-3 md:mt-2">
                  <p className="ml-9 text-[15px] font-[300] leading-[249%] tracking-[-0.6px] text-dark opacity-60 md:inline-block md:text-xl lg:text-xl">
                    {new Date(item?._creationTime).toLocaleDateString()}
                  </p>
                  <p className="truncate text-[15px] font-[300] leading-[249%] tracking-[-0.6px] text-dark opacity-60 md:inline-block md:text-xl lg:text-xl">
                    From: {item?.title}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {actionItems?.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-7">
              <p className="text-center text-2xl text-dark">
                You currently have no action items.
              </p>
              <Link
                className="rounded-[7px] bg-dark px-[37px] py-[15px] text-[17px] leading-[79%] tracking-[-0.75px] text-light md:text-2xl"
                style={{ boxShadow: ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
                href="/record"
              >
                Record your first voice note
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
