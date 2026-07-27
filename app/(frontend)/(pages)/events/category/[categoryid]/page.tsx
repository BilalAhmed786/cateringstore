"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { EntityFilters } from "@/app/(frontend)/components/reusables/filters/entityfilters";
import { PriceFilter } from "@/app/(frontend)/components/reusables/filters/pricefilter";
import { StorefrontGrid } from "@/app/(frontend)/components/reusables/storefront-grid/StorefrontGrid";
import { ShoppingCart } from "@/app/(frontend)/components/reusables/shopping-cart/ShoppingCart";
import { UniButton } from "@/app/(frontend)/components/reusables/button/button";

import { useDebounce } from "@/app/(frontend)/components/reusables/hooks/useDebounce";
import { useInfiniteScroll } from "@/app/(frontend)/components/reusables/hooks/useInfiniteScroll";

import { GridItem } from "@/app/(frontend)/components/reusables/grid/gridtypes";
import { useCartStore } from "@/app/(frontend)/store/useCartStore";

import { useGetEvents } from "@/app/(frontend)/admin/events/hooks/usegetEvents";
import { useGetSingleEvent } from "@/app/(frontend)/admin/events/hooks/usegetsingleevent";
import { EventDetailsSheet } from "../../components/EventDetailsSheet";

export default function EventCategoryBrowser() {
  const params = useParams();
  const categoryId = params.categoryid as string;

  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0, 5000,
  ]);

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<GridItem[]>([]);

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);
  const debouncedPrice = useDebounce(priceRange, 500);

  const { data, isLoading, isFetching } = useGetEvents({
    page,
    limit: 4,
    category: categoryId,
    search: debouncedSearch,
    minPrice: debouncedPrice[0],
    maxPrice: debouncedPrice[1],
  });

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

  useInfiniteScroll({
    loading: isFetching,
    hasMore,
    onLoadMore: () => setPage((p) => p + 1),
  });

  return (
    <div className="space-y-8 pt-28">
      <div className="flex flex-col items-center gap-6">
        <div className="w-full max-w-xs">
          <PriceFilter
            value={priceRange}
            onChange={(value) => {
              setPriceRange(value);
              setPage(1);
            }}
            min={0}
            max={5000}
            step={100}
          />
        </div>

        <div>
          <EntityFilters
            search={{
              value: search,
              onChange: setSearch,
              placeholder: "Search events...",
              classname: "lg:w-5xl sm:w-xl",
            }}
          />
        </div>
      </div>

      <div className="relative mx-7">
        <StorefrontGrid
          items={items}
          isLoading={isLoading && page === 1}
          onItemClick={(item) => {
            setSelectedEventId(item.id);
            setDetailsOpen(true);
          }}
          renderActions={(item) => (
            <UniButton
              label="Add To Cart"
              onClick={() => addItem(item)}
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