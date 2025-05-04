"use client";
import { IBlogSingle } from "@/types";
import React, { useEffect, useState } from "react";

interface Props {
  blog: IBlogSingle;
}

export default function BlogDescription({ blog }: Props) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    setHtml(blog.description_ru || "");
  }, [blog.description_ru]);

  return (
    <p
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
