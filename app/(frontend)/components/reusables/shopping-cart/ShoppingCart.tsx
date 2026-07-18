"use client";

import { createPortal } from "react-dom";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { CartCollapse } from "../cart/cartcollapse";
import {
  useCartItems,
  useCartCount,
  useCartSubtotal,
} from "@/app/(frontend)/store/useCartStore";

export function ShoppingCart() {
  
  const items = useCartItems();
  const totalItems = useCartCount();
  const subtotal = useCartSubtotal();

  

  return createPortal(
    <div className="fixed top-4 right-4 z-50 h-4/5 overflow-auto">
      <CartCollapse
        itemsCount={totalItems}
        total={subtotal}
      >
        <div className="space-y-4">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
            />
          ))}

          <CartSummary />
        </div>
      </CartCollapse>
    </div>,
    document.body
  );
}