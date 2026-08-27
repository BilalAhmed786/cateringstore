"use client";

import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import { FormField } from "@/app/(frontend)/components/reusables/fields/fieldscase";

const fields: FieldConfig[] = [
  {
    name: "email",
    label: "Store Email",
    type: "email",
    required: true,
    className:"mt-5"
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    required: false,
    className:"mt-5"
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    required: false,
    className:"mt-5"
  },
  {
    name: "city",
    label: "City",
    type: "text",
    required: false,
    className:"mt-5"
  },
  {
    name: "website",
    label: "Website",
    type: "text",
    required: false,
    className:"mt-5"
  },
];

export default function StoreContactStep() {
  return (
    <div className="space-y-5">
      {fields.map((field) => (
        <FormField key={field.name} field={field} />
      ))}
    </div>
  );
}