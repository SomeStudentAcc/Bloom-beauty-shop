import React from "react";
import BrandItem from "./BrandItem";
import { groupBrandsByFirstLetter } from "@/utils";

interface Props {
  brands: string[];
}

export type BrandGroup = {
  letter: string;
  brands: string[];
};

export default function BrandsList({ brands }: Props) {
  const groupedBrands = groupBrandsByFirstLetter(brands);

  return (
    <div className="w-[60%]">
      <div className="flex flex-col gap-20">
        {groupedBrands.map((group, index) => (
          <div key={index} className="flex  gap-5 lg:gap-10 ">
            <div className="text-[40px] font-bold leading-none">
              {group.letter}
            </div>
            <div className="w-full grid grid-cols-3  gap-10">
              {group.brands.map((brand, idx) => (
                <div key={idx} className="text-sm">
                  <BrandItem brand={brand} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
