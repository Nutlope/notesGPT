"use client";

import Image from "next/image";
import { useState } from "react";
import MenuItems from "./MenuItems";
import Logo from "./Logo";
import { useUser } from "@clerk/clerk-react";
import { UserNav } from "@/components/ui/UserNav";

const DashboardNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { user } = useUser();

  return (
    <div
      className="relative m-0 w-full border-b-[1px] border-[#BCBCBC] py-4"
      style={{ boxShadow: "boxShadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }}
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
              ? "fixed left-0 top-0 z-[998] h-screen w-screen bg-black bg-opacity-50 lg:hidden"
              : "hidden"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        <Logo />
        <div className="flex space-x-8">
          <MenuItems isMenuOpen={isMenuOpen} />
          <UserNav
            image={user?.imageUrl!}
            name={user?.fullName!}
            email={user?.primaryEmailAddress?.emailAddress!}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
