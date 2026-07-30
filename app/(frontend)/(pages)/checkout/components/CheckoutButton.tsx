"use client";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";

interface CheckoutButtonProps {
  loading?: boolean;
  onClick?: () => void;
}


export function CheckoutButton({
  loading = false,
  onClick,
}: CheckoutButtonProps) {

  return (
    <UniButton
      type="button"
      className="w-full"
      loading={loading}
      onClick={onClick}
      label="Proceed to Payment"
    />
  );
}