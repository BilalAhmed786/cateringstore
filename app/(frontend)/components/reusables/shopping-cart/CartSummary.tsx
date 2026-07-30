"use client";
import { useCartSubtotal } from "@/app/(frontend)/store/useCartStore";
import { UniButton } from "../button/button";
import Link from "next/link";

export function CartSummary() {
  const subtotal = useCartSubtotal();

  return (
    <div className="border-t pt-4 space-y-4">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>Rs {subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between">
        <span>Delivery</span>
        <span>Free</span>
      </div>

      <div className="flex justify-between font-semibold text-lg">
        <span>Total</span>
        <span>Rs {subtotal.toFixed(2)}</span>
      </div>
      <Link href={"/checkout"}>
        <UniButton
          label="Proceed to Checkout"
          className="w-full cursor-pointer"
        />
      </Link>
    </div>
  );
}
