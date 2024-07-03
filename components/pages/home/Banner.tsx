import Link from 'next/link';

const Banner = () => {
  return (
    <div className="relative h-[350px] w-full px-4 md:h-[605px] md:px-6 lg:px-8 xl:px-10 2xl:px-0">
      <div className="flex h-full w-full flex-col items-center justify-center">

        <h1 className="inline-block text-center text-4xl font-medium tracking-tighter text-dark lg:text-7xl">
          Create content with <br className="hidden lg:inline-block" />
          your voice
        </h1>
        <p className="mt-8 text-center text-xl font-light tracking-tight lg:text-3xl">
          Convert your voice notes into{' '}
          <span className="font-bold">
            tweets, blog posts, summaries, loose notes <br className="hidden lg:inline-block" />
          </span>{' '}
          and <span className="font-bold">clear action items</span> using AI.
        </p>
        <Link
          href={'/dashboard'}
          className="primary-gradient primary-shadow mx-auto mt-16 flex max-w-xl items-center justify-center gap-5 rounded-full px-4 py-2 text-center text-sm text-light md:px-12 md:py-4 md:text-2xl"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};


export default Banner;


