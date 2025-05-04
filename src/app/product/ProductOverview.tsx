import { IGetSingleProduct } from "@/types";
import { formatPrice } from "@/utils";
import React from "react";

type Props = {
  getProduct: IGetSingleProduct;
};
export default function ProductOverview({getProduct}:Props) {
  return (
    <div className="flex flex-col gap-7">
      <span className="text-[#ACACAC]">SKU: {getProduct.product.article}</span>
      <div className="flex flex-col gap-3">
        <p className="text-lg">{getProduct.product.brand_ru}</p>
        <h4 className="max-w-[560px] w-full text-3xl font-semibold">
          {getProduct.product.name_ru}
        </h4>
      </div>
      <div className="flex gap-5 text-3xl font-medium">
        {getProduct.product.is_discount > 0 && (
          <span>{formatPrice(Number(getProduct.product.price))} сум</span>
        )}
        <span
          className={`${
            getProduct.product.is_discount > 0 && "line-through text-[#ACACAC]"
          }`}
        >
          {formatPrice(Number(getProduct.product.old_price))} сум
        </span>
      </div>
      <button className="py-4 max-w-[220px] w-full bg-primary text-white">
        В корзину
      </button>
    </div>
  );
}
