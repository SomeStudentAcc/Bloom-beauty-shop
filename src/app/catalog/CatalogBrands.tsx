"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "querystring"; // still correct!
import React, { useState, useEffect } from "react";

interface Props {
  brands: string[];
}

export default function CatalogBrands({ brands }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [itemControll, setItemControll] = useState<string[]>([]);
  const [isItemControll, setIsItemControll] = useState(true);

  useEffect(() => {
    const itemParam = searchParams.get("brands");
    if (itemParam) {
      const selectedBrandss = itemParam.split(",");
      const found = brands.filter((item) => selectedBrandss.includes(item));
      setItemControll(found);
    } else {
      setItemControll([]);
    }
  }, [brands, searchParams]);

  const handleSelect = (controll: string) => {
    const current = qs.parse(searchParams.toString());

    const alreadySelected = itemControll.some((item) => item === controll);

    let updatedSelections: string[];

    if (alreadySelected) {
      // Remove it
      updatedSelections = itemControll.filter((item) => item !== controll);
    } else {
      // Add it
      updatedSelections = [...itemControll, controll];
    }

    setItemControll(updatedSelections);

    if (updatedSelections.length > 0) {
      current.brands = updatedSelections.map((item) => item).join(",");
    } else {
      delete current.brands;
    }

    const query = qs.stringify(current);
    router.push(query ? `?${query}` : "?", { scroll: false });
  };

  return (
    <div
      className={`py-7.5 border-b border-[#F3F3F3] flex flex-col gap-7.5`}
    >
      <div
        onClick={() => setIsItemControll((prev) => !prev)}
        className="flex justify-between items-center cursor-pointer select-none"
      >
        <h3>Бренды</h3>
        <Image
          className={`w-1 h-1.5 ${
            isItemControll ? "rotate-90" : "rotate-[-90deg]"
          }`}
          src="/arrow-catalog.svg"
          width={1000}
          height={1000}
          alt=""
        />
      </div>

      {isItemControll && (
        <div className="flex flex-col gap-2 max-h-[240px] overflow-y-auto">
          {brands.map((brand, index) => (
            <div
              key={index}
              onClick={() => handleSelect(brand)}
              className="flex gap-4 items-center cursor-pointer"
            >
              {itemControll.some((item) => item === brand) ? (
                <div className="w-4 h-4 border flex justify-center items-center">
                  <Image src="/tickImg.svg" width={9} height={9} alt="" />
                </div>
              ) : (
                <div className="w-4 h-4 border"></div>
              )}
              <p>{brand}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
