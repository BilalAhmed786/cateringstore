"use client";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { CartCollapse } from "../cart/cartcollapse";
import {
  useCartItems,
  useCartCount,
  useCartSubtotal,
} from "@/app/(frontend)/store/useCartStore";
import { useGetStoreSettings } from "@/app/(frontend)/admin/settings/store/hooks/useGetStoreSettings";

export function ShoppingCart() {
  const items = useCartItems();
  const totalItems = useCartCount();
  const subtotal = useCartSubtotal();
  const { data } = useGetStoreSettings();
  return (
    <div className="fixed top-4 right-4 z-50 h-4/5 overflow-auto  [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-400">
      <CartCollapse 
       itemsCount={totalItems}
       total={subtotal.toFixed(2)}
       currency={data?.store?.currency || ""}
       
       >
        <div className="space-y-4">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              currency={data?.store?.currency || ""

          }
            />
          ))}

          <CartSummary currency={data?.store?.currency || ""} />
        </div>
      </CartCollapse>
    </div>
  );
}
