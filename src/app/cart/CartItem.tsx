import ProductCardLikeBtn from "@/components/shared/ProductCardLikeBtn";
import { useCartStore } from "@/stores/cartStore";
import { INewProduct } from "@/types";
import { formatPrice } from "@/utils";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
  product: INewProduct;
  removeProduct: (entity: string) => void;
}

export default function CartItem({ product, removeProduct }: Props) {
  const { cart, increase, decrease, removeFromCart } = useCartStore();
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    const cartProd = cart.find((el) => el.id == product.id);
    if (cartProd) {
      setAmount(cartProd.amount);
    }
  }, [cart, product.id]);

  useEffect(() => {
    if (amount < 1) {
      removeProduct(product.id);
    }
  }, [amount]);

  return (
    <div className="grid grid-cols-5 gap-4 items-center border-[#F3F3F3] border-b py-8">
      <div className="flex gap-4 items-center">
        <div className="flex gap-4 items-center">
          <Image
            src={product.imageUrl}
            width={100}
            height={100}
            alt={""}
            className="border-[#F3F3F3] border p-3"
          />
          <div>
            <p className="text-xs text-gray-500 uppercase">LACOSTE</p>
            <p className="text-sm font-semibold">
              LACOSTE HOMME (M) EDT 100 ml UK
            </p>
          </div>
        </div>
        <ProductCardLikeBtn product={product} />
      </div>

      <div className="flex gap-5 flex-col items-center text-sm">
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

      <div className="flex justify-center items-center ">
        <div className="flex items-center w-fit">
          <button
            onClick={() => {
              decrease(product.id);
              setAmount(amount - 1);
            }}
            className="px-2 border w-10 h-10 flex justify-center items-center"
          >
            -
          </button>
          <span className="px-4">{amount}</span>
          <button
            onClick={() => {
              increase(product.id);
              setAmount((prev) => prev++);
            }}
            className="px-2 border w-10 h-10 flex justify-center items-center"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex justify-center font-bold text-sm">
        {product.is_discount > 0 ? (
          <span>{formatPrice(Number(product.price) * amount)} сум</span>
        ) : (
          <span>{formatPrice(Number(product.old_price) * amount)} сум</span>
        )}
      </div>

      <div className="cursor-pointer flex justify-center">
        <X
          onClick={() => {
            removeFromCart(product.id);
            removeProduct(product.id);
          }}
          className="size-5  text-center"
        />
      </div>
    </div>
  );
}
