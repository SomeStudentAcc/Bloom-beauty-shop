"use client";
import { ICategory } from "@/types";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "querystring"; // still correct!
import React, { useState, useEffect } from "react";

interface Props {
  categories: ICategory[];
}

export default function CatalogCategories({ categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [itemControll, setItemControll] = useState<ICategory[]>([]);
  const [isItemControll, setIsItemControll] = useState(true);

  useEffect(() => {
    const itemParam = searchParams.get("categories");
    if (itemParam) {
      const selectedBrandss = itemParam.split(",");
      const found = categories.filter((item) =>
        selectedBrandss.includes(item.id)
      );
      setItemControll(found);
    } else {
      setItemControll([]);
    }
  }, [categories, searchParams]);

  const handleSelect = (controll: ICategory) => {
    const current = qs.parse(searchParams.toString());

    const alreadySelected = itemControll.some(
      (item) => item.id === controll.id
    );

    let updatedSelections: ICategory[];

    if (alreadySelected) {
      // Remove it
      updatedSelections = itemControll.filter(
        (item) => item.id !== controll.id
      );
    } else {
      // Add it
      updatedSelections = [...itemControll, controll];
    }

    setItemControll(updatedSelections);

    if (updatedSelections.length > 0) {
      current.categories = updatedSelections.map((item) => item.id).join(",");
    } else {
      delete current.categories;
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
        <h3>Категории</h3>
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
          {categories.map((controll) => (
            <div
              key={controll.id}
              onClick={() => handleSelect(controll)}
              className="flex gap-4 items-center cursor-pointer "
            >
              {itemControll.some((item) => item.id === controll.id) ? (
                <div className="w-4 h-4 border flex justify-center items-center">
                  <Image src="/tickImg.svg" width={9} height={9} alt="" />
                </div>
              ) : (
                <div className="w-4 h-4 border"></div>
              )}
              <p>{controll.name_ru}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
