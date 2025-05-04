"use client";
import ProductCard from "@/components/shared/ProductCard";
import { useGetProductsStore } from "@/stores/getProducts";
import { getFavorites } from "@/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function FavoriteGrid() {
  const [favorites, setFavorites] = useState<{ id: string }[]>([]);
  const { allProducts } = useGetProductsStore();
  const { favoriteProducts, setFavoriteProducts } = useGetProductsStore();

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  useEffect(() => {
    if (favorites && allProducts) {
      const filteredProducts = allProducts.filter((product) =>
        favorites.some((fav) => fav.id === product.id)
      );
      setFavoriteProducts(filteredProducts);
    }
  }, [favorites, allProducts, setFavoriteProducts]);

  return (
    <>
      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h4 className="text-3xl mb-2">Пока ничего нет!</h4>
          <p className="mb-8">Добавляйте товары</p>
            <Link href={'/'} className="text-lg  max-w-[14rem] w-full py-4 border flex justify-center">
              На главную
            </Link>
        </div>
      )}
    </>
  );
}
