// stores/favoriteBrands.ts
import { create } from "zustand";

interface IFavoriteBrandsStore {
  favoriteBrands: string[];
  setFavoriteBrands: (brands: string[]) => void;
  toggleFavoriteBrand: (brand: string) => void;
}

export const useFavoriteBrandsStore = create<IFavoriteBrandsStore>((set) => ({
  favoriteBrands: [],
  setFavoriteBrands: (brands) => {
    localStorage.setItem("b_brands", JSON.stringify(brands));
    set({ favoriteBrands: brands });
  },
  toggleFavoriteBrand: (brand) =>
    set((state) => {
      const exists = state.favoriteBrands.includes(brand);
      const updated = exists
        ? state.favoriteBrands.filter((b) => b !== brand)
        : [...state.favoriteBrands, brand];

      localStorage.setItem("b_brands", JSON.stringify(updated));
      return { favoriteBrands: updated };
    }),
}));
