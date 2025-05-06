import React from "react";
import NewProductsCatalogContainer from "./NewProductsCatalogContainer";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'New Products'
};

const scrums = [
  {
    url: "/",
    label: "Главная",
  },
  {
    url: "",
    label: 'Новинки',
  },
];

export default function NewProductsCatalog() {
  return (
    <div className="container mx-auto px-5 md:px-0 py-20">
      <Breadcrumbs items={scrums}/>
      <NewProductsCatalogContainer/>
    </div>
  );
}
