import Image from 'next/image';

const DeviceSection = () => {
  return (
    <div className="max-width py-10">
      <div className="flex w-full items-center">
        <Image
          src="/images/mobile.png"
          width={500}
          height={600}
          alt="mobile"
          className="z-10 mx-auto w-full max-w-[400px]"
        />
        <div className="relative z-[1] -ml-[8.8%] hidden h-[70%] w-auto grow lg:inline-block">
          <Image
            src="/images/desktop-2.png"
            width={800}
            height={500}
            alt="laptop"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default DeviceSection;
