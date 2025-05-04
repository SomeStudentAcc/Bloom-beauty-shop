"use client";
import { useGetProductsStore } from "@/stores/getProducts";
import { INewProduct, IProductSingle } from "@/types";
import { getFavorites } from "@/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Props {
  product: INewProduct | IProductSingle;
}

export default function ProductCardLikeBtn({ product }: Props) {
  const [isLiked, setIsLiked] = useState(false);
    const {favoriteProducts, setFavoriteProducts} = useGetProductsStore()
  

  const saveFavorites = (favorites: { id: string }[]) => {
    localStorage.setItem("b_favorites", JSON.stringify(favorites));
  };

  const addToFav = (product: INewProduct | IProductSingle) => {
    const favorites = getFavorites();
    const exists = favorites.some((fav) => fav.id === product.id);
    if (!exists) {
      const newFavorites = [...favorites, { id: product.id }];
      saveFavorites(newFavorites);
    }
  };

  const removeFromFav = (product: INewProduct | IProductSingle) => {
    const favorites = getFavorites();
    const filtered = favorites.filter((fav) => fav.id !== product.id);
    const filteredFavorites = favoriteProducts.filter(el=> el.id !== product.id)
    setFavoriteProducts(filteredFavorites)
    saveFavorites(filtered);
  };

  useEffect(() => {
    if (product) {
      const favorites = getFavorites();
      const liked = favorites.some((fav) => fav.id === product.id);
      setIsLiked(liked);
    }
  }, [product]);

  return (
    <>
      {isLiked ? (
        <Image
          onClick={() => {
            setIsLiked(false);
            removeFromFav(product);
          }}
          src={"/likeFilled.svg"}
          className="z-10"
          width={20}
          height={20}
          alt=""
        />
      ) : (
        <Image
          onClick={() => {
            setIsLiked(true);
            addToFav(product);
          }}
          src={"/like.svg"}
          className="z-10"
          width={20}
          height={20}
          alt=""
        />
      )}
    </>
  );
}
