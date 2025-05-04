import {  IDistrict, IRegion } from "@/types";
import { create } from "zustand";

interface IGetProductsStore {
  isExpress: number;
  selectedRegion: IRegion;
  selectedDistrict: IDistrict;
  setIsExpress: (entity: number) => void;
  setSelectedRegion: (entity: IRegion) => void;
  setSelectedDistrict: (entity:IDistrict) => void;
}

export const useCheckoutStore = create<IGetProductsStore>((set) => ({
  selectedRegion: {},
  setSelectedRegion: (entity) => set(() => ({ selectedRegion: entity })),
  selectedDistrict: {},
  setSelectedDistrict: (entity) => set(() => ({ selectedDistrict: entity })),
  isExpress: 0,
  setIsExpress: (entity) => set(() => ({ isExpress: entity })),
}));
