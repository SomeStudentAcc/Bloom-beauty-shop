import { create } from "zustand";

interface IHeaderStore {
  isAuthModal: boolean;
  toggleAuthModal: (entity: boolean) => void;
}

export const useHeaderStore = create<IHeaderStore>((set) => ({
  isAuthModal: false,

  toggleAuthModal: () => set((state) => ({ isAuthModal: !state.isAuthModal })),
}));
