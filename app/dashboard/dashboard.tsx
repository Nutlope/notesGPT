'use client';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { timestampToDate } from '@/convex/utils';
import { usePreloadedQueryWithAuth } from '@/lib/hooks';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { Preloaded, useAction, useMutation } from 'convex/react';
import { FunctionReturnType } from 'convex/server';
import Link from 'next/link';

import { useState } from 'react';



export default function DashboardHomePage({
  preloadedNotes,
}: {
  preloadedNotes: Preloaded<typeof api.notes.getNotes>;
}) {
  const allNotes = usePreloadedQueryWithAuth(preloadedNotes);

  const [searchQuery, setSearchQuery] = useState('');
  const [relevantNotes, setRelevantNotes] =
    useState<FunctionReturnType<typeof api.notes.getNotes>>();
  const mutateNoteRemove = useMutation(api.notes.removeNote);

  const performMyAction = useAction(api.together.similarNotes);

  // const handleSearch = async (e: any) => {
  //   e.preventDefault();

  //   console.log({ searchQuery });
  //   if (searchQuery === '') {
  //     setRelevantNotes(undefined);
  //   } else {
  //     const scores = await performMyAction({ searchQuery: searchQuery });
  //     const scoreMap: Map<string, number> = new Map();
  //     for (const s of scores) {
  //       scoreMap.set(s.id, s.score);
  //     }
  //     const filteredResults = allNotes.filter(
  //       (note) => (scoreMap.get(note._id) ?? 0) > 0.6,
  //     );
  //     setRelevantNotes(filteredResults);
  //   }
  // };

  const finalNotes = relevantNotes ?? allNotes;
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }


  const actions = [
    {
      title: 'remove',
      onClick: (id: Id<"notes">)=>{
        mutateNoteRemove({id})
      }
    }
  ]

  const actionItems = ({item, note}: {item: {title: string; onClick: (id: Id<"notes">)=>void}, note:{_id: any}}) => {
    return <MenuItem>
    {({ focus }) => (
      <a
        href="#"
        className={classNames(
          focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
          'block px-4 py-2 text-sm',
        )}
        onClick={()=>{
          item.onClick(note._id)
        }}
      >
        {item.title}
      </a>
    )}
  </MenuItem>
  }

  const renderList = () => {
    return allNotes.map((note) => (
        <ul role="list" key={note._id} >
          <li key={note._id} className="flex justify-between flex-row gap-x-6 py-5 border px-8" >
            <Link href={`/recording/${note._id}`} className="flex basis-1/2 min-w-0 gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
              <div className="min-w-0 self-center flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{note.title}</p>
              </div>
            </Link>
            {note._creationTime && (
              <div className="min-w-0 self-center flex-end">
                  <p className="text-sm mx-50 font-semibold leading-6 text-gray-900">{timestampToDate(note._creationTime)}</p>
              </div>
            )}
              <Menu as="div" className="relative inline-block text-left  self-center flex-end">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Options
                  </MenuButton>
                </div>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {actions.map((item)=>actionItems({item, note}))}
                    </div>
                  </MenuItems>
                </Transition>
            </Menu> 
          </li>
        </ul>
  ))}
  return (
    <>
      <div className="min-h-full">
        <div className="py-10">
          <main>
            <div className="flex w-full mx-auto max-w-7xl px-4 flex-row justify-between sm:px-6">
            <h1 className="text-base font-semibold leading-7 text-gray-900 mb-5">Your voice notes</h1>

            </div>
            <div className="flex w-full mx-auto max-w-7xl px-4 flex-row justify-between sm:px-6">
              <button
                type="button"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Search
              </button>
              <Link
                type="button"
                className="flex-end rounded-md bg-indigo-600 px-3.5 py-2.5 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                href="/record"
              >
                Record note
              </Link>
            </div>
            <div className="mx-auto max-w-7xl sm:px-6 my-8">
              {allNotes.length ? renderList() : <h2>no recordings</h2>}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
