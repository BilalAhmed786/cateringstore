"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartStore } from "./types/type";

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],

      addItem: (item, type) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);

          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? {
                      ...i,
                      quantity: i.quantity + 1,
                      type,
                    }
                  : i,
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...item,
                quantity: 1,
                type,
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
              : i,
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
                : i,
            )
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () =>
        set({
          items: [],
        }),

      addCustomizedPackage: (packageData, selectedItems, totalPrice) =>
        set((state) => {
          // Find existing package in cart
          const existing = state.items.find(
            (item) => item?.id === packageData?.id,
          );

          return {
            items: [
              // Remove previous version if pacakge is selected without customize vicecersa
              ...state.items.filter((item) => item.id !== packageData.id),

              // Add customized version
              {
                ...packageData,

                quantity: existing?.quantity ?? 1,

                type: "package",

                selectedItems,

                finalPrice: totalPrice,
              },
            ],
          };
        }),
    }),
    {
      name: "shopping-cart",
    },
  ),
);

// Useful selectors

export const useCartItems = () => useCartStore((state) => state.items);
export const useCartCount = () =>
  useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

export const useCartSubtotal = () =>
  useCartStore((state) =>
    state.items.reduce(
      (sum, item) => sum + (item.finalPrice || item.price || 0) * item.quantity,
      0,
    ),
  );
