"use client";

import CartItemMobile from "./CartItemMobile";
import { INewProduct } from "@/types";
interface Props {
  products: INewProduct[];
  removeProduct: (entity: string) => void;
}

export default function CartMobile({ products, removeProduct }: Props) {
  return (
    <div className="container mx-auto px-5 md:px-0 md:hidden">
      {products.map((product) => (
        <CartItemMobile
          key={product.id}
          product={product}
          removeProduct={removeProduct}
        />
      ))}
    </div>
  );
}
