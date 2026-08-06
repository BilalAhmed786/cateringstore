"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Loader2 } from "lucide-react";
import { useCartStore } from "@/app/(frontend)/store/useCartStore";

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      clearCart();
      setProcessing(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [clearCart]);

  if (processing) {
    return (
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
        <div className="max-w-md rounded-xl border p-8 text-center shadow">
          <Loader2 className="mx-auto mb-4 h-16 w-16 animate-spin" />

          <h1 className="mb-3 text-3xl font-bold">
            Processing Your Order
          </h1>

          <p className="text-muted-foreground">
            Your payment was received successfully.
            <br />
            We are confirming your order...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md rounded-xl border p-8 text-center shadow">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-600" />

        <h1 className="mb-3 text-3xl font-bold">
          Payment Successful
        </h1>

        <p className="mb-6 text-muted-foreground">
          Thank you! Your payment has been received successfully.
          We are now preparing your order.
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="block rounded-lg bg-black px-5 py-3 text-center text-white"
          >
            Continue Shopping
          </Link>

          <Link
            href="/orders"
            className="block rounded-lg border px-5 py-3 text-center"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}