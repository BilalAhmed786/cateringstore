"use client";

import { FieldConfig } from "@/app/(frontend)/components/reusables/types/types";
import { FormField } from "@/app/(frontend)/components/reusables/fields/fieldscase";

import { currencyOptions } from "@/app/(frontend)/components/reusables/constants/currencies";
import { timezoneOptions } from "@/app/(frontend)/components/reusables/constants/timezones";

const fields: FieldConfig[] = [
  {
    name: "currency",
    label: "Currency",
    type: "select",
    required: true,
    options: currencyOptions,
  },

  {
    name: "timezone",
    label: "Timezone",
    type: "select",
    required: true,
    options: timezoneOptions,
  },

  {
    name: "storeStatus",
    label: "Store Status",
    type: "select",
    required: true,
    options: [
      {
        label: "Open",
        value: "OPEN",
      },
      {
        label: "Closed",
        value: "CLOSED",
      },
    ],
  },

  {
    name: "maintenanceMessage",
    label: "Maintenance Message",
    type: "textarea",
    required: false,
    className: "mt-5",
  },
];

export default function StoreConfigurationStep() {
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