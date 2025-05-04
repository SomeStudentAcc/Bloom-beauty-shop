"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import CatalogSortBy from "./CatalogSortBy";
import CatalogBrands from "./CatalogBrands";
import CatalogCategories from "./CatalogCategories";
import CatalogPrice from "./CatalogPrice";
import { ICategory } from "@/types";
import CatalogDiscounts from "./CatalogDiscounts";

interface Props {
  brands: string[];
  discounts: string[];
  categories: ICategory[];
}

export default function CatallogFilters({
  brands,
  discounts,
  categories,
}: Props) {
  const router = useRouter();
  const [isFilter, setIsFilter] = useState(false)

  const handleResetFilters = () => {
    router.push("?", { scroll: false });
  };

  return (
    <div className="">
      <div className="hidden md:block">
        <div className="mb-10">
          <h3 className="font-semibold text-xl mb-4">Фильтр товаров</h3>
          <p className="text-[#ACACAC] text-[14px] mb-5">
            Воспользуйтесь фильтром, для более точного поиска продукта
          </p>
          <button
            onClick={handleResetFilters}
            className="border-[#D1D1D1] border w-full py-3 flex justify-center items-center"
          >
            сбросить
          </button>
        </div>
        <CatalogSortBy />
        {discounts.length > 0 && <CatalogDiscounts discounts={discounts} />}
        {brands.length > 0 && <CatalogBrands brands={brands} />}
        {categories.length > 0 && <CatalogCategories categories={categories} />}
        <CatalogPrice />
      </div>
      <div className="md:hidden">
        <div className="flex flex-col gap-5">
          <button
            onClick={()=> setIsFilter((prev)=> !prev)}
            className={`border-[#D1D1D1] border w-full py-3 flex justify-center ${isFilter && 'bg-black text-white'} items-center hover:bg-black hover:text-white`}
          >
            Фильтры
          </button>
          <p className="text-[#ACACAC] text-[14px] ">
            Воспользуйтесь фильтром, для более точного поиска продукта
          </p>
          <button
            onClick={handleResetFilters}
            className="border-[#D1D1D1] border w-full py-3 flex justify-center items-center hover:bg-black hover:text-white"
          >
            сбросить
          </button>
        </div>
        {isFilter && (
          <div>
            <CatalogSortBy />
            {discounts.length > 0 && <CatalogDiscounts discounts={discounts} />}
            {brands.length > 0 && <CatalogBrands brands={brands} />}
            {categories.length > 0 && (
              <CatalogCategories categories={categories} />
            )}
            <CatalogPrice />
          </div>
        )}
      </div>
    </div>
  );
}
