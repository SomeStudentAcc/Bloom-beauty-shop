"use client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "querystring";
import React, { useState, useEffect } from "react";

export default function CatalogPrice() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [priceFrom, setPriceFrom] = useState<string>("");
  const [priceTo, setPriceTo] = useState<string>("");
  const [isPriceControll, setIsPriceControll] = useState(true);

  useEffect(() => {
    const fromParam = searchParams.get("priceFrom");
    const toParam = searchParams.get("priceTo");

    setPriceFrom(fromParam || "");
    setPriceTo(toParam || "");
  }, [searchParams]);

  const updateQuery = (newPriceFrom: string, newPriceTo: string) => {
    const current = qs.parse(searchParams.toString());

    if (newPriceFrom) {
      current.priceFrom = newPriceFrom;
    } else {
      delete current.priceFrom;
    }

    if (newPriceTo) {
      current.priceTo = newPriceTo;
    } else {
      delete current.priceTo;
    }

    const query = qs.stringify(current);
    router.push(query ? `?${query}` : "?", { scroll: false });
  };

  const handlePriceChange = (type: "from" | "to", value: string) => {
    if (type === "from") {
      setPriceFrom(value);
    } else {
      setPriceTo(value);
    }
  };

  const handleConfirmClick = () => {
    updateQuery(priceFrom, priceTo);
  };

  return (
    <div className={`py-7.5 border-b border-[#F3F3F3] flex flex-col gap-7.5`}>
      <div
        onClick={() => setIsPriceControll((prev) => !prev)}
        className="flex justify-between items-center cursor-pointer select-none"
      >
        <h3>Цена</h3>
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
        <div className="flex flex-col gap-4">
          <input
            type="number"
            placeholder="Цена от"
            value={priceFrom}
            onChange={(e) => handlePriceChange("from", e.target.value)}
            className="pl-5 py-4 text-[#ACACAC] outline-none border-[#F3F3F3] border-[2px] w-full"
          />
          <input
            type="number"
            placeholder="Цена до"
            value={priceTo}
            onChange={(e) => handlePriceChange("to", e.target.value)}
            className="pl-5 py-4 text-[#ACACAC] outline-none border-[#F3F3F3] border-[2px] w-full"
          />
        </div>
      )}
      {isPriceControll && (
        <button
          onClick={handleConfirmClick}
          className="py-4 flex justify-center bg-primary w-full text-white"
        >
          подтвердить
        </button>
      )}
    </div>
  );
}
