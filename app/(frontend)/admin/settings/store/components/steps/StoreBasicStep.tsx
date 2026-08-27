"use client";

import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import { FormField } from "@/app/(frontend)/components/reusables/fields/fieldscase";

const fields: FieldConfig[] = [
  {
    name: "name",
    label: "Store Name",
    type: "text",
    required: true,
    className:"mt-5"
  },
  { 
    name: "description",
    label: "Store Description",
    type: "textarea",
    required: false,
    className:"mt-5"
  },
];

export default function StoreBasicStep() {
  return (
    <div className="space-y-5">
      {fields.map((field) => (
        <FormField key={field.name} field={field} />
      ))}
    </div>
  );
}