"use client";
import React, { useEffect, useState } from "react";
import CartTable from "./CartTable";
import CartMobile from "./CartMobile";
import CartTotal from "./CartTotal";
import { useCartStore } from "@/stores/cartStore";
import axiosInstance from "@/axios";
import { INewProduct } from "@/types";
import Link from "next/link";



export default function Cart() {
  const { cart } = useCartStore();
  const [products, setProducts] = useState<INewProduct[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const { removeFromCart } = useCartStore();

  useEffect(() => {
    const filteredIds = cart.map((el) => el.id);
    setIds(filteredIds);
  }, []);

  useEffect(() => {
    const getProds = async () => {
      const formData = new FormData();
      formData.append("page", "1");
      formData.append("pageSize", "100");
      formData.append("ids", JSON.stringify(ids));
      try {
        const res = await axiosInstance.post("/get-products/", formData);
        setProducts(res.data.products);

        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (ids.length > 0) {
      getProds();
    }
  }, [ids]);

  const removeProduct = (id: string) => {
    const filteredProds = products.filter((el) => el.id !== id);
    setProducts(filteredProds);
    console.log(filteredProds);
    

    removeFromCart(id);
  };

  return (
    <div>
      <div className="container mx-auto px-5 md:px-0 py-12">
        <h4 className="text-3xl mb-8 lg:mb-12">Корзина</h4>
      </div>
      {products.length > 0 ? (
        <>
          <CartTable removeProduct={removeProduct} products={products} />
          <CartMobile removeProduct={removeProduct} products={products} />
          <CartTotal products={products} />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h3 className="text-3xl mb-3">Пока ничего нет!</h3>
          <p className="mb-7">Перейти к покупкам</p>
          <Link className="max-w-[14rem] w-full" href={'/'}>
            <button className="text-lg border-[#D1D1D1] border py-4 max-w-[14rem] w-full">
              на главную
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
