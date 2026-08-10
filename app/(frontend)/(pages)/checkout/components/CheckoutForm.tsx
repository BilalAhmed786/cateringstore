"use client";

import { FieldValues } from "react-hook-form";
import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";

interface CheckoutFormProps {
  onSubmit: (data: FieldValues) => void | Promise<void>;
}

export function CheckoutForm({ onSubmit }: CheckoutFormProps) {
   const fields: FieldConfig[] = [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "text",
      placeholder: "Enter your phone number",
    },
    {
      name: "notes",
      label: "Order Notes",
      type: "textarea",
      placeholder: "Any special instructions",
    },
  ];

  return (
    <DynamicShadcnForm
      fields={fields}
      cardTitle="Customer Details"
      cardDescription="Enter your contact information"
      defaultvalues={{
        fullName: "",
        email: "",
        phone: "",
        notes: "",
      }}
      showreset={false}
      reset="Reset"
      submitLabel="Proceed to Payment"
      onSubmit={onSubmit}
    />
  );
}