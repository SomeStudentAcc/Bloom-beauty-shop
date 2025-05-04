"use client";

import ProductCard from "@/components/shared/ProductCard";
import { INewProduct } from "@/types";

interface Props {
  products: INewProduct[];
}

export default function CatalogProducts({ products }: Props) {
  return (
    <div className="grid gap-5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
