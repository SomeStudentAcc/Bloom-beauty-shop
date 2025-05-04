import NewProductsCatalogContainer from "@/app/new-products/NewProductsCatalogContainer";
import React from "react";

export default function BrandCatalog({
  params: { brand },
}: {
  params: { brand: string };
}) {
  return (
    <div className="container mx-auto px-5 md:px-0 py-20">
      <NewProductsCatalogContainer brand={brand} />
    </div>
  );
}
