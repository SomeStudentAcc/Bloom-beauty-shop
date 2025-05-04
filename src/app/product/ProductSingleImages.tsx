/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import ProductCardLikeBtn from "@/components/shared/ProductCardLikeBtn";
import { IGetSingleProduct } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import ProductDetails from "./ProductDetails";
import { X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../assets/BlogSwiper.css";

type Props = {
  getProduct: IGetSingleProduct;
};

export default function ProductSingleImages({ getProduct }: Props) {
  const [selectedImage, setSelectedImage] = useState(getProduct.images[0].url);
  const [isImage, setIsImage] = useState(false);
  return (
    <>
      <div>
        <div className="flex gap-5 lg:gap-12 mb-6">
          <div>
            {getProduct.images.map((el, index) => (
              <div key={index} className="w-[80px] h-[80px] border">
                <Image
                  src={el.url}
                  onClick={() => setSelectedImage(el.url)}
                  className="h-full w-full"
                  width={1000}
                  height={1000}
                  alt=""
                />
              </div>
            ))}
          </div>
          <div className="max-w-[400px] lg:max-w-[500px] w-full flex justify-center relative ">
            <div className="absolute left-0 flex flex-col gap-[1px]">
              {getProduct.product.is_discount == 1 && (
                <div className=" w-10 h-10 bg-[#E44B55] flex justify-center items-center font-semibold text-white">
                  {getProduct.product.discount_percentage}%
                </div>
              )}
              {getProduct.product.is_new == 1 && (
                <div className="w-10 h-10 bg-[#FFA035] flex justify-center items-center font-semibold text-white">
                  new
                </div>
              )}
            </div>
            <div className="absolute right-0 p-5">
              <ProductCardLikeBtn product={getProduct.product} />
            </div>

            <Image onClick={()=>setIsImage(true)} src={selectedImage} width={500} height={500} alt="" />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-5 mb-20">
          <div className="flex gap-3">
            <div className="p-2 border flex-shrink-0 w-[50px] h-[50px]">
              <Image
                src={"/free.svg"}
                width={30}
                height={30}
                className="w-[30px] h-[30px]"
                alt=""
              />
            </div>
            <p className="text-[14px] max-w-[155px] w-full">
              Бесплатная доставка от 300 000 сум
            </p>
          </div>
          <div className="flex gap-3">
            <div className="p-2 border flex-shrink-0 w-[50px] h-[50px]">
              <Image
                src={"/truck.svg"}
                width={30}
                height={30}
                className="w-[30px] h-[30px]"
                alt=""
              />
            </div>
            <p className="text-[14px] max-w-[155px] w-full">
              Доставка по всему Ташкенту
            </p>
          </div>
          <div className="flex gap-3">
            <div className="p-2 border flex-shrink-0 w-[50px] h-[50px]">
              <Image
                src={"/garanty.svg"}
                width={30}
                height={30}
                className="w-[30px] h-[30px]"
                alt=""
              />
            </div>

            <p className="text-[14px] max-w-[155px] w-full">
              Гарантия качества продукции
            </p>
          </div>
        </div>
        <ProductDetails getProduct={getProduct} />
      </div>
      {isImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setIsImage(false)}
            className="absolute top-5 right-5 text-white z-50"
          >
            <X size={32} />
          </button>

          <Swiper
            navigation={true}
            loop={true}
            modules={[Navigation]}
            className="w-full md:w-[70%] max-w-3xl h-full flex justify-center "
          >
            {getProduct.images.map((image) => (
              <SwiperSlide className="h-full" key={image.url}>
                <div className="flex justify-center items-center h-full ">
                  <Image
                    src={image.url}
                    width={1000}
                    height={600}
                    className="h-[70vh] max-w-[400px] w-full  object-contain"
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}
