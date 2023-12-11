'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import Profile from './Profile';
import MenuItems from './MenuItems';
import Logo from './Logo';

const DashboardNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <div
      className="w-full py-4 relative m-0 border-b-[1px] border-[#BCBCBC]"
      style={{ boxShadow: 'boxShadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
    >
      <div className="max-width flex items-center justify-between ">
        {/* menu icon for mobile devices */}
        <div className="lg:hidden" onClick={() => setIsMenuOpen(true)}>
          <Image src="/icons/menubar.svg" width={25} height={25} alt="menu" />
        </div>
        {/* backdrop for nav menu */}
        <div
          className={`${
            isMenuOpen
              ? 'fixed top-0 left-0 lg:hidden w-screen h-screen z-[998] bg-black bg-opacity-50'
              : 'hidden'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        <Logo />
        <div className="flex space-x-8">
          <MenuItems isMenuOpen={isMenuOpen} />
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
