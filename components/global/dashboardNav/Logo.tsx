import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link className="flex w-fit items-center gap-[2px]" href="/dashboard">
      <Image
        src="/logo.svg"
        width={50}
        height={50}
        alt="logo"
        className="h-[21px] w-[21px] md:h-[30px] md:w-[30px]"
      />
      <h1 className="text-xl font-medium text-[#25292F] md:text-[26px] lg:text-[33px]">
        NotesGPT
      </h1>
    </Link>
  );
};

export default Logo;
