"use client";

import { EntityFilters } from "@/app/(frontend)/components/reusables/filters/entityfilters";
import { OrderStatus } from "@prisma/client";

interface OrderFiltersProps {
  status: OrderStatus | "all";
  onStatusChange: (
    value: OrderStatus | "all"
  ) => void;
}

const statusOptions = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "Confirmed",
    value: "CONFIRMED",
  },
  {
    label: "Preparing",
    value: "COOKING",
  },
  {
    label: "Delivered",
    value: "DELIVERED",
  },
  {
    label: "Cancelled",
    value: "CANCELLED",
  },
];

export default function OrderFilters({
  status,
  onStatusChange,
}: OrderFiltersProps) {
  return (
    <EntityFilters
      filters={[
        {
          key: "status",
          label: "Status",
          value: status,
          onChange: (value) =>
            onStatusChange(
              value as OrderStatus | "all"
            ),
          options: statusOptions,
        },
      ]}
    />
  );
}