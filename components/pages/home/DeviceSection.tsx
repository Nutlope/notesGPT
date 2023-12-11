import Image from 'next/image';
import React from 'react';

const DeviceSection = () => {
  return (
    <div className="py-[50px] md:pt-[100px] lg:pt-[144px] md:pb-[76px] max-width">
      <div className="flex w-full items-center">
        <Image
          src="/images/mobile.png"
          width={500}
          height={600}
          alt="mobile"
          className="w-full max-w-[129px] md:max-w-[250px] lg:max-w-[350px] xl:max-w-[400px] 2xl:max-w-[400px] z-10 mx-auto"
        />
        <div className="hidden lg:inline-block grow w-auto h-[70%] z-[1] -ml-[8.8%] relative">
          <Image
            src="/images/laptop_screenshot.png"
            width={800}
            height={500}
            alt="laptop"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default DeviceSection;
