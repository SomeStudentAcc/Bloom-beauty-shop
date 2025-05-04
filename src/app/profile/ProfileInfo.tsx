"use client";
import { IUser } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function ProfileInfo() {
  const [user, setUser] = useState<IUser>();
  useEffect(() => {
    const bUser = localStorage.getItem("b_user");
    if (bUser) {
      setUser(JSON.parse(bUser));
      console.log(JSON.parse(bUser));
    }
  }, []);



  return (
    <div className="flex flex-col gap-7.5 lg:max-w-[340px] w-full ">
      <div className="bg-primary py-10 w-full flex flex-col gap-10 justify-center items-center">
        <Image src={"/logoWhite.svg"} height={35} width={144} alt="" />
        <h3 className="text-white text-lg font-semibold">{user?.name}</h3>
      </div>
      <div className="border-[#F3F3F3] border py-10 text-center">
        <h3>Личные данные</h3>
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-primary">дата рождения:</p>
            <p>{user?.birthdate}</p>
          </div>
          <div>
            <p className="text-primary">Номер телефона:</p>
            <p>{user?.phone}</p>
          </div>{" "}
          <div>
            <p className="text-primary">Дата регистрации:</p>
            <p>{user?.date}</p>
          </div>
          <p>Выйти</p>
        </div>
      </div>
      <div className="border-[#F3F3F3] border py-10 text-center">
        <h3>накопительная</h3>
        <p>ваш баланс: 100 000 сум</p>
      </div>
    </div>
  );
}
