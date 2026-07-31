"use client";

import { useEffect, useState } from "react";

import { StorefrontGrid } from "@/app/(frontend)/components/reusables/storefront-grid/StorefrontGrid";
import { ShoppingCart } from "@/app/(frontend)/components/reusables/shopping-cart/ShoppingCart";
import { EventDetailsSheet } from "./EventDetailsSheet";

import { UniButton } from "@/app/(frontend)/components/reusables/button/button";
import { EntityFilters } from "@/app/(frontend)/components/reusables/filters/entityfilters";
import { PriceFilter } from "@/app/(frontend)/components/reusables/filters/pricefilter";

import { useDebounce } from "@/app/(frontend)/components/reusables/hooks/useDebounce";
import { useInfiniteScroll } from "@/app/(frontend)/components/reusables/hooks/useInfiniteScroll";

import { useCartStore } from "@/app/(frontend)/store/useCartStore";

import { GridItem } from "@/app/(frontend)/components/reusables/grid/gridtypes";

import { useGetEvents } from "@/app/(frontend)/admin/events/hooks/usegetEvents";
import { useGetSingleEvent } from "@/app/(frontend)/admin/events/hooks/usegetsingleevent";
import { useEventCategories } from "@/app/(frontend)/admin/categories/event/hooks/useEventCategories";

export function EventBrowser() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<GridItem[]>([]);

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);
  const debouncedPriceRange = useDebounce(priceRange, 500);

  const { data, isLoading, isFetching } = useGetEvents({
    page,
    limit: 4,
    category,
    search: debouncedSearch,
    minPrice: debouncedPriceRange[0],
    maxPrice: debouncedPriceRange[1],
  });

  const { data: cat } = useEventCategories({
    page: 1,
    limit: 1000,
  });

  const categories = cat?.categories ?? [];

  const {
    data: eventDetails,
    isLoading: isDetailsLoading,
  } = useGetSingleEvent(selectedEventId ?? "");

  const { addItem } = useCartStore();

  const hasMore = items.length < (data?.total ?? 0);

  useEffect(() => {
    if (!data) return;

    function dataRetrieve(data: GridItem[]) {
      if (page === 1) {
        setItems(data);
      } else {
        setItems((prev) => [...prev, ...data]);
      }
    }

    dataRetrieve(data.items);
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

  useInfiniteScroll({
    loading: isFetching,
    hasMore,
    onLoadMore: () => setPage((prev) => prev + 1),
  });

  return (
    <div className="space-y-8 pt-28">
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
            placeholder: "Search events...",
            classname: "sm:w-xl lg:w-5xl",
          }}
        />
      </div>

      <div className="relative mx-7">
        <StorefrontGrid
          items={items}
          type="event"
          isLoading={isLoading && page === 1}
          onItemClick={(event) => {
            setSelectedEventId(event.id);
            setDetailsOpen(true);
          }}
          renderActions={(event) => (
            <UniButton
              label="Add To Cart"
              onClick={() => addItem(event,"event")}
            />
          )}
        />
      </div>

      <ShoppingCart />

      <EventDetailsSheet
        data={eventDetails}
        isLoading={isDetailsLoading}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />
    </div>
  );
}