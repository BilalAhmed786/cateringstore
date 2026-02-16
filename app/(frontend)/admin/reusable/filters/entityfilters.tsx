"use client";

import { BaseSelect } from "@/app/(frontend)/components/reusables/filters/filterselect";
import { BaseSearch } from "@/app/(frontend)/components/reusables/search/search";
import { EntityFiltersProps } from "./filtertypes";




export function EntityFilters({ filters, search }: EntityFiltersProps) {
  return (
    <div className="flex flex-wrap items-end gap-6">
      {filters.map((filter) => (
        <BaseSelect
          key={filter.key}
          label={filter.label}
          value={filter.value}
          onChange={filter.onChange}
          options={filter.options}
        />
      ))}

      {search && (
        <BaseSearch
          label="Search"
          value={search.value}
          onChange={search.onChange}
          placeholder={search.placeholder ?? "Search..."}
        />
      )}
    </div>
  );
}
