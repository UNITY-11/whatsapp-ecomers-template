import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";
import { getCartLineId } from "@/lib/dress-variants";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity" | "cartLineId"> & { quantity?: number }) => void;
  removeItem: (cartLineId: string) => void;
  updateQuantity: (cartLineId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        const cartLineId = getCartLineId(item.productId, item.size, item.color);
        set((state) => {
          const existing = state.items.find((i) => i.cartLineId === cartLineId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.cartLineId === cartLineId
                  ? { ...i, quantity: Math.min(i.quantity + (item.quantity || 1), i.stock) }
                  : i
              ),
            };
          }
          return {
            items: [...state.items, { ...item, cartLineId, quantity: item.quantity || 1 }],
          };
        });
      },
      removeItem: (cartLineId) => {
        set((state) => ({ items: state.items.filter((i) => i.cartLineId !== cartLineId) }));
      },
      updateQuantity: (cartLineId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartLineId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.cartLineId === cartLineId ? { ...i, quantity: Math.min(quantity, i.stock) } : i
          ),
        }));
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      setCartOpen: (open) => set({ isOpen: open }),
      getTotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "calira-couture-cart" }
  )
);
