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

export default function CartItemMobile({ product, removeProduct }: Props) {
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
    <div className="relative py-8 border-[#F3F3F3] border-b">
      <div className="absolute right-0">
        <X
          onClick={() => {
            removeFromCart(product.id);
            removeProduct(product.id);
          }}
          className="size-5"
        />
      </div>
      <div className="max-w-[150px] w-full h-[150px] border border-[#F3F3F3] relative mb-5">
        <div className="absolute right-0 z-10 p-2">
          <ProductCardLikeBtn product={product} />
        </div>
        <Image
          src={product.imageUrl}
          alt=""
          width={150}
          height={150}
          className="h-full w-auto object-contain"
        />
      </div>
      <div className="mb-5">
        <h4 className="mb-2 text-sm">{product.brand_ru}</h4>
        <p className="font-medium line-clamp-1">{product.name_ru}</p>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <p>Цена</p>
          <div>
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
        <div className="flex justify-between">
          <p>Количество</p>
          <div>
            <div className="flex items-center w-fit">
              <button
                onClick={() => {
                  decrease(product.id);
                  setAmount((prev) => prev--);
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
        </div>
        <div className="flex justify-between">
          <p>Итого</p>
          <div>
            {product.is_discount > 0 ? (
              <span>{formatPrice(Number(product.price))} сум</span>
            ) : (
              <span>{formatPrice(Number(product.old_price))} сум</span>
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
