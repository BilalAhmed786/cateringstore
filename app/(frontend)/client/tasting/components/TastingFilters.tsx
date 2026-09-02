"use client";

import { MenuItemDropdown } from "@/app/(frontend)/components/reusables/actiondropdown/actiondropdown";
import { BaseSearch } from "@/app/(frontend)/components/reusables/search/search";

import { TastingInquiryStatus } from "../types/type";

interface TastingFiltersProps {
  search: string;
  status: TastingInquiryStatus | "ALL";
  onSearchChange: (value: string) => void;
  onStatusChange: (value: TastingInquiryStatus | "ALL") => void;
}

const statusOptions: {
  label: string;
  value: TastingInquiryStatus | "ALL";
}[] = [
  {
    label: "All Requests",
    value: "ALL",
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
    label: "Completed",
    value: "COMPLETED",
  },
  {
    label: "Cancelled",
    value: "CANCELLED",
  },
];

export default function TastingFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: TastingFiltersProps) {
  const selectedStatus =
    statusOptions.find(
      (option) => option.value === status,
    )?.label ?? "All Requests";

  return (
    <div className="flex flex-wrap gap-4 justify-between">
      <BaseSearch
        label="Search"
        value={search}
        onChange={onSearchChange}
        placeholder="Search tasting requests..."
        className="w-3xl"
      />

      <div>
        <p className="mb-2 text-sm font-medium">
          Status
        </p>

        <MenuItemDropdown
          actions={statusOptions.map((option) => ({
            label: option.label,
            onClick: () =>
              onStatusChange(option.value),
          }))}
        />

        <p className="mt-2 text-sm text-muted-foreground">
          {selectedStatus}
        </p>
      </div>
    </div>
  );
}
