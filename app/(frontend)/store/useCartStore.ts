"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartStore } from "./types/type";

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? {
                      ...i,
                      quantity: i.quantity + 1,
                    }
                  : i
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...item,
                quantity: 1,
              },
            ],
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      increase: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id
              ? {
                  ...i,
                  quantity: i.quantity + 1,
                }
              : i
          ),
        })),

      decrease: (id) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              i.id === id
                ? {
                    ...i,
                    quantity: i.quantity - 1,
                  }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => ({
        items: [],
      }),
    }),
    {
      name: "shopping-cart",
    }
  )
);


//usefull function use anywhere
export const useCartItems = () =>
  useCartStore((state) => state.items);

export const useCartCount = () =>
  useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );

export const useCartSubtotal = () =>
  useCartStore((state) =>
    state.items.reduce(
      (sum, item) =>
        sum + (item.price ?? item.finalPrice ?? 0) * item.quantity,
      0
    )
  );