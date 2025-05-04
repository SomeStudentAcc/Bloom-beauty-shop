/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import ProductCardLikeBtn from "@/components/shared/ProductCardLikeBtn";
import { IGetSingleProduct } from "@/types";
import { formatPrice } from "@/utils";
import Image from "next/image";
import React, { useState } from "react";
import ProductDetails from "./ProductDetails";

type Props = {
  getProduct: IGetSingleProduct;
};

export default function ProductMobile({ getProduct }: Props) {
  const [selectedImage, setSelectedImage] = useState(getProduct.images[0].url);

  return (
    <div>
      <div className="flex flex-col gap-3 mb-8">
        <p className="">{getProduct.product.brand_ru}</p>
        <h4 className="max-w-[560px] w-full text-lg font-semibold">
          {getProduct.product.name_ru}
        </h4>
      </div>
      <div className="flex justify-center mb-8">
        <div className=" w-full flex justify-center relative ">
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
            <ProductCardLikeBtn product={getProduct.product }/>
          </div>

          <Image
            className=" "
            src={selectedImage}
            width={500}
            height={500}
            alt=""
          />
        </div>
      </div>
      <span className="text-[#ACACAC] mb-5">
        SKU: {getProduct.product.article}
      </span>
      <div className="flex flex-col gap-7 mb-8">
        <div className="flex gap-5 text-lg font-medium">
          {getProduct.product.is_discount > 0 && (
            <span>{formatPrice(Number(getProduct.product.price))} сум</span>
          )}
          <span
            className={`${
              getProduct.product.is_discount > 0 &&
              "line-through text-[#ACACAC]"
            }`}
          >
            {formatPrice(Number(getProduct.product.old_price))} сум
          </span>
        </div>
        <button className="py-4 max-w-[220px] w-full bg-primary text-white">
          В корзину
        </button>
      </div>
      <div className="flex flex-col  gap-5 mb-8">
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
      <ProductDetails getProduct={getProduct}/>
    </div>
  );
}
