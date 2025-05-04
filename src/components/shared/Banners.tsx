import { IBanner } from "@/types";
import { getUrl } from "@/utils";
import Link from "next/link";
import React from "react";

interface Props {
  banners: IBanner[];
}

type GridConfig = {
  colSpan: string;
  rowSpan: string;
  height: string;
};

const getGridConfig = (index: number) => {
  const configs: { [key: number]: GridConfig } = {
    0: { colSpan: "col-span-4", rowSpan: "row-span-2", height: "h-[29rem]" },
    1: { colSpan: "col-span-3", rowSpan: "", height: "h-56" },
    2: { colSpan: "col-span-3", rowSpan: "", height: "h-56" },
    3: { colSpan: "col-span-2", rowSpan: "", height: "h-56" },
    4: { colSpan: "col-span-6", rowSpan: "", height: "h-56" },
    5: { colSpan: "col-span-2", rowSpan: "", height: "h-56" },
  };

  return (
    configs[index] || { colSpan: "col-span-3", rowSpan: "", height: "h-56" }
  );
};
const getMobileGridConfig = (index: number) => {
  const configs: { [key: number]: GridConfig } = {
    0: { colSpan: "col-span-2", rowSpan: "row-span-2", height: "h-56" },
    1: { colSpan: "col-span-1", rowSpan: "", height: "h-56" },
    2: { colSpan: "col-span-1", rowSpan: "", height: "h-56" },
    3: { colSpan: "col-span-1", rowSpan: "", height: "h-56" },
    4: { colSpan: "col-span-1", rowSpan: "", height: "h-56" },
    5: { colSpan: "col-span-2", rowSpan: "row-span-2", height: "h-56" },
  };

  return (
    configs[index] || { colSpan: "col-span-3", rowSpan: "", height: "h-56" }
  );
};

export default function Banners({ banners }: Props) {
  
  return (
    <>
      <div className="container mx-auto px-5 md:px-0 mb-12 lg:mb-20 hidden lg:block">
        <div
          className="grid grid-cols-6 gap-5  overflow-hidden"
          style={{
            gridTemplateColumns: "repeat(12, 1fr)",
            gridAutoRows: "auto",
          }}
        >
          {banners.map((banner, index) => {
            const { colSpan, rowSpan, height } = getGridConfig(index);
            const bgImage = getUrl(banner.file_ru, "banners");

            return (
              <Link
                key={index}
                href={`${banner.url}`}
                className={`${colSpan} ${rowSpan} ${height} w-full bg-cover bg-center  relative cursor-pointer h-56`}
                style={{ backgroundImage: `url(${bgImage})` }}
              >
                <div className="absolute inset-0 bg-black/25 bg-opacity-30"></div>
                <div className="relative h-full w-full p-7 flex flex-col justify-end">
                  <p className="text-white font-medium">{banner.title_ru}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="container mx-auto px-5 md:px-0 mb-20  lg:hidden">
        <div
          className="grid grid-cols-6 gap-5  overflow-hidden"
          style={{
            gridTemplateColumns: "repeat(2, 1fr)",
            gridAutoRows: "auto",
          }}
        >
          {banners.map((banner, index) => {
            const { colSpan, height } = getMobileGridConfig(index);
            const bgImage = getUrl(banner.file_ru, "banners");

            return (
              <div
                key={index}
                className={` ${colSpan}  ${height}   w-full bg-cover bg-center  relative cursor-pointer`}
                style={{ backgroundImage: `url(${bgImage})` }}
              >
                <div className="absolute inset-0 bg-black/25 bg-opacity-30"></div>
                <div className="relative h-full w-full p-7 flex flex-col justify-end">
                  <p className="text-white font-medium">{banner.title_ru}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
