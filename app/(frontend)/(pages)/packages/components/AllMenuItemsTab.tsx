"use client";

import { useEffect, useRef, useState } from "react";

import { EntityFilters } from "@/app/(frontend)/components/reusables/filters/entityfilters";
import { PriceFilter } from "@/app/(frontend)/components/reusables/filters/pricefilter";
import { StorefrontGrid } from "@/app/(frontend)/components/reusables/storefront-grid/StorefrontGrid";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { useDebounce } from "@/app/(frontend)/components/reusables/hooks/useDebounce";
import { useContainerInfiniteScroll } from "@/app/(frontend)/components/reusables/hooks/useContainerInfiniteScroll";
import { useAllCategories } from "@/app/(frontend)/admin/menu-items/hooks/usegetallcategories";
import { useGetMenuItems } from "@/app/(frontend)/admin/menu-items/hooks/useGetMenuItems";
import { GridItem } from "@/app/(frontend)/components/reusables/grid/gridtypes";
import { MenuItem } from "@/app/(frontend)/admin/packages/types/type";


interface AllMenuItemsTabProps {
  selectedItems: (MenuItem | GridItem)[];
  onAddItem: (item:(MenuItem | GridItem)) => void;
}

export function AllMenuItemsTab({
  selectedItems,
  onAddItem,
}: AllMenuItemsTabProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<GridItem[]>([]);

  const debouncedSearch = useDebounce(search, 500);
  const debouncedPriceRange = useDebounce(priceRange, 500);

  const { data, isLoading, isFetching } = useGetMenuItems({
    page,
    limit: 4,
    category,
    search: debouncedSearch,
    minPrice: debouncedPriceRange[0],
    maxPrice: debouncedPriceRange[1],
  });

  const { data: categories = [] } = useAllCategories();
  const hasMore = items.length < (data?.total ?? 0);

  useEffect(() => {
    if (!data) return;
 
    function dataretreive(data:GridItem[]){
  if (page === 1) {
      setItems(data);
    } else {
      setItems((prev) => [...prev, ...data]);
    }


  }
  dataretreive(data.items)
  
}, [data, page]);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
    setPage(1);
  };

  useContainerInfiniteScroll({
    containerRef,
    loading: isFetching,
    hasMore,
    onLoadMore: () => setPage((prev) => prev + 1),
  });

  return (
    <div
      ref={containerRef}
      className="max-h-[36vh] space-y-6 overflow-y-auto pr-2"
    >
      <div className="flex flex-col gap-6 lg:flex-row">
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

        <PriceFilter
          value={priceRange}
          onChange={handlePriceChange}
          min={0}
          max={5000}
          step={100}
        />
      </div>

      <EntityFilters
        search={{
          value: search,
          onChange: handleSearchChange,
          placeholder: "Search Menu Item...",
        }}
      />

      <StorefrontGrid
        items={items}
        isLoading={isLoading && page === 1}
        renderActions={(item) => {
          const exists = selectedItems.some(
            (selected) => selected.id === item.id
          );

          return (
            <UniButton
              className="w-full"
              label={exists ? "Added" : "Add"}
              disabled={exists}
              onClick={() => onAddItem(item)}
            />
          );
        }}
      />

      {isFetching && page > 1 && (
        <div className="py-6 text-center text-sm text-muted-foreground">
          Loading more items...
        </div>
      )}
    </div>
  );
}