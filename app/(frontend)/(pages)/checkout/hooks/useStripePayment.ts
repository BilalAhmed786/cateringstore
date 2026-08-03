"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { FieldValues } from "react-hook-form";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { CreatePaymentIntentResponse } from "../types/type";
import { CartItem } from "@/app/(frontend)/components/reusables/types/types";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface CreatePaymentIntentPayload {
  customer: FieldValues;
  items: CartItem[];
}

export function useStripePayment() {
  const [clientSecret, setClientSecret] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function createPaymentIntent({
    customer,
    items,
  }: CreatePaymentIntentPayload) {
    try {
      setLoading(true);

      setError("");

      const response =
        await apiRequest<CreatePaymentIntentResponse>({
          url: "/api/payment/create-intent",
          method: "POST",
          body: {
            customer,
            items,
          },
        });

      setClientSecret(response.clientSecret);

      return response.clientSecret;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to initialize payment."
      );

      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    stripePromise,
    clientSecret,
    loading,
    error,
    createPaymentIntent,
  };
}