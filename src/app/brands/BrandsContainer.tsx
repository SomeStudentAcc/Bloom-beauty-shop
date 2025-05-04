"use client";
import { IGetProducts } from "@/types";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import FavoriteBrands from "./FavoriteBrands";
import BrandsList from "./BrandsList";
import { useFavoriteBrandsStore } from "@/stores/favoriteBrands";
import BrandsListMobile from "./BrandsListMobile";
import FavoriteBrandsMobile from "./FavoriteBrandsMobile";

interface Props {
  getProducts: IGetProducts;
}

export default function BrandsContainer({ getProducts }: Props) {
  const [searchedBrand, setSearchedBrand] = useState("");
  const [selectedView, setSelectedView] = useState(1);
  const { setFavoriteBrands } = useFavoriteBrandsStore();
  const brands = getProducts.brands;

  useEffect(() => {
    const stored = localStorage.getItem("b_brands");
    if (stored) {
      const parsed: string[] = JSON.parse(stored);
      setFavoriteBrands(parsed);
    }
  }, [setFavoriteBrands]);

  const filteredBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(searchedBrand.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center gap-5 mb-10">
        <input
          type="text"
          onChange={(e) => setSearchedBrand(e.target.value)}
          value={searchedBrand}
          placeholder="найти бренд"
          className="w-full px-3 py-1.5 border-b outline-none border-gray-300 rounded placeholder-gray-500 text-black text-[3rem] font-bold"
        />
        <X
          className="size-10 cursor-pointer"
          onClick={() => setSearchedBrand("")}
        />
      </div>
      <div className="">
        <div className="hidden lg:flex gap-5">
          <FavoriteBrands />
          <BrandsList brands={filteredBrands} />
        </div>
        <div>
          <div className="flex gap-5 mb-8">
            <button
              onClick={() => setSelectedView(1)}
              className={`py-2 w-full ${
                selectedView == 1 ? "border-[3px]" : "border-[#D1D1D1]"
              } border`}
            >
              Все
            </button>
            <button
              onClick={() => setSelectedView(2)}
              className={`py-2 w-full ${
                selectedView == 2 ? "border-[3px]" : "border-[#D1D1D1]"
              } border`}
            >
              Избранное
            </button>
          </div>
          {selectedView == 1 ? (
            <BrandsListMobile brands={filteredBrands} />
          ) : (
            <FavoriteBrandsMobile />
          )}
        </div>
      </div>
    </div>
  );
}
