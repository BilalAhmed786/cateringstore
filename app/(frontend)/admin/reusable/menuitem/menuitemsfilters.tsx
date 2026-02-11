
import { BaseSelect } from "@/app/(frontend)/components/reusables/filters/filterselect";
import { BaseSearch } from "@/app/(frontend)/components/reusables/search/search";
import { MenuItemsFiltersProps } from "../types/type";


export function MenuItemsFilters({
  status,
  category,
  dateFilter,
  search,
  categories,
  onStatusChange,
  onCategoryChange,
  onDateChange,
  onSearchChange,
}: MenuItemsFiltersProps) {
  return (
    <div className="flex flex-wrap gap-7 items-center">
      <BaseSelect
        label="Status"
        value={status}
        onChange={onStatusChange}
        options={[
          { label: "All", value: "all" },
          { label: "Active", value: "true" },
          { label: "Inactive", value: "false" },
        ]}
      />

      <BaseSelect
        label="Category"
        value={category}
        onChange={onCategoryChange}
        options={[
          { label: "All", value: "all" },
          ...categories.map((c) => ({
            label: c.name,
            value: c.id,
          })),
        ]}
      />

      <BaseSelect
        label="Date"
        value={dateFilter}
        onChange={onDateChange}
        options={[
          { label: "All", value: "all" },
          { label: "Past 7 Days", value: "past7" },
        ]}
      />

      <BaseSearch
        label="Search"
        value={search}
        onChange={onSearchChange}
        placeholder="Search by title..."
      />
    </div>
  );
}
