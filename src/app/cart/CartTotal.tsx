import { useCartStore } from "@/stores/cartStore";
import { INewProduct } from "@/types";
import { formatPrice } from "@/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export interface Props {
  products: INewProduct[];
}

interface INewProds extends INewProduct {
  amount: number;
}

export default function CartTotal({ products }: Props) {
  const { cart } = useCartStore();

  const [newProds, setNewProds] = useState<INewProds[]>([]);

  useEffect(() => {
    const newProducts: INewProds[] = products.map((el) => {
      const foundInCart = cart.find((item) => item.id === el.id);
      return {
        ...el,
        amount: foundInCart?.amount || 1,
      };
    });
    setNewProds(newProducts);
  }, [cart, products]);
  console.log(newProds);

  const sum = newProds.reduce(
    (acc, el) => acc + Number(el.old_price) * el.amount,
    0
  );

  const discount = newProds.reduce(
    (acc, el) => (Number(el.discount) > 0 ? acc + Number(el.discount) : acc),
    0
  );


  return (
    <div className="container mx-auto px-5 md:px-0 py-12 flex justify-end">
      <div className="max-w-[29rem] w-full">
        <div className="mb-8 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-black whitespace-nowrap">
              Сумма без скидки
            </span>
            <div className="flex-grow border-t border-dotted border-gray-300"></div>
            <span className="text-black whitespace-nowrap">
              {formatPrice(sum) || 0} сум
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-black whitespace-nowrap">Сумма скидки</span>
            <div className="flex-grow border-t border-dotted border-gray-300"></div>
            <span className="text-black whitespace-nowrap">
              {formatPrice(discount)} сум
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-black whitespace-nowrap">Итого</span>
            <div className="flex-grow border-t border-dotted border-gray-300"></div>
            <span className="text-black whitespace-nowrap">{formatPrice(Number(sum)-Number(discount))} сум</span>
          </div>
        </div>
        <Link href={'/checkout'} className="bg-primary py-4 flex justify-center text-white w-full">
          оформить заказ
        </Link>
      </div>
    </div>
  );
}
