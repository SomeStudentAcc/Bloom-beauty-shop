"use client";
import axiosInstance from "@/axios";
import { IActiveOrder, IUser } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function OrderConfirmed() {
  const params = useParams();
  const id = params?.id as string;
  const [lastOrder, setLastOrder] = useState<IActiveOrder>();
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const bUser = localStorage.getItem("b_user");
    if (bUser) {
      setUser(JSON.parse(bUser));
      console.log(JSON.parse(bUser));
    }
  }, []);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axiosInstance.get("/get-orders", {
          params: {
            id: user?.id,
          },
        });
        console.log(res.data);
        const { data }: { data: { activeOrders: IActiveOrder[] } } = res;
        const { activeOrders } = data;
        const filtered = activeOrders.find(
          (order) => order.id.toString() == id.toString()
        );
        setLastOrder(filtered);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, [id, user?.id]);
  return (
    <div className="py-[80px] container mx-auto px-5 md:px-0 mb-12 lg:mb-20 flex justify-center items-center h-full">
      <div className="border-[#D1D1D1] border py-12 max-w-[44rem] w-full flex justify-center items-center">
        <div className="max-w-[400px] w-full">
          <div className="flex justify-center mb-10">
            {" "}
            <Image src={"/logo-red.svg"} height={35} width={144} alt="" />
          </div>
          <div className="flex flex-col gap-4 mb-5">
            <h3 className="text-center font-semibold text-xl">
              Ваш заказ успешно принят!
            </h3>
            <p className="text-center">
              Оператор свяжется с Вами в ближайшее время и проконсультирует о
              дальнейших действиях.
            </p>
          </div>
          <div className="mb-5 flex flex-col gap-2">
            <p className="text-center">Номер заказа</p>
            <p className="text-center font-semibold ">{lastOrder?.id}</p>
          </div>
          <div className="flex sm:flex-row flex-col gap-5 w-full">
            <a
              href={lastOrder?.paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full cursor-pointer"
            >
              <button className="py-4 w-full border-[#D1D1D1] border flex justify-center gap-3">
                <p>к оплате</p>
                <Image
                  src="/right-arrow-black.svg"
                  height={24}
                  width={24}
                  alt=""
                />
              </button>
            </a>

            <Link className="w-full" href={"/"}>
              <button
                className={`py-4 w-full border-[#D1D1D1] border flex justify-center gap-3 `}
              >
                <p>на главную</p>
                <Image
                  src={"/right-arrow-black.svg"}
                  height={24}
                  width={24}
                  alt=""
                />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
