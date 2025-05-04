import { useCheckoutStore } from "@/stores/checkoutStore";
import { IDistrict, IGetData, IRegion } from "@/types";
import Image from "next/image";
import React, { useRef } from "react";
import { useClickAway } from "react-use";

interface Props{
    getData: IGetData
    isRegion: boolean
    isDistrict: boolean
    setIsRegion: React.Dispatch<React.SetStateAction<boolean>>
    setIsDistrict: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CheckoutRegions({isRegion, isDistrict, setIsRegion, setIsDistrict, getData}:Props) {
  const {
    selectedRegion,
    setSelectedRegion,
    selectedDistrict,
    setSelectedDistrict,
  } = useCheckoutStore();

  const ref = useRef(null);
  const ref2 = useRef(null);

  useClickAway(
    ref,
    () => {
      setIsRegion(false);
    },
    ["click"]
  );
  useClickAway(
    ref2,
    () => {
      setIsDistrict(false);
    },
    ["click"]
  );

  return (
    <div className="flex gap-5 mb-10 w-full">
      <div className="flex flex-col gap-2 w-full">
        <p className="font-medium">Выберите регион</p>

        <div className="flex gap-5 w-full ">
          <div className="flex relative flex-col w-full gap-2">
            <div
              onClick={() => setIsRegion(true)}
              className="pl-5 py-4 text-[#ACACAC] outline-none border-[#F3F3F3] border-[2px]  w-full"
            >
              <span className="text-[#ACACAC] twxt-[14px]">
                {selectedRegion.name ? selectedRegion.name : "Регион"}
              </span>
            </div>
            {!selectedRegion.name ? (
              <p className="text-red-600">Выберите регион</p>
            ) : undefined}

            {isRegion && (
              <div
                ref={ref}
                className="absolute top-[60px] bg-white w-full p-7.5 z-30 shadow-md"
              >
                {getData.regions?.map((region: IRegion) => (
                  <div
                    onClick={() => setSelectedRegion(region)}
                    className="flex gap-4 items-center cursor-pointer"
                    key={region.id}
                  >
                    {selectedRegion?.id == region.id ? (
                      <div className="w-4 h-4 border flex justify-center items-center">
                        <Image
                          src={"/tickImg.svg"}
                          width={9}
                          height={9}
                          alt=""
                        />
                      </div>
                    ) : (
                      <div className="w-4 h-4 border"></div>
                    )}
                    <p>{region.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <p className="font-medium">Выберите район</p>

        <div className="flex gap-5">
          <div className="flex relative flex-col  w-full gap-2">
            <div
              onClick={() => setIsDistrict(true)}
              className="pl-5 py-4 text-[#ACACAC] outline-none border-[#F3F3F3] border-[2px]  w-full"
            >
              <span className="text-[#ACACAC] twxt-[14px]">
                {selectedDistrict.name ? selectedDistrict.name : "Район"}
              </span>
            </div>
            {!selectedDistrict.name ? (
              <p className="text-red-600">Выберите район</p>
            ) : undefined}

            {isDistrict && (
              <div
                ref={ref2}
                className="absolute top-[60px] bg-white w-full p-7.5 z-30 shadow-md"
              >
                {getData.districts.filter(el=> el.parent_id.toString() == selectedRegion.id)?.map((district: IDistrict) => (
                  <div
                    onClick={() => setSelectedDistrict(district)}
                    className="flex gap-4 items-center cursor-pointer"
                    key={district.id}
                  >
                    {selectedDistrict?.id == district.id ? (
                      <div className="w-4 h-4 border flex justify-center items-center">
                        <Image
                          src={"/tickImg.svg"}
                          width={9}
                          height={9}
                          alt=""
                        />
                      </div>
                    ) : (
                      <div className="w-4 h-4 border"></div>
                    )}
                    <p>{district.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
