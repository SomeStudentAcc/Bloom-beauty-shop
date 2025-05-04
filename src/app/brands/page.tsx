import React from "react";
import BrandsContainer from "./BrandsContainer";
import {  IGetProducts } from "@/types";
import axiosInstance from "@/axios";

export default async function Brands() {

  const prods = await axiosInstance.get("/get-products/");
  const getProducts: IGetProducts = prods.data;
  return (
    <div className="container mx-auto px-5 md:px-0 py-12">
      <BrandsContainer  getProducts={getProducts} />
    </div>
  );
}
