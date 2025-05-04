"use client";
import { IGetBlog } from "@/types";
import { getUrl } from "@/utils";
import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../assets/BlogSwiper.css";

import { X } from "lucide-react";

interface Props {
  getBlog: IGetBlog;
}

export default function BlogImageGrid({ getBlog }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid md:grid-cols-4 gap-5 mb-14">
        {getBlog.images.map((image, index) => (
          <Image
            key={image.id}
            src={getUrl(image.file, "blog")}
            className="w-full cursor-pointer"
            width={1000}
            height={300}
            alt=""
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-5 right-5 text-white z-50"
          >
            <X size={32} />
          </button>

          <Swiper
            initialSlide={selectedIndex}
            navigation={true}
            loop={true}
            modules={[Navigation]}
            className="w-full md:w-[70%] max-w-3xl h-full flex justify-center "
          >
            {getBlog.images.map((image) => (
              <SwiperSlide className="h-full" key={image.id}>
                <div className="flex justify-center items-center h-full ">
                  <Image
                    src={getUrl(image.file, "blog")}
                    width={1000}
                    height={600}
                    className="h-[70vh] max-w-[400px] w-full  object-contain"
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}
