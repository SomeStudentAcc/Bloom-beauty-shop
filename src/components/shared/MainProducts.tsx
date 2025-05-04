import { IGroup, INewProduct } from "@/types";
import { getUrl } from "@/utils";
import React from "react";
import MainProductSingle from "./MainProductSingle";
import Image from "next/image";
import ProductCard from "./ProductCard";
import Link from "next/link";

interface Props {
  products: INewProduct[];
  groupInfo: IGroup;
  position: string;
}

export default function MainProducts({ products, groupInfo, position }: Props) {
  const bgImage = getUrl(groupInfo.image, "groups");
  return (
    <div className="sm:container sm:mx-auto sm:px-5 md:px-0 gap-15 mb-12 lg:mb-20 flex flex-col lg:flex-row">
      {position == "left" && (
        <Link
          className="cursor-pointer max-w-1/2 w-full"
          href={`/catalog/${groupInfo.url}`}
        >
          <div
            className=" h-[446px] p-8 hidden lg:block"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <h3 className="text-3xl mb-3">{groupInfo.name_ru}</h3>
            <div className="flex items-center gap-5">
              <p>подробнее</p>
              <button className="border size-6 flex items-center justify-center">
                <Image
                  src={"/right-arrow-black.svg"}
                  width={14}
                  height={14}
                  alt=""
                />
              </button>
            </div>
          </div>
        </Link>
      )}
      <div className="w-full min-h-[187px]  lg:hidden ">
        <div className="relative ">
          <Link
            className="cursor-pointer max-w-1/2 w-full"
            href={`/catalog/${groupInfo.url}`}
          >
            <Image
              src={bgImage}
              alt=""
              width={1000}
              height={1000}
              priority
              className="object-contain w-full h-full"
            />
          </Link>
          <div className="absolute top-0 p-8">
            <h3 className="text-3xl mb-3">{groupInfo.name_ru}</h3>
            <div className="flex items-center gap-5">
              <p>подробнее</p>
              <button className="border size-6 flex items-center justify-center">
                <Image
                  src={"/right-arrow-black.svg"}
                  width={14}
                  height={14}
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:flex-1 hidden  md:flex-col md:justify-between sm:flex">
        {products.map((product) => (
          <MainProductSingle key={product.id} product={product} />
        ))}
      </div>
      <div className="flex gap-5 justify-center sm:hidden container mx-auto px-5 -mt-[8rem]">
        {products.slice(0, 2).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {position == "right" && (
        <Link
          className="cursor-pointer max-w-1/2 w-full"
          href={`/catalog/${groupInfo.url}`}
        >
          <div
            className=" h-[446px] p-8 hidden lg:block"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <h3 className="text-3xl mb-3">{groupInfo.name_ru}</h3>
            <div className="flex items-center gap-5">
              <p>подробнее</p>
              <button className="border size-6 flex items-center justify-center">
                <Image
                  src={"/right-arrow-black.svg"}
                  width={14}
                  height={14}
                  alt=""
                />
              </button>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}
