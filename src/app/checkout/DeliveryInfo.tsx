import Image from "next/image";
import React, { useRef, useState } from "react";
import { useClickAway } from "react-use";

export default function DeliveryInfo() {
  const [isInfo, setIsInfo] = useState(false);

  const ref = useRef(null);

  useClickAway(
    ref,
    () => {
      setIsInfo(false);
    },
    ["click"]
  );
  return (
    <div className="relative mb-10">
      <div onClick={() => setIsInfo(true)} className="flex items-center gap-4 cursor-pointer">
        <Image src={"/deliveryInfo.svg"} width={28} height={28} alt="" />
        <p className="text-xl underline underline-offset-[5px]">о доставке</p>
      </div>

      {isInfo && (
        <div
          ref={ref}
          className="absolute top-[50px] bg-white max-w-[580px] w-full p-7.5 shadow-md"
        >
          <h4 className="mb-1">Выберите удобное время доставки:</h4>
          <div className="py-4 border-[#F3F3F3] border-b">
            <p>
              заказы на сумму 300 000 сум - доставка бесплатно Заказы до 300 000
              сум - доставка 30 000 сум в пределах в г.Ташкента
            </p>
          </div>
          <div className="py-4 border-[#F3F3F3] border-b">
            <p>
              экспресс доставка в течении 2-х часов с момента оформления и
              оплаты заказа - 40 000 сум - в пределах г.Ташкента
            </p>
          </div>
          <div className="py-4 ">
            <p>
              доставка по регионам - через курьерскую службу Fargo, согласно
              сроков и тарифов указанных на их сайте
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
