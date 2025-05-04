import Image from "next/image";
import React from "react";
import CheckoutType from "./CheckoutType";
import CheckoutCart from "./CheckoutCart";
import { IGetData } from "@/types";
import axiosInstance from "@/axios";

export default async function Checkout() {
    const res = await axiosInstance.get("/get-data/");
    const getData: IGetData = res.data;
  return (
    <div className="container mx-auto px-5 md:px-0 mb-12 lg:mb-20 py-10 relative">
      <div className="flex items-center gap-4 mb-10">
        <button className="w-[40px] h-[40px] flex justify-center items-center border">
          <Image
            className="transform-[scaleX(-1)]"
            src={"/right-arrow-black.svg"}
            height={24}
            width={24}
            alt=""
          />
        </button>
        <p>назад</p>
      </div>
      <div className="flex flex-col md:flex-row gap-5 md:justify-between">
        <div className="md:max-w-[30rem] lg:max-w-[44rem] w-full">
          <CheckoutType getData={getData} />
        </div>
        <div className="md:max-w-[28.5rem]  w-full">
          <CheckoutCart />
        </div>
      </div>
    </div>
  );
}
