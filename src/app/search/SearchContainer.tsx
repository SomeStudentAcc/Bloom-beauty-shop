"use client";
import axiosInstance from "@/axios";
import ProductCard from "@/components/shared/ProductCard";
import { INewProduct } from "@/types";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function SearchContainer() {
  const [searchItem, setSearchItem] = useState("");
  const [products, setProducts] = useState<INewProduct[]>([]);

  useEffect(() => {
    const getProds = async () => {
      try {
        const res = await axiosInstance.get("/search/", {
          params: {
            q: searchItem,
          },
        });
        console.log(res.data);
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      }
    };
    if (searchItem.trim().length > 0) {
      getProds();
    }
  }, [searchItem]);

  return (
    <div>
      <div className="flex items-center gap-5 mb-20">
        <input
          type="text"
          onChange={(e) => setSearchItem(e.target.value)}
          value={searchItem}
          placeholder="поиск товаров"
          className="w-full px-3 py-1.5 border-b outline-none border-gray-300 rounded placeholder-gray-500 text-black text-[1.5rem] lg:text-[3rem] font-bold"
        />
        <X
          className="size-10 cursor-pointer"
          onClick={() => setSearchItem("")}
        />
      </div>
      {searchItem.trim().length > 0 ? (
        <div>
          <h3 className="text-3xl text-center mb-10">Мы нашли кое-что</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {products?.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex gap-8 flex-col justify-center items-center">
          <Image src={"/searchIcon2.svg"} height={120} width={120} alt="" />
          <div className="flex gap-3 flex-col text-center">
            <h3 className="text-3xl">Ничего не найдено!</h3>
            <p>Попробуйте еще раз</p>
          </div>
        </div>
      )}
    </div>
  );
}
