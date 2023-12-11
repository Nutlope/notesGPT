import Image from 'next/image';
import React from 'react';

const Logo = () => {
    return (
        <div className="flex items-center gap-[2px] w-fit">
            <Image src='/logo.svg' width={50} height={50} alt='logo' className='w-[21px] h-[21px] md:w-[30px] md:h-[30px]' />
            <h1 className='text-[#25292F] text-xl md:text-[26px] lg:text-[33px] font-medium'>NotesGPT</h1>
        </div>
    );
};

export default Logo;