import React, { useState } from "react";
import MyInput from "../ui/MyInput";
import PhoneInput from "../ui/PhoneInput";
import { toPlainNumber } from "@/utils";
import axiosInstance from "@/axios";

interface Props {
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  toggleAuthModal: (entity: boolean) => void;

}



export default function Register({ phoneNumber, setPhoneNumber, toggleAuthModal }: Props) {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [code, setCode] = useState("");

  const register = async () => {
    const formData = new FormData();
    formData.append("phone", toPlainNumber(phoneNumber));
    formData.append("name", name);
    formData.append("birthdate", birthDate);
    formData.append("code", code);

    try {
      const res = await axiosInstance.post("/register/", formData);
      console.log(res.data);
      if (res.data && res.data.data) {
        localStorage.setItem("b_user", JSON.stringify(res.data.data));
        toggleAuthModal(false)
      }
      
    } catch (error) {
        console.log(error);
        
    }
  };
  return (
    <div className="w-full flex flex-col gap-7">
      <MyInput
        className=""
        getter={name}
        setter={setName}
        placeHolder="Ваше имя"
      />
      <MyInput
        className=""
        getter={birthDate}
        setter={setBirthDate}
        placeHolder="Дата рождения"
      />
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
      <button onClick={register} className="text-lg w-full bg-primary py-4 text-white cursor-pointer">
        зарегистрироваться
      </button>
    </div>
  );
}
