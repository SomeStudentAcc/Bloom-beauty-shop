import axiosInstance from "@/axios";
import { IGetBlog } from "@/types";
import React from "react";
import BlogDescription from "../BlogDescription";
import BlogImageGrid from "../BlogImageGrid";

export default async function BlogSingle({
  params: { url },
}: {
  params: { url: string };
}) {
  const res = await axiosInstance.get("/get-blog", {
    params: {
      url: url,
    },
  });
  const getBlog: IGetBlog = res.data;
  return (
    <div className="container mx-auto px-5 md:px-0 mb-12 lg:mb-20 py-10">
      <h2 className="mb-10 text-xl  md:text-3xl">{getBlog.blog.title_ru}</h2>
      <BlogImageGrid getBlog={getBlog}/>
      <BlogDescription blog={getBlog.blog} />
    </div>
  );
}
