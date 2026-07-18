"use client";
import { useCartSubtotal } from "@/app/(frontend)/store/useCartStore";
import { UniButton } from "../button/button";

export function CartSummary() {
  const subtotal = useCartSubtotal();

  return (
    <div className="border-t pt-4 space-y-4">

      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>Rs {subtotal}</span>
      </div>

      <div className="flex justify-between">
        <span>Delivery</span>
        <span>Free</span>
      </div>

      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>Rs {subtotal}</span>
      </div>

      <UniButton
        label="Proceed to Checkout"
        className="w-full"
      />

    </div>
  );
}