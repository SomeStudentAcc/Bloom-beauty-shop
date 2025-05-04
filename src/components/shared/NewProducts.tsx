"use client";
import React, { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type SwiperType from "swiper";
import Image from "next/image";
import { INewProduct } from "@/types";
import ProductCard from "./ProductCard";

interface Props {
  newProducts: INewProduct[];
  title: string;
}

export default function NewProducts({ newProducts, title }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="container mx-auto px-5 md:px-0 mb-12 lg:mb-20">
      <div className="relative flex justify-between lg:justify-center">
        <h2 className="mb-10 text-xl lg:text-3xl">{title}</h2>

        <div className="absolute right-0 flex gap-5">
          <button
            className="w-[40px] h-[40px] flex justify-center items-center border"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <Image
              className="transform-[scaleX(-1)]"
              src={"/right-arrow-black.svg"}
              height={24}
              width={24}
              alt=""
            />
          </button>
          <button
            className="w-[40px] h-[40px] flex justify-center items-center border"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <Image
              src={"/right-arrow-black.svg"}
              height={24}
              width={24}
              alt=""
            />
          </button>
        </div>
      </div>
      <Swiper
        spaceBetween={20}
        navigation={false}
        modules={[Navigation]}
        effect="fade"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          1024: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 2,
          },

          0: {
            slidesPerView: 1.5,
          },
        }}
      >
        {newProducts?.map((product) => (
          <SwiperSlide key={product.id} className="select-none">
              <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
