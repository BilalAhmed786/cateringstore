"use client";

import { CheckoutForm } from "./components/CheckoutForm";
import { OrderSummary } from "./components/OrderSummary";
import { StripePayment } from "./components/StripePayment";
import { useCheckout } from "./hooks/useCheckout";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Checkout", 
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutPage() {
 
  const { handleCheckout, clientSecret, stripePromise, loading, error } = useCheckout();

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">
        Checkout
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left */}
        <div className="space-y-6 lg:col-span-2">
          <CheckoutForm
            onSubmit={handleCheckout}
          />

          {loading && (
            <p>Preparing secure payment...</p>
          )}

          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}

          {clientSecret && (
            <StripePayment
              stripePromise={stripePromise}
              clientSecret={clientSecret}
            />
          )}
        </div>

        {/* Right */}
        <OrderSummary />
      </div>
    </div>
  );
}