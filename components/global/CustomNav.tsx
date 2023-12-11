import Image from 'next/image';
import React from 'react';
import Logo from './dashboardNav/Logo';
import Profile from './dashboardNav/Profile';
import Link from 'next/link';

interface CustomNavProps {
    title: string
}

const CustomNav = ({ title }: CustomNavProps) => {
    return (
        <div className='py-[12px] w-full bg-light md:bg-transparent border-b-[#BCBCBC]   custom-nav-shadow'>
            <div className="max-width flex items-center justify-between">
                <Link href='/dashboard'>
                    <div className="w-fit flex gap-[11px] items-center">
                        <button><Image src='/icons/back_btn.svg' width={9} height={17} alt='back' className='rounded-[50%] cursor-pointer' /></button>
                        <p className='text-[21px] tracking-[-0.525px] leading-[114.3%] hidden md:inline-block'>Back to Dashboard</p>
                    </div>
                </Link>
                <div className="hidden md:inline-block">
                    <Logo />
                </div>
                <div className="md:hidden text-xl tracking-[-0.5px] leading-[114.3%] text-center">
                    {title === "Quick Check-in" && <p className='text-sm opacity-80'>12/08/2023</p>}
                    {title}
                </div>
                <div className="">
                    <Profile />
                </div>
            </div>
        </div>
    );
};

export default CustomNav;