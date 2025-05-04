'use client'
import { INewProduct } from "@/types";
import { formatPrice } from "@/utils";
import Image from "next/image";
import React from "react";
import ProductCardLikeBtn from "./ProductCardLikeBtn";
import Link from "next/link";
import { useCartStore } from "@/stores/cartStore";

interface Props {
  product: INewProduct;
}

export default function ProductCard({ product }: Props) {
  const { cart, addToCart, increase, decrease } = useCartStore();

  const cartItem = cart.find((item) => item.id === product.id);
  const inCart = !!cartItem;

  return (
    <div className="max-w-[21.2rem] w-full relative">
      <Link href={`product/${product.url}`}>
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
        <div className="absolute right-0 z-10 p-5">
          <ProductCardLikeBtn product={product} />
        </div>
        <div className="border-[#F3F3F3] border flex justify-center items-center mb-5 bg-white">
          <Image
            src={product.imageUrl || "/tgBanner.svg"}
            width={260}
            height={260}
            alt=""
          />
        </div>
        <div>
          <h4 className="mb-2 text-sm">{product.brand_ru}</h4>
          <p className="font-medium line-clamp-1">{product.name_ru}</p>
        </div>
      </Link>

      <div className="flex gap-5 font-medium mb-3">
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

      {inCart ? (
        <div className="flex max-w-25 w-full items-center gap-3 bg-black text-white">
          <button
            className="w-8 h-8 brder flex justify-center items-center"
            onClick={() => decrease(product.id)}
          >
            -
          </button>
          <p>{cartItem?.amount}</p>
          <button
            className="w-8 h-8  flex justify-center items-center"
            onClick={() => increase(product.id)}
          >
            +
          </button>
        </div>
      ) : (
        <button
          className="bg-primary hover:bg-black transition-all duration-150 max-w-25 w-full py-2 flex justify-center items-center"
          onClick={() => addToCart(product.id)}
        >
          <Image src={"/shopping-bag.svg"} width={16} height={16} alt="" />
        </button>
      )}
    </div>
  );
}
