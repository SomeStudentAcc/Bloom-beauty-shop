import axiosInstance from "@/axios";
import { IGetSingleProduct } from "@/types";
import React from "react";
import ProductSingleImages from "../ProductSingleImages";
import ProductOverview from "../ProductOverview";
import ProductMobile from "../ProductMobile";
import NewProducts from "@/components/shared/NewProducts";

export default async function Product({
  params: { id },
}: {
  params: { id: string };
}) {
  const res = await axiosInstance.get("/get-product", {
    params: {
      url: id,
    },
  });
  const getProduct: IGetSingleProduct = res.data;
  console.log(res.data);

  return (
    <>
      <div className="container mx-auto px-5 md:px-0 pt-12">
        <div className="hidden md:flex gap-5 justify-between mb-20">
          <ProductSingleImages getProduct={getProduct} />
          <ProductOverview getProduct={getProduct} />
        </div>
        <div className="md:hidden mb-12">
          <ProductMobile  getProduct={getProduct}/>
        </div>
        <div>
          <NewProducts newProducts={getProduct.recommended} title="Рекомендуем"/>
        </div>
      </div>
    </>
  );
}
