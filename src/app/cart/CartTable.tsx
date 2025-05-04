"use client";

import CartItem from "./CartItem";
import { INewProduct } from "@/types";

interface Props {
  products: INewProduct[];
  removeProduct: (entity: string) => void;
}

export default function CartTable({ products, removeProduct }: Props) {
  return (
    <div className="w-full hidden md:block">
      <div className="bg-primary">
        <div className="container mx-auto px-5 md:px-0  grid grid-cols-5 gap-4  text-white font-bold p-4">
          <div className="flex justify-center">Товар</div>
          <div className="flex justify-center">Цена</div>
          <div className="flex justify-center">Количество</div>
          <div className="flex justify-center">Итого</div>
          <div className="flex justify-center">Удалить</div>
        </div>
      </div>

      <div className="container mx-auto px-5 md:px-0  ">
        {products.map((product) => (
          <CartItem
            key={product.id}
            product={product}
            removeProduct={removeProduct}
          />
        ))}
      </div>
    </div>
  );
}
