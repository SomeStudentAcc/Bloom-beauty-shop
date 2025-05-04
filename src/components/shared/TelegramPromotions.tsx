import Image from "next/image";
import React from "react";

export default function TelegramPromotions() {
  return (
    <>
      <div className="container mx-auto px-5 md:px-0 mb-12 lg:mb-20 hidden lg:block">
        <div className="flex flex-col lg:flex-row bg-[#F3F3F3]">
          {/* Left Side */}
          <div className="flex flex-col items-center justify-center py-8 flex-1">
            <p className="text-lg mb-8">Подпишись на телеграм рассылку</p>
            <button className="bg-primary max-w-85 w-full py-3 flex justify-center gap-2.5 mb-5">
              <p className="text-lg text-white">перейти в канал</p>
              <Image src="/telegram-white.svg" width={24} height={24} alt="" />
            </button>
            <p className="max-w-65 w-full text-center">
              Узнай первым о старте скидок и специальных предложений!
            </p>
          </div>

          <div className="relative max-w-[42rem] w-full h-[auto] aspect-[16/9]">
            <Image
              src="/tgBanner.svg"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="lg:hidden mb-20">
        <div className="flex flex-col lg:flex-row ">
          {/* Left Side */}
          <div className="flex flex-col items-center justify-center pt-8 pb-16 bg-[#F3F3F3]">
            <p className="text-lg mb-8">Подпишись на телеграм рассылку</p>
            <button className="bg-primary max-w-85 w-full py-3 flex justify-center gap-2.5 mb-5">
              <p className="text-lg text-white">перейти в канал</p>
              <Image src="/telegram-white.svg" width={24} height={24} alt="" />
            </button>
            <p className="max-w-65 w-full text-center">
              Узнай первым о старте скидок и специальных предложений!
            </p>
          </div>

          <div className="container mx-auto px-5 md:px-0  w-full min-h-[120px] -mt-[3rem]">
            <Image
              src="/tgBanner.svg"
              alt=""
              height={2000}
              width={2000}
              className="object-contain w-full h-full"
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
}
