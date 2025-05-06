import React from "react";
import BrandCatalogContainer from "./BrandCatalogContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Brands'
};

export default function BrandCatalog({
  params: { brand },
}: {
  params: { brand: string };
}) {
  return (
    <div className="container mx-auto px-5 md:px-0 py-20">
      <BrandCatalogContainer brand={brand} />
    </div>
  );
}
