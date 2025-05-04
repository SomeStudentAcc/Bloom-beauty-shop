import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  amount: number;
}

interface ICartStore {
  cart: CartItem[];
  addToCart: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<ICartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (id) => {
        const cart = get().cart;
        const item = cart.find((item) => item.id === id);

        if (item) {
          set({
            cart: cart.map((i) =>
              i.id === id ? { ...i, amount: i.amount + 1 } : i
            ),
          });
        } else {
          set({ cart: [...cart, { id, amount: 1 }] });
        }
      },

      increase: (id) => {
        set({
          cart: get().cart.map((item) =>
            item.id === id ? { ...item, amount: item.amount + 1 } : item
          ),
        });
      },

      decrease: (id) => {
        const updatedCart = get().cart
          .map((item) =>
            item.id === id ? { ...item, amount: item.amount - 1 } : item
          )
          .filter((item) => item.amount > 0);
        set({ cart: updatedCart });
      },

      removeFromCart: (id) => {
        set({
          cart: get().cart.filter((item) => item.id !== id),
        });
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "b_cart", // name in localStorage
    }
  )
);
