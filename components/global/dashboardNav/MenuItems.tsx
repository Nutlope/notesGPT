import Link from 'next/link';
import React from 'react';

interface MenuItemsProps {
    isMenuOpen: boolean;
}

const MenuItems = ({ isMenuOpen }: MenuItemsProps) => {
    return (
        <div className={`flex lg:flex-row lg:items-center md:gap-5 lg:gap-8 xl:gap-[61px] ${isMenuOpen ? "fixed lg:relative h-screen lg:h-auto w-[260px] lg:w-auto left-0 top-0  border-r lg:border-none z-[999] flex-col px-7 py-10 gap-y-5 bg-light lg:bg-transparent" : "hidden lg:flex"}`}>
            <Link href={"/"} className='text-lg lg:text-xl text-dark cursor-pointer'>Home</Link>
            <Link href={"/dashboard"} className='text-lg lg:text-xl text-dark cursor-pointer'>Recordings</Link>
            <Link href={"/dashboard/action-items"} className='text-lg lg:text-xl text-dark cursor-pointer'>Action Items</Link>
        </div>
    );
};

export default MenuItems;