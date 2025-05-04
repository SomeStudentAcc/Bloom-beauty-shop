"use client";
import { IBlog } from "@/types";
import { getLocalizedDate, getUrl } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
interface Props {
  blog: IBlog;
}

export default function BlogCard({ blog }: Props) {
  const bgImage = getUrl(blog.image, "blog");
  const [html, setHtml] = useState("");
  const { day, month } = getLocalizedDate(blog.date, "ru");

  useEffect(() => {
    setHtml(blog.description_ru);
  }, [blog.description_ru]);
  return (
    <Link href={`/blog/${blog.url}`}>
      <div className="relative w-full  text-white ">
        <Image
          src={bgImage}
          width={3000}
          height={3000}
          priority
          className="w-full h-full"
          alt=""
        />
        <div className="absolute left-0 top-0 max-w-[250px] lg:max-w-[320px] w-full p-3 lg:p-5">
          <h4 className="text-xl font-semibold line-clamp-1">
            {blog.title_ru}
          </h4>
          <p
            className="line-clamp-1 text-sm"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
        <div className="bg-primary w-[40px] h-[40px] lg:w-[80px] lg:h-[80px] absolute right-0 top-0 mr-3 lg:mr-5 flex flex-col justify-center items-center">
          <span className="text-xl lg:text-3xl  font-semibold">{day}</span>
          <span className="text-[8px] lg:text-sm">{month}</span>
        </div>
      </div>
    </Link>
  );
}
