"use client";

import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import { FormField } from "@/app/(frontend)/components/reusables/fields/fieldscase";

interface StoreBasicStepProps {
  logo?: string;
}

export default function StoreBasicStep({
  logo,
}: StoreBasicStepProps) {
  const fields: FieldConfig[] = [
    {
      name: "name",
      label: "Store Name",
      type: "text",
      required: true,
      className: "mt-5",
    },
    {
      name: "file",
      label: "Store Logo",
      type: "file",
      required: false,
      className: "relative",
    },
    {
      name: "logo",
      label: "Current Store Logo",
      type: "imagepreview",
      image: logo,
    },
    {
      name: "description",
      label: "Store Description",
      type: "textarea",
      required: false,
      className: "mt-5",
    },
  ];

  return (
    <div className="space-y-5">
      {fields.map((field) => (
        <FormField
          key={field.name}
          field={field}
        />
      ))}
    </div>
  );
}