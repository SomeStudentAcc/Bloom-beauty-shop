import React from "react";
import ScrollSpy from "react-scrollspy-navigation";
import BrandItem from "./BrandItem";
import { groupBrandsByFirstLetter } from "@/utils";
import Link from "next/link";
interface Props {
  brands: string[];
}

export default function BrandsListMobile({ brands }: Props) {
  const groupedBrands = groupBrandsByFirstLetter(brands);

  return (
    <div className="relative flex ">
      <div className="flex flex-1 flex-col gap-20">
        {groupedBrands.map((group, index) => (
          <section
            id={`group-${group.letter}`}
            key={index}
            className="flex  gap-5 lg:gap-10 "
          >
            <div className="text-[40px] font-bold leading-none">
              {group.letter}
            </div>
            <div className="w-full flex flex-col lg:grid lg:grid-cols-3  gap-10">
              {group.brands.map((brand, idx) => (
                <div key={idx} className="text-sm">
                  <BrandItem brand={brand} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>{" "}
      <div className=" sticky top-[80px] right-0 h-[calc(100vh-280px)] overflow-auto p-[10px] z-[9]">
        <ScrollSpy activeClass="nav-active">
          <nav>
            <ul>
              {groupedBrands.map((el, index) => (
                <li key={index}>
                  <Link href={`#group-${el.letter}`}>{el.letter}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </ScrollSpy>
      </div>
    </div>
  );
}
