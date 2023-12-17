import Link from "next/link";

interface MenuItemsProps {
  isMenuOpen: boolean;
}

const MenuItems = ({ isMenuOpen }: MenuItemsProps) => {
  return (
    <div
      className={`flex md:gap-5 lg:flex-row lg:items-center lg:gap-8 ${
        isMenuOpen
          ? "fixed left-0 top-0 z-[999] h-screen w-[260px] flex-col gap-y-5  border-r bg-light px-7 py-10 lg:relative lg:h-auto lg:w-auto lg:border-none lg:bg-transparent"
          : "hidden lg:flex"
      }`}
    >
      <Link
        href={"/dashboard"}
        className="cursor-pointer text-lg text-dark lg:text-xl"
      >
        Recordings
      </Link>
      <Link
        href={"/dashboard/action-items"}
        className="cursor-pointer text-lg text-dark lg:text-xl"
      >
        Action Items
      </Link>
    </div>
  );
};

export default MenuItems;
