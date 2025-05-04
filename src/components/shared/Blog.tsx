"use client";
import React, { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type SwiperType from "swiper";
import Image from "next/image";
import { IBlog } from "@/types";
import BlogCard from "./BlogCard";

interface Props {
  blogs: IBlog[];
  title: string;
}

export default function Blog({ blogs, title }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="container mx-auto px-5 md:px-0 mb-12 lg:mb-20">
      <div className="relative flex  lg:justify-center">
        <h2 className="mb-10  text-3xl">{title}</h2>

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
        breakpoints={{
          1280: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 2.5,
          },
          768: {
            slidesPerView: 1.5,
          },

          0: {
            slidesPerView: 1.1,
          },
        }}
        spaceBetween={20}
        navigation={false}
        modules={[Navigation]}
        effect="fade"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog.id} className="select-none">
            <div className="max-w-[460px] min-h-[200px] ">
              <BlogCard blog={blog} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
