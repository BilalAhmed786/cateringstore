"use client";

import { useState } from "react";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import router from "next/router";

export function PaymentElementForm() {
  const stripe = useStripe();

  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements || loading) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
    });

    setLoading(false);

    // This runs only if Stripe couldn't start or confirm the payment.
    if (error) {
      router.push(
        `/checkout/failed?message=${encodeURIComponent(
          error.message ?? "Payment failed.",
        )}`,
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      <UniButton
        type="submit"
        label="Pay Now"
        loading={loading}
        className="w-full"
      />
    </form>
  );
}
