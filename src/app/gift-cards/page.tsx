import axiosInstance from "@/axios";
import { IGetProducts } from "@/types";
import React from "react";
import GiftCard from "./GiftCard";

export default async function GiftCards() {
    const formData = new FormData();
    formData.append("url", JSON.stringify(["sertifikati"]));
  const prods = await axiosInstance.post("/get-products/",formData);
  const getProducts: IGetProducts = prods.data;
  return (
    <div className="container mx-auto px-5 md:px-0 pt-12">
      <h4 className="text-3xl mb-8 lg:mb-12">Сертификаты</h4>
      <div className="grid grid-cols-3 gap-5">
        {getProducts.products.map((prod) => (
          <GiftCard key={prod.id} prod={prod} />
        ))}
      </div>
    </div>
  );
}
