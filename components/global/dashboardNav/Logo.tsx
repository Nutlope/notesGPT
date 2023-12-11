import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link className="flex items-center gap-[2px] w-fit" href="/">
      <Image
        src="/logo.svg"
        width={50}
        height={50}
        alt="logo"
        className="w-[21px] h-[21px] md:w-[30px] md:h-[30px]"
      />
      <h1 className="text-[#25292F] text-xl md:text-[26px] lg:text-[33px] font-medium">
        NotesGPT
      </h1>
    </Link>
  );
};

export default Logo;
