import { ABOUT_US, INFO } from "@/constants/footerLinks";
import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <>
      <div className="bg-[#F3F3F3]">
        <div className="container mx-auto px-5 md:px-0 py-12 flex gap-12 lg:gap-0 flex-col lg:flex-row lg:justify-between">
          <div>
            <Image
              className="mb-10"
              src={"/logo-red.svg"}
              width={220}
              height={53}
              alt=""
            />
            <p className="max-w-[340px] w-full">
              Мы вынуждены отталкиваться от того, что синтетическое тестирование
              представляет собой интересный эксперимент проверки вывода текущих
              активов.
            </p>
          </div>
          <div>
            <h4 className="text-xl mb-5">Информация</h4>
            <ul className="flex flex-col gap-2">
              {INFO.map((el, index) => (
                <li key={index}>{el.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl mb-5">О нас</h4>
            <ul className="flex flex-col gap-2">
              {ABOUT_US.map((el, index) => (
                <li key={index}>{el.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-5 text-xl">Мы в соц сетях</h4>
            <div className="flex gap-1">
              <Image src={"/facebook.svg"} width={48} height={48} alt="" />
              <Image src={"/telegram.svg"} width={48} height={48} alt="" />
              <Image src={"/insta.svg"} width={48} height={48} alt="" />
            </div>
            <hr className="my-4" />
            <div className="flex flex-row lg:flex-col gap-2">
              <Image src={"/app-store.svg"} width={135} height={40} alt="" />
              <Image src={"/play-market.svg"} width={135} height={40} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-primary">
        <div className="container mx-auto px-5 md:px-0 py-4 flex flex-col gap-5 lg:gap-0 items-center lg:items-start lg:flex-row lg:justify-between">
          <p className="text-white">2022 © Bloom.uz</p>
          <div className="flex gap-3 lg:gap-8">
          <Image src={"/payme.svg"} width={72} height={20} alt="" />
          <Image src={"/click-logo.svg"} width={72} height={26} alt="" />
          <Image src={"/visa.svg"} width={60} height={20} alt="" />
          <Image src={"/master.svg"} width={51} height={30} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
