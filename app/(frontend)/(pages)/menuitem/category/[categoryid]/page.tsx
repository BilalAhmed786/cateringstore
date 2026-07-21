"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { EntityFilters } from "@/app/(frontend)/components/reusables/filters/entityfilters";
import { PriceFilter } from "@/app/(frontend)/components/reusables/filters/pricefilter";
import { StorefrontGrid } from "@/app/(frontend)/components/reusables/storefront-grid/StorefrontGrid";
import { ShoppingCart } from "@/app/(frontend)/components/reusables/shopping-cart/ShoppingCart";
import { ProductDetailsSheet } from "@/app/(frontend)/components/reusables/storefront-grid/ProductDetailsSheet";
import { useDebounce } from "@/app/(frontend)/components/reusables/hooks/useDebounce";
import { useInfiniteScroll } from "@/app/(frontend)/components/reusables/hooks/useInfiniteScroll";
import { useGetMenuItems } from "@/app/(frontend)/admin/menu-items/hooks/useGetMenuItems";
import { GridItem } from "@/app/(frontend)/components/reusables/grid/gridtypes";

export default function CategoryMenuItemsPage() {
  const params = useParams();
  const categoryId = params.categoryid as string;

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
    category: categoryId,
    search: debouncedSearch,
    minPrice: debouncedPriceRange[0],
    maxPrice: debouncedPriceRange[1],
  });

  const hasMore = items.length < (data?.total ?? 0);

  // Reset when filters change
  useEffect(() => {
    const reset = () => {
      setPage(1);
      setItems([]);
    };

    reset();
  }, [categoryId, debouncedSearch, debouncedPriceRange]);

  // Append new page
  useEffect(() => {
    const updateItems = () => {
      if (!data) return;

      if (page === 1) {
        setItems(data.items);
      } else {
        setItems((prev) => [...prev, ...data.items]);
      }
    };

    updateItems();
  }, [data, page]);

  useInfiniteScroll({
    loading: isFetching,
    hasMore,
    onLoadMore: () => setPage((prev) => prev + 1),
  });

  return (
    <div className="space-y-8 pt-28">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Category Menu Items</h1>
        <p className="mt-2 text-muted-foreground">
          Browse all menu items in this category.
        </p>
      </div>

      <div className="flex flex-col items-center space-y-8">
        <div className="w-full max-w-xs">
          <PriceFilter
            value={priceRange}
            onChange={setPriceRange}
            min={0}
            max={5000}
            step={100}
          />
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