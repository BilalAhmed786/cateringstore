"use client";

import { useEffect, useState } from "react";
import { EntityFilters } from "@/app/(frontend)/components/reusables/filters/entityfilters";
import { PriceFilter } from "@/app/(frontend)/components/reusables/filters/pricefilter";
import { StorefrontGrid } from "@/app/(frontend)/components/reusables/storefront-grid/StorefrontGrid";
import { ShoppingCart } from "@/app/(frontend)/components/reusables/shopping-cart/ShoppingCart";
import { useAllCategories } from "@/app/(frontend)/admin/menu-items/hooks/usegetallcategories";
import { useGetMenuItems } from "@/app/(frontend)/admin/menu-items/hooks/useGetMenuItems";
import { useDebounce } from "@/app/(frontend)/components/reusables/hooks/useDebounce";
import { ProductDetailsSheet } from "@/app/(frontend)/components/reusables/storefront-grid/ProductDetailsSheet";
import { useInfiniteScroll } from "@/app/(frontend)/components/reusables/hooks/useInfiniteScroll";
import { GridItem } from "@/app/(frontend)/components/reusables/grid/gridtypes";

export function MenuItemBrowser() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<GridItem[]>([]);
  const debouncedSearch = useDebounce(search, 500);
  const debouncedPriceRange = useDebounce(priceRange, 500);
  const { data, isLoading, isFetching } = useGetMenuItems({
    page,
    limit:4,
    category,
    search: debouncedSearch,
    minPrice: debouncedPriceRange[0],
    maxPrice: debouncedPriceRange[1],
  });

  const { data: categories = [] } = useAllCategories();
  const hasMore = items.length < (data?.total ?? 0);
  
//handlers
  const handleCategoryChange = (value: string) => {
  setCategory(value);
  setPage(1);
  setItems([]);
};
const handleSearchChange = (value: string) => {
  setSearch(value);
  setPage(1);
  setItems([]);
};

const handlePriceChange = (value: [number, number]) => {
  setPriceRange(value);
  setPage(1);
  setItems([]);
};
  
// Append new data
useEffect(() => {
    function updateItems() {
    if (!data || !page) return;

    if (page === 1) {
      setItems(data.items);
    } else {
      setItems((prev) => [...prev, ...data.items]);
    }
  
  }
  updateItems();
}, [data, page]);

//infinite scroll 
  
  useInfiniteScroll({
    loading: isFetching,
    hasMore,
    onLoadMore: () => setPage((prev) => prev + 1),
  });

  return (
    <div className="space-y-8 pt-28">
      {/* Filters */}
      <div className="flex flex-col items-center space-y-8">
        <div className="flex w-full flex-col justify-center gap-10 px-5 lg:flex-row">
          <EntityFilters
            filters={[
              {
                key: "category",
                label: "Category",
                value: category,
                onChange: handleCategoryChange,
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
              onChange={handlePriceChange }
              min={0}
              max={5000}
              step={100}
            />
          </div>
        </div>

        <EntityFilters
          search={{
            value: search,
            onChange: handleSearchChange,
            placeholder: "Search menu items...",
            classname: "lg:w-5xl sm:w-xl",
          }}
        />
      </div>

      {/* Grid */}
      <div className="relative mx-7">
        <StorefrontGrid
          items={items}
          isLoading={isLoading && page === 1}
          onItemClick={(item) => {
            setSelectedItemId(item.id);
            setOpen(true);
          }}
        />
      </div>

      <ShoppingCart />

      <ProductDetailsSheet
        open={open}
        onOpenChange={setOpen}
        menuItemId={selectedItemId}
      />
    </div>
  );
}