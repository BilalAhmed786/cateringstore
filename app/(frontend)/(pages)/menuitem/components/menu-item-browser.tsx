"use client";

import { useState } from "react";

import { EntityFilters } from "@/app/(frontend)/components/reusables/filters/entityfilters";
import { EntityGrid } from "@/app/(frontend)/components/reusables/grid/entitygrid";
import { EntityCart } from "@/app/(frontend)/components/reusables/cart/entitycart";
import { useAllCategories } from "@/app/(frontend)/admin/menu-items/hooks/usegetallcategories";
import { useGetMenuItems } from "@/app/(frontend)/admin/menu-items/hooks/useGetMenuItems";

export function MenuItemBrowser() {
  // Filters
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  // Selected items
  const [selectedItems, setSelectedItems] = useState([]);

  const { data: menuItems = [], isLoading } = useGetMenuItems({
    category,
    search,
    sort,
  });

  const { data: categories = [] } = useAllCategories();

  const handleSelect = (item) => {
    setSelectedItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);

      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? {
                ...i,
                quantity: i.quantity + 1,
              }
            : i
        );
      }

      return [
        ...prev,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  };

  return (
    <div className="space-y-8">

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
          {
            key: "sort",
            label: "Price",
            value: sort,
            onChange: setSort,
            options: [
              {
                label: "Low → High",
                value: "asc",
              },
              {
                label: "High → Low",
                value: "desc",
              },
            ],
          },
        ]}
        search={{
          value: search,
          onChange: setSearch,
          placeholder: "Search menu items...",
        }}
      />

      <div className="grid lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2">

          <EntityGrid
            items={menuItems}
            isLoading={isLoading}
            onSelect={handleSelect}
          />

        </div>

        <EntityCart
          title="Selected Menu Items"
          items={selectedItems}
          onChange={setSelectedItems}
        />

      </div>
    </div>
  );
}