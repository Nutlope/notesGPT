import Link from 'next/link';
import { UserNav } from './UserNav';
import { currentUser } from '@clerk/nextjs';

export default async function Header() {
  const user = await currentUser();
  return (
    <div className="container relative m-0 mx-auto py-10 md:px-10">
      <div className="max-width flex items-center justify-between">
        {/* logo */}
        <Link className="flex w-fit items-center gap-[2px]" href="/dashboard">
          <img
            src="/logo.svg"
            width={50}
            height={50}
            alt="logo"
            className="h-5 w-5 md:h-8 md:w-8"
          />
          <h1 className="text-xl font-medium text-[#25292F] md:text-3xl">
            NotesGPT
          </h1>
        </Link>
        {/* buttons */}
        <div className="flex w-fit items-center gap-[22px]">
          {user ? (
            <>
              <Link
                href={'/dashboard'}
                className="hidden cursor-pointer text-lg text-dark md:inline-block lg:text-xl"
              >
                Recordings
              </Link>
              <Link
                href={'/dashboard/action-items'}
                className="hidden cursor-pointer text-lg text-dark md:inline-block lg:text-xl"
              >
                Action Items
              </Link>
              <UserNav
                image={user.imageUrl}
                name={user.firstName + ' ' + user.lastName}
                email={
                  user.emailAddresses.find(
                    ({ id }) => id === user.primaryEmailAddressId,
                  )!.emailAddress
                }
              />
            </>
          ) : (
            <Link href="/dashboard">
              <button className="text-md primary-gradient primary-shadow rounded-lg px-5 py-1 text-center text-light md:px-10 md:py-2 md:text-xl">
                Sign in
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
