"use client";
import React, { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type SwiperType from "swiper";
import Image from "next/image";
import { IBrand } from "@/types";
import { getUrl } from "@/utils";
import Link from "next/link";

interface Props {
  brands: IBrand[];
}

export default function Brands({ brands }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="mb-12 lg:mb-20">
      <div className="container mx-auto px-5 md:px-0  relative flex justify-center">
        <h2 className="mb-10  text-3xl">Бренды</h2>

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
      <div className="bg-[#E44B55] py-12">
        <Swiper
          breakpoints={{
            1024: {
              slidesPerView: 6,
            },
            768: {
              slidesPerView: 5,
            },
            640: {
              slidesPerView: 4,
            },
  
            0: {
              slidesPerView: 3,
            },
          }}
          spaceBetween={20}
          className="container mx-auto px-5 md:px-0 "
          navigation={false}
          modules={[Navigation]}
          effect="fade"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {brands.map((brand) => {
            const imageUrl = getUrl(brand.logo, "brands");

            return (
              <SwiperSlide key={brand.id} className="select-none">
                <Link href={`/brands/${brand.url}`}>
                <Image src={imageUrl} height={96} width={170} alt="" />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
