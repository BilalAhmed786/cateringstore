"use client";

import { useEffect, useState } from "react";

import { EntityFilters } from "@/app/(frontend)/components/reusables/filters/entityfilters";
import { PriceFilter } from "@/app/(frontend)/components/reusables/filters/pricefilter";
import { StorefrontGrid } from "@/app/(frontend)/components/reusables/storefront-grid/StorefrontGrid";
import { ShoppingCart } from "@/app/(frontend)/components/reusables/shopping-cart/ShoppingCart";
import { useAllCategories } from "@/app/(frontend)/admin/menu-items/hooks/usegetallcategories";
import { useGetMenuItems } from "@/app/(frontend)/admin/menu-items/hooks/useGetMenuItems";
import { useDebounce } from "@/app/(frontend)/components/reusables/hooks/useDebounce";
import { useInfiniteScroll } from "@/app/(frontend)/components/reusables/hooks/useInfiniteScroll";
import { GridItem } from "@/app/(frontend)/components/reusables/grid/gridtypes";
import { MenuItemDetailsSheet } from "./MenuItemDetailsSheet"; // <-- update path
import { Loader } from "@/app/(frontend)/components/reusables/loader/loader";

export function MenuItemBrowser() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

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

  // Filters

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

  // Update items

  useEffect(() => {
    if (!data) return;
    function dataItems(data:GridItem[]) {
      if (page === 1) {
        setItems(data);
      } else {
        setItems((prev) => [...prev, ...data]);
      }
    }
    dataItems(data.items);
  }, [data, page]);

  // Infinite Scroll

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
              onChange={handlePriceChange}
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
            classname: "sm:w-xl lg:w-5xl",
          }}
        />
      </div>

      {/* Grid */}

      <div className="relative mx-7">
        <StorefrontGrid
          items={items}
          type="menuitem"
          isLoading={isLoading && page === 1}
          onItemClick={(item) => {
            setSelectedItemId(item.id);
            setDetailsOpen(true);
          }}
        />
        {isFetching  && page !==1 && <Loader variant="page"/>}
      </div>

      <ShoppingCart />

      <MenuItemDetailsSheet
        id={selectedItemId}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
}
