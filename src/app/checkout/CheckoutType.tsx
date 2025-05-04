"use client";
import React, { useState } from "react";
import CheckoutDelivery from "./CheckoutDelivery";
import { IGetData } from "@/types";

interface Props{
    getData: IGetData
}

export default function CheckoutType({getData}:Props) {
  const [isPickUp, setIsPickUp] = useState(false);

  return (
    <>
      <h2 className="mb-12 text-xl lg:text-3xl">Оформление заказа</h2>
      <div className="flex gap-5  tetx-lg mb-12">
        <button
          onClick={() => setIsPickUp(false)}
          className={`py-4 w-full ${
            !isPickUp ?  "border-[3px]" : "border-[#D1D1D1]"
          } border`}
        >
          доставка
        </button>
        <button
          onClick={() => setIsPickUp(true)}
          className={`py-4  w-full ${
            isPickUp ? "border-[3px]" : "border-[#D1D1D1]"
          } border`}
        >
          самовывоз
        </button>
      </div>
      <CheckoutDelivery getData={getData} isPickUp={isPickUp} />
    </>
  );
}
