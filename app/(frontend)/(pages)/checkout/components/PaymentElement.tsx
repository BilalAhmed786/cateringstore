  "use client";

  import { useState } from "react";

  import {
    PaymentElement,
    useElements,
    useStripe,
  } from "@stripe/react-stripe-js";

  import { UniButton } from "@/app/(frontend)/components/reusables/button/button";

  export function PaymentElementForm() {
    const stripe = useStripe();

    const elements = useElements();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (
      e: React.FormEvent<HTMLFormElement>
    ) => {
      e.preventDefault();

      if (!stripe || !elements) return;

      setLoading(true);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/checkout/success`,
        },
      });

      setLoading(false);

      if (error) {
        alert(error.message);
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
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