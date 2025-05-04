import axiosInstance from "@/axios";
import BlogCard from "@/components/shared/BlogCard";
import { IGetData } from "@/types";
import React from "react";

export default async function Blog() {
  const res = await axiosInstance.get("/get-data/");
  const getData: IGetData = res.data;
  return (
    <div className="container mx-auto px-5 md:px-0 mb-12 lg:mb-20 py-10">
      <h2 className="mb-10  text-3xl">Блог</h2>
      <div className="grid grid-cols-3 gap-5">
        {getData.blogs.map((blog) => (
          <div key={blog.id} className="select-none">
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
}
