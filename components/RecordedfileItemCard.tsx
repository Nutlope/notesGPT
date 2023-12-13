import Image from 'next/image';
import React from 'react';

const RecordedfileItemCard = () => {
  return (
    <div className="w-full px-[23px] py-[17px] flex items-center justify-between bg-white border-[0.5px] border-[#00000050]">
      <div className="w-fit flex items-center gap-[23px]">
        {/* file logo */}
        <div className="p-2.5 rounded-[50%] bg-dark md:flex items-center justify-center hidden ">
          <Image
            src="/icons/file_symbol.svg"
            width={20}
            height={20}
            alt="file"
            className="w-5 h-5 md:w-[20px] md:h-[20px]"
          />
        </div>
        <h1
          className="text-[17px] md:text-xl lg:text-2xl text-dark font-light"
          style={{
            lineHeight: '114.3%',
            letterSpacing: '-0.6px',
          }}
        >
          AI Generated Name
        </h1>
      </div>
      <div className="w-fit flex items-center gap-x-[40px] 2xl:gap-x-[56px]">
        <h3 className="font-[200] text-xl leading-[114.3%] tracking-[-0.5px] hidden md:inline-block">
          11/24/2023
        </h3>
        <h3 className="font-[200] text-xl leading-[114.3%] tracking-[-0.5px] hidden md:inline-block">
          4 tasks
        </h3>
        <div className="w-fit flex items-center gap-5">
          <button className="p-2 bg-transparent flex items-center justify-center h-fit w-fit md:inline-block">
            <Image
              src={'/icons/delete.svg'}
              alt="delete"
              width={20}
              height={20}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordedfileItemCard;
