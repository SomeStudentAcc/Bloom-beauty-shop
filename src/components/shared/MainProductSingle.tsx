import Image from "next/image";
import React from "react";
import ProductCardLikeBtn from "./ProductCardLikeBtn";
import { formatPrice } from "@/utils";
import { INewProduct } from "@/types";
import Link from "next/link";

interface Props {
  product: INewProduct;
}

export default function MainProductSingle({ product }: Props) {
  return (
    <Link href={`/product/${product.url}`} className=" w-full max-w-[29rem] flex gap-7">
      <div className="relative max-w-[142px] w-full  min-h-[142px]">
        <div className="absolute left-0 flex flex-col gap-[1px]">
          {product.is_discount == 1 && (
            <div className=" w-10 h-10 bg-[#E44B55] flex justify-center items-center font-semibold text-white">
              {product.discount_percentage}%
            </div>
          )}
          {product.is_new == 1 && (
            <div className="w-10 h-10 bg-[#FFA035] flex justify-center items-center font-semibold text-white">
              new
            </div>
          )}
        </div>
        <div className="absolute right-0 z-10 p-2">
          <ProductCardLikeBtn product={product} />
        </div>
        <div className="border-[#F3F3F3] border flex justify-center items-center p-5">
          <Image src={product.imageUrl} width={100} height={100} alt="" />
        </div>
        <div className="md:hidden">
          <h4 className="mb-2 text-sm">{product.brand_ru}</h4>
          <p className="font-medium line-clamp-1">{product.name_ru}</p>
          <div className="flex gap-5 font-medium">
            {product.is_discount > 0 && (
              <span>{formatPrice(Number(product.price))} сум</span>
            )}
            <span
              className={`${
                product.is_discount > 0 && "line-through text-[#ACACAC]"
              }`}
            >
              {formatPrice(Number(product.old_price))} сум
            </span>
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <h4 className="mb-2 text-sm">{product.brand_ru}</h4>
        <p className="font-medium line-clamp-1">{product.name_ru}</p>
        <div className="flex gap-5 font-medium">
          {product.is_discount > 0 && (
            <span>{formatPrice(Number(product.price))} сум</span>
          )}
          <span
            className={`${
              product.is_discount > 0 && "line-through text-[#ACACAC]"
            }`}
          >
            {formatPrice(Number(product.old_price))} сум
          </span>
        </div>
      </div>
    </Link>
  );
}
