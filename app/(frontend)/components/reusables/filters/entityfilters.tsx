"use client";

import { BaseSelect } from "@/app/(frontend)/components/reusables/filters/filterselect";
import { BaseSearch } from "@/app/(frontend)/components/reusables/search/search";
import { EntityFiltersProps } from "./filtertypes";

export function EntityFilters({ filters, search }: EntityFiltersProps) {
  return (
    <div>
      <div className="flex space-y-5 gap-5">
        {filters?.map((filter) => (
          <BaseSelect
            key={filter.key}
            label={filter.label}
            value={filter.value}
            onChange={filter.onChange}
            options={filter.options}
          />
        ))}
      </div>
      <div className={search?.classname}>
        {search && (
          <BaseSearch
            label="Search"
            value={search.value}
            onChange={search.onChange}
            placeholder={search.placeholder ?? "Search..."}
            className={search.classname}
          />
        )}
      </div>
    </div>
  );
}
