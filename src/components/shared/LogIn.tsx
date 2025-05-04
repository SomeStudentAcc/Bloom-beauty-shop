import React, { useState } from "react";
import PhoneInput from "../ui/PhoneInput";
import MyInput from "../ui/MyInput";
import { toPlainNumber } from "@/utils";
import axiosInstance from "@/axios";

interface Props {
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  toggleAuthModal: (entity: boolean) => void;

}

export default function LogIn({ phoneNumber, setPhoneNumber, toggleAuthModal }: Props) {
  const [code, setCode] = useState("");

  const logIn = async () => {
    const formData = new FormData();
    formData.append("phone", toPlainNumber(phoneNumber));
    formData.append("code", code);

    try {
      const res = await axiosInstance.post("/auth/", formData);
      if (res.data && res.data.data) {
        localStorage.setItem("b_user", JSON.stringify(res.data.data));
        toggleAuthModal(false)
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex flex-col gap-7">
      <PhoneInput
        className=""
        getter={phoneNumber}
        setter={setPhoneNumber}
        placeHolder="Введите номер телефона"
      />
      <MyInput
        className=""
        getter={code}
        setter={setCode}
        placeHolder="Введите код"
      />
      <button
        onClick={logIn}
        className="text-lg w-full bg-primary py-4 text-white cursor-pointer"
      >
        далее
      </button>
    </div>
  );
}
