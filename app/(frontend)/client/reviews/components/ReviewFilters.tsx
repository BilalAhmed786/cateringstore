"use client";

import { MenuItemDropdown } from "@/app/(frontend)/components/reusables/actiondropdown/actiondropdown";
import { BaseSearch } from "@/app/(frontend)/components/reusables/search/search";
import {
  GetMyReviewsParams,
  ReviewType,
} from "../types/type";

interface ReviewFiltersProps {
  search: string;
  type: GetMyReviewsParams["type"];
  onSearchChange: (value: string) => void;
  onTypeChange: (value: ReviewType | "ALL") => void;
}

const reviewTypes: {
  label: string;
  value: ReviewType | "ALL";
}[] = [
  { label: "All Reviews", value: "ALL" },
  { label: "Menu Items", value: "MENU" },
  { label: "Packages", value: "PACKAGE" },
  { label: "Events", value: "EVENT" },
  { label: "Hampers", value: "HAMPER" },
];

export default function ReviewFilters({
  search,
  type,
  onSearchChange,
  onTypeChange,
}: ReviewFiltersProps) {
  const selectedType =
    reviewTypes.find((item) => item.value === type)?.label ??
    "All Reviews";

  return (
    <div className="flex flex-wrap gap-3 justify-between">
      <BaseSearch
        label="Search"
        value={search}
        onChange={onSearchChange}
        placeholder="Search reviews..."
        className="w-2xl"
      />

      <div>
        <p className="mb-2 text-sm font-medium">
          Review Type
        </p>

        <MenuItemDropdown
          actions={reviewTypes.map((item) => ({
            label: item.label,
            onClick: () => onTypeChange(item.value),
          }))}
        />

        <p className="mt-2 text-sm text-muted-foreground">
          {selectedType}
        </p>
      </div>
    </div>
  );
}