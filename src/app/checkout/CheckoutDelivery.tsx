import MyInput from "@/components/ui/MyInput";
import { IBranches, IGetData, IUser } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CheckoutMap from "./CheckoutMap";
import DeliveryInfo from "./DeliveryInfo";
import { useCheckoutStore } from "@/stores/checkoutStore";
import axiosInstance from "@/axios";
import ModalOverlay from "@/components/ui/ModalOverlay";
import { useCartStore } from "@/stores/cartStore";
import CheckoutRegions from "./CheckoutRegions";
import { useRouter } from "next/navigation";

interface Props {
  getData: IGetData;
  isPickUp: boolean;
}

interface IPayment {
  id: string;
  name_ru: string;
}

const payments = [
  {
    id: "CASH",
    name_ru: "наличные",
  },
  {
    id: "PAYME",
    name_ru: "Payme",
  },
  {
    id: "CLICK",
    name_ru: "Click",
  },
];

export default function CheckoutDelivery({ getData, isPickUp }: Props) {
  const { cart } = useCartStore();
  const router = useRouter()

  const [user, setUser] = useState<IUser>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { selectedRegion, isExpress, setIsExpress } = useCheckoutStore();
  const [adress, setAdress] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<IBranches>();
  const [selectedPayment, setSelectedPayment] = useState<IPayment>();
  const [point, setPoint] = useState("");
  const [isRegion, setIsRegion] = useState(false);
  const [isDistrict, setIsDistrict] = useState(false);
  const [isMobMap, setIsMobMap] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [comment, setComment] = useState("");
  const [submitErr, setSubmitErr] = useState(false);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  useEffect(() => {
    const getDate = async () => {
      const res = await axiosInstance.get("/get-delivery-date/");
      setDeliveryDate(res.data.delivery_date);
    };
    getDate();
    const bUser = localStorage.getItem("b_user");
    if (bUser) {
      setUser(JSON.parse(bUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone);
    }
  }, [user]);

  const handleSubmit = async () => {
    if (!isPickUp) {
      if (!selectedRegion || !adress || !selectedPayment) {
        setSubmitErr(true);
        return;
      }
    } else {
      if (!selectedBranch || !selectedPayment) {
        setSubmitErr(true);
        return;
      }
    }

    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("id", user!.id.toString());
    formData.append("name", name);
    formData.append("system", "Web");
    if (isPickUp) {
      formData.append("branchId", selectedBranch?.id?.toString() || "");
    }
    formData.append("payment", selectedPayment.id || "");
    formData.append("address", adress || "");
    formData.append("point", point || "");
    formData.append("comment", comment || "");
    formData.append("isDelivery", isPickUp ? "0" : "1");
    formData.append("longitude", longitude);
    formData.append("latitude", latitude);
    formData.append("items", JSON.stringify(cart));

    try {
      const res = await axiosInstance.post("/create-order/", formData);
      console.log(res.data);
      router.push(`/orderConfirmed/${res.data.id}`)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-5 w-full mb-10">
        <div className="flex flex-col w-full gap-2">
          <p className="font-medium">ФИО</p>
          <MyInput setter={setName} getter={name} placeHolder="Ваше имя" />
        </div>
        <div className="flex flex-col w-full gap-2">
          <p className="font-medium">Номер</p>
          <MyInput setter={setPhone} getter={phone} placeHolder="Ваш номер" />
        </div>
      </div>
      {isPickUp && (
        <div className="mb-12">
          {getData.branches.map((branch) => (
            <div
              key={branch.id}
              onClick={() => setSelectedBranch(branch)}
              className="flex gap-4 items-center cursor-pointer"
            >
              {selectedBranch?.id === branch.id ? (
                <div className="w-4 h-4 border flex justify-center items-center">
                  <Image src="/tickImg.svg" width={9} height={9} alt="" />
                </div>
              ) : (
                <div className="w-4 h-4 border"></div>
              )}
              <p>{branch.name_ru}</p>
            </div>
          ))}
          {!selectedBranch ? (
            <p className="text-red-600">Выберите Филиал</p>
          ) : undefined}
        </div>
      )}
      {!isPickUp && (
        <>
          <CheckoutRegions
            getData={getData}
            isRegion={isRegion}
            setIsRegion={setIsRegion}
            isDistrict={isDistrict}
            setIsDistrict={setIsDistrict}
          />
          <div className="mb-10">
            <p>
              <span className="text-primary">*</span> Найдите место на карте и
              кликайте на него!
            </p>
            <div className=" hidden md:block">
              <CheckoutMap
                setLongitude={setLongitude}
                setLatitude={setLatitude}
                setAdress={setAdress}
              />
            </div>

            <button
              onClick={() => setIsMobMap(true)}
              className={`py-4  w-full bg-primary text-white`}
            >
              Выберите адресс
            </button>

            {isMobMap && (
              <ModalOverlay
                className="max-w-[90%] w-full relative"
                toggler={setIsMobMap}
              >
                <CheckoutMap
                  setLongitude={setLongitude}
                  setLatitude={setLatitude}
                  setAdress={setAdress}
                />
                <div className="flex flex-col w-full gap-2 my-5">
                  <p className="font-medium">Адрес</p>
                  <MyInput
                    setter={setAdress}
                    getter={adress}
                    placeHolder="Введите адрес доставки"
                  />
                  {!adress ? (
                    <p className="text-red-600">Выберите адресс на карте</p>
                  ) : undefined}
                </div>
                <button
                  onClick={() => setIsMobMap(false)}
                  className={`py-4  w-full bg-primary text-white`}
                >
                  Подтвердить
                </button>
              </ModalOverlay>
            )}
          </div>
          <div className="mb-10">
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-col w-full gap-2">
                <p className="font-medium">Адрес</p>
                <MyInput
                  setter={setAdress}
                  getter={adress}
                  placeHolder="Введите адрес доставки"
                />
                {!adress ? (
                  <p className="text-red-600">Выберите адресс на карте</p>
                ) : undefined}
              </div>
              <div className="flex flex-col w-full gap-2">
                <p className="font-medium">Ориентир</p>
                <MyInput
                  setter={setPoint}
                  getter={point}
                  placeHolder="Введите ориентир"
                />
              </div>
            </div>
          </div>
          <DeliveryInfo />
        </>
      )}
      <div className="flex gap-5  tetx-lg mb-12">
        <button
          onClick={() => setIsExpress(0)}
          className={`py-4 w-full ${
            isExpress == 0 ? "border-[3px]" : "border-[#D1D1D1]"
          } border`}
        >
          обычная доставка
        </button>
        <button
          onClick={() => setIsExpress(1)}
          className={`py-4  w-full ${
            isExpress == 1 ? "border-[3px]" : "border-[#D1D1D1]"
          } border`}
        >
          экспресс доставка
        </button>
      </div>
      <div className="mb-12">
        <p>Ваш заказ будет готов к: {deliveryDate}</p>
        {isExpress == 1 && (
          <p className="text-primary">
            Экспресс-доставка принимается с 10:00 до 19:00
          </p>
        )}
      </div>
      <div className="mb-12 flex flex-col gap-2">
        <p className="font-medium">Выберите способ оплаты</p>
        <div className="flex gap-5">
          {payments.map((payment: IPayment) => (
            <div
              onClick={() => setSelectedPayment(payment)}
              className="flex gap-4 items-center cursor-pointer"
              key={payment.id}
            >
              {selectedPayment?.id == payment.id ? (
                <div className="w-4 h-4 border flex justify-center items-center">
                  <Image src={"/tickImg.svg"} width={9} height={9} alt="" />
                </div>
              ) : (
                <div className="w-4 h-4 border"></div>
              )}
              <p>{payment.name_ru}</p>
            </div>
          ))}
        </div>
        {!selectedPayment ? (
          <p className="text-red-600">Выберите способ оплаты</p>
        ) : undefined}
      </div>
      <div className="flex flex-col gap-3 mb-12">
        <p className="font-medium">Комментарий</p>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Комментарий к заказу"
          className="pl-5 resize-none py-4 text-[#ACACAC] outline-none border-[#F3F3F3] border-[2px] min-h-[150] w-full"
        ></textarea>
      </div>
      {submitErr && (
        <p className="text-red-600">
          Пожалуеста заполните все необходимые поля
        </p>
      )}
      <div className="flex gap-5  tetx-lg mb-12">
        <button className={`py-4 w-full border-[#D1D1D1] border`}>
          вернуться в меню
        </button>
        <button
          onClick={handleSubmit}
          className={`py-4  w-full bg-primary text-white`}
        >
          оформить заказ
        </button>
      </div>
    </div>
  );
}
