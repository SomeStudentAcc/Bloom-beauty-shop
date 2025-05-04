"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "querystring"; // <== correct package!
import React, { useState, useEffect } from "react";

type Controlls = {
  id: number;
  text: string;
  slug: string
};

const controlls: Controlls[] = [
  { id: 1, text: "По возрастанию цены", slug: 'price' },
  { id: 2, text: "По убыванию цены" , slug: 'price-desc' },
  { id: 3, text: "По возрастанию скидки", slug: 'discount'  },
  { id: 4, text: "По убыванию скидки", slug: 'discount-desc'  },
];

export default function CatalogSortBy() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [priceControll, setPriceControll] = useState<Controlls | undefined>();
  const [isPriceControll, setIsPriceControll] = useState(true);

  useEffect(() => {
    const sortParam = searchParams.get('sort'); 
    if (sortParam) {
      const found = controlls.find(item => item.slug === sortParam);
      setPriceControll(found);
    } else {
      setPriceControll(undefined);
    }
  }, [searchParams]);

  const handleSelect = (controll: Controlls) => {
    const current = qs.parse(searchParams.toString()); // <- mutable object

    if (priceControll?.id === controll.id) {
      // clicked again -> deselect
      setPriceControll(undefined);
      delete current.sort;
    } else {
      setPriceControll(controll);
      current.sort = controll.slug;
    }

    const query = qs.stringify(current);
    router.push(query ? `?${query}` : "?", { scroll: false });
  };

  return (
    <div
      className={`border-b border-[#F3F3F3] flex flex-col gap-7.5 py-7.5`}
    >
      <div
        onClick={() => setIsPriceControll(prev => !prev)}
        className="flex justify-between items-center cursor-pointer select-none"
      >
        <h3>Сортировать по</h3>
        <Image
          className={`w-1 h-1.5 ${
            isPriceControll ? "rotate-90" : "rotate-[-90deg]"
          }`}
          src="/arrow-catalog.svg"
          width={1000}
          height={1000}
          alt=""
        />
      </div>

      {isPriceControll && (
        <div className="flex flex-col gap-2">
          {controlls.map((controll) => (
            <div
              key={controll.id}
              onClick={() => handleSelect(controll)}
              className="flex gap-4 items-center cursor-pointer"
            >
              {priceControll?.id === controll.id ? (
                <div className="w-4 h-4 border flex justify-center items-center">
                  <Image src="/tickImg.svg" width={9} height={9} alt="" />
                </div>
              ) : (
                <div className="w-4 h-4 border"></div>
              )}
              <p>{controll.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
