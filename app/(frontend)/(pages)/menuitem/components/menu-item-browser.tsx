"use client";

import { useState } from "react";

import { EntityFilters } from "@/app/(frontend)/components/reusables/filters/entityfilters";
import { PriceFilter } from "@/app/(frontend)/components/reusables/filters/pricefilter";
import { StorefrontGrid } from "@/app/(frontend)/components/reusables/storefront-grid/StorefrontGrid";
import { ShoppingCart } from "@/app/(frontend)/components/reusables/shopping-cart/ShoppingCart";

import { useAllCategories } from "@/app/(frontend)/admin/menu-items/hooks/usegetallcategories";
import { useGetMenuItems } from "@/app/(frontend)/admin/menu-items/hooks/useGetMenuItems";
import { useDebounce } from "@/app/(frontend)/components/reusables/hooks/useDebounce";

export function MenuItemBrowser() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading } = useGetMenuItems({
    category,
    search: debouncedSearch,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
  });

  const menuItems = data?.items ?? [];

  const { data: categories = [] } = useAllCategories();

  return (
    <div className="pt-28 space-y-8">
      {/* Filters */}
      <div className="flex flex-col items-center space-y-8">
        <div className="flex w-full flex-col justify-center gap-10 px-5 lg:flex-row">
          <EntityFilters
            filters={[
              {
                key: "category",
                label: "Category",
                value: category,
                onChange: setCategory,
                options: [
                  {
                    label: "All",
                    value: "all",
                  },
                  ...categories.map((category) => ({
                    label: category.name,
                    value: category.id,
                  })),
                ],
              },
            ]}
          />

          <div className="w-full max-w-xs">
            <PriceFilter
              value={priceRange}
              onChange={setPriceRange}
              min={0}
              max={5000}
              step={100}
            />
          </div>
        </div>

        <EntityFilters
          search={{
            value: search,
            onChange: setSearch,
            placeholder: "Search menu items...",
            classname: "lg:w-5xl sm:w-xl",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative mx-7">
        <StorefrontGrid items={menuItems} isLoading={isLoading} />
      </div>
      <div>
        <ShoppingCart />
      </div>
    </div>
  );
}
