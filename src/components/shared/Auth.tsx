/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import ModalOverlay from "../ui/ModalOverlay";
import Image from "next/image";
import PhoneInput from "../ui/PhoneInput";
import { X } from "lucide-react";
import Register from "./Register";
import LogIn from "./LogIn";
import axiosInstance from "@/axios";
import { toPlainNumber } from "@/utils";

interface Props {
  isAuthModal: boolean;
  toggleAuthModal: (entity: boolean) => void;
}

export default function Auth({ isAuthModal, toggleAuthModal }: Props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, SetStep] = useState(1);

  const sendCode = async () => {
    console.log(toPlainNumber(phoneNumber));

    const formData = new FormData();
    formData.append("phone", toPlainNumber(phoneNumber));

    try {
      const res = await axiosInstance.post<{ isRegistered: boolean }>(
        "/send-code/",
        formData
      );
      const { isRegistered } = res.data;
      if (!isRegistered) {
        SetStep(2);
      } else {
        SetStep(3);
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ModalOverlay
      className="max-w-[29rem] w-full relative"
      toggler={toggleAuthModal}
    >
      <X
        onClick={() => toggleAuthModal(false)}
        className="absolute -right-10 text-white -top-[50px] cursor-pointer"
        size={30}
      />
      <div className="flex flex-col justify-center items-center gap-12 w-full ">
        <Image src={"/logo-red.svg"} width={144} height={35} alt="Logo" />
        {step == 1 && (
          <div className="w-full flex flex-col gap-7">
            <PhoneInput
              className=""
              getter={phoneNumber}
              setter={setPhoneNumber}
              placeHolder="Введите номер телефона"
            />
            <button
              onClick={sendCode}
              className="text-lg w-full bg-primary py-4 text-white cursor-pointer"
            >
              далее
            </button>
          </div>
        )}
        {step == 2 && (
          <Register toggleAuthModal={toggleAuthModal} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
        )}
        {step == 3 && (
          <LogIn  toggleAuthModal={toggleAuthModal} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
        )}
      </div>
    </ModalOverlay>
  );
}
