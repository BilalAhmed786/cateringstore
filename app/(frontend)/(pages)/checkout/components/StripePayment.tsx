"use client";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentElementForm } from "./PaymentElement";
import { StripePaymentProps } from "../types/type";


export function StripePayment({
  stripePromise,
  clientSecret,
}: StripePaymentProps) {
  if (!clientSecret) return null;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <PaymentElementForm />
    </Elements>
  );
}