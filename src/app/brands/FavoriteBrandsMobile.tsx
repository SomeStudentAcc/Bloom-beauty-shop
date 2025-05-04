import Image from "next/image";
import React, { useEffect, useState } from "react";
import { BrandGroup } from "./BrandsList";
import { useFavoriteBrandsStore } from "@/stores/favoriteBrands";
import { customSort, groupBrandsByFirstLetter } from "@/utils";

export default function FavoriteBrandsMobile() {
  const { favoriteBrands, toggleFavoriteBrand } = useFavoriteBrandsStore();

  const [orderedBrands, setOrderedBrands] = useState<BrandGroup[]>([]);

  useEffect(() => {
    const ordered = customSort(favoriteBrands);
    const result = groupBrandsByFirstLetter(ordered);
    setOrderedBrands(result);
  }, [favoriteBrands]);
  return (
    <div>
      {favoriteBrands.length > 0 ? (
        <div className="flex flex-col gap-20">
          {orderedBrands.map((group, index) => (
            <section id={`group-${group.letter}`} key={index} className="flex gap-12 ">
              <div className="text-[40px] font-bold leading-none">
                {group.letter}
              </div>
              <div className="w-full flex flex-col  gap-5">
                {group.brands.map((brand, idx) => (
                  <div key={idx} className="text-sm">
                    <div className={`relative `}>
                      <Image
                        onClick={() => toggleFavoriteBrand(brand)}
                        src="/likeFilled.svg"
                        className="cursor-pointer absolute left-0"
                        width={20}
                        height={20}
                        alt="Liked"
                      />
                      <p className="ml-10 group-hover:text-primary">{brand}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <p className="text-[#ACACAC] text-[14px]">
          Ставьте лайки напротив любимого бренда, и он появится в вашем списке
        </p>
      )}
    </div>
  );
}
