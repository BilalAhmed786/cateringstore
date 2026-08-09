"use client";

import { FieldValues } from "react-hook-form";
import { DynamicShadcnForm } from "@/app/(frontend)/components/reusables/dynamicform/dynamicform";
import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import { auth } from "@/app/(frontend)/lib/firebase/firebase";

interface CheckoutFormProps {
  onSubmit: (data: FieldValues) => void | Promise<void>;
}

export function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const user = auth.currentUser;

  const fields: FieldConfig[] = [
    {
      name: "userid",
      type: "hidden",
    },
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
        userid: user?.uid ?? null,
      }}
      showreset={false}
      reset="Reset"
      submitLabel="Proceed to Payment"
      onSubmit={onSubmit}
    />
  );
}