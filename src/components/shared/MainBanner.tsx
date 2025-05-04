"use client";
import { ISlider } from "@/types";
import React from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { getUrl } from "@/utils";
import "../../app/assets/MainBanner.css";

interface Props {
  sliders: ISlider[];
}

export default function MainBanner({ sliders }: Props) {
  return (
    <div className="mb-12 lg:mb-20">
      <Swiper
        slidesPerView={1}
        loop={true}
       autoplay={{ delay: 3000 }}

        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Navigation, Pagination]}
        effect="fade"
      >
        {sliders.map((el, index) => {
          const desktopImage = getUrl(el.image, "sliders");
          const mobileImage = getUrl(el.mobile_image, "sliders");

          return (
            <SwiperSlide key={`slide${index}`} className="select-none">
              <div className="relative w-full min-h-[350px]">
                {/* Desktop Image */}
                <div className="hidden lg:block w-full h-full">
                  <Image
                    src={desktopImage}
                    alt={`Slider ${index + 1}`}
                    width={1000}
                    height={1000}
                    priority
                    className="object-contain w-full h-full"
                  />
                </div>

                {/* Mobile Image */}
                <div className="block lg:hidden w-full h-full">
                  <Image
                    src={mobileImage}
                    alt={`Slider Mobile ${index + 1}`}
                    width={1000}
                    height={1000}
                    priority
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
