import { INewProduct } from "@/types";
import { create } from "zustand";

interface IGetProductsStore {
  allProducts: INewProduct[];
  favoriteProducts: INewProduct[]
  setAllProducts: (entity: INewProduct[]) => void;
  setFavoriteProducts:(entity: INewProduct[]) => void;
}

export const useGetProductsStore = create<IGetProductsStore>((set) => ({
  allProducts: [],
  favoriteProducts: [],
  setAllProducts: (entity) => set(() => ({ allProducts: entity })),
  setFavoriteProducts: (entity) => set(() => ({ favoriteProducts: entity })),
}));
