"use client";

import { useState } from "react";

import { FieldValues } from "react-hook-form";

import { useCartStore } from "@/app/(frontend)/store/useCartStore";

import { useStripePayment } from "./useStripePayment";

export function useCheckout() {
  const {
    stripePromise,
    clientSecret,
    loading,
    error,
    createPaymentIntent,
  } = useStripePayment();

  const { items } = useCartStore();

  const [customer, setCustomer] = useState<FieldValues | null>(null);

  async function handleCheckout(
    data: FieldValues
  ) {
    setCustomer(data);

    await createPaymentIntent({
      customer: data,
      items,
    });
  }

  return {
    customer,
    clientSecret,
    stripePromise,
    loading,
    error,
    handleCheckout,
  };
}