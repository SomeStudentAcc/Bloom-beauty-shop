import { useFavoriteBrandsStore } from "@/stores/favoriteBrands";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface Props {
  brand: string;
}

export default function BrandItem({ brand }: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const { favoriteBrands, toggleFavoriteBrand } = useFavoriteBrandsStore();

  useEffect(() => {
    if (favoriteBrands) {
      setIsLiked(favoriteBrands.includes(brand));
    }
  }, [brand, favoriteBrands]);

  const handleClick = () => {
    toggleFavoriteBrand(brand);
    setIsLiked((prev) => !prev); // update local state,t
  };

  return (
    <div className="flex items-center group relative">
      <div
        className={`absolute left-0 transition-opacity ${
          isLiked ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <Image
          onClick={handleClick}
          src={isLiked ? "/likeFilled.svg" : "/like.svg"}
          className="cursor-pointer"
          width={20}
          height={20}
          alt={isLiked ? "Liked" : "Like"}
        />
      </div>
      <Link href={`/brands/${brand}`} className="ml-10 group-hover:text-primary">{brand}</Link>
    </div>
  );
}
