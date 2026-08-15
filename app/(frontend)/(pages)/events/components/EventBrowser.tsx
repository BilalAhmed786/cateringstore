"use client";

import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";

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

import { useCreateEventReview } from "../hook/useCreateHamperReview";
import { useGetEventReviews } from "../hook/useGetEventReviews";

export function EventBrowser() {
  // ---------------------------------------
  // Event Filters
  // ---------------------------------------

  const [category, setCategory] = useState("all");

  const [search, setSearch] = useState("");

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  // ---------------------------------------
  // Review Filters
  // ---------------------------------------

  const [rating, setRating] = useState("all");

  const [sort, setSort] = useState<"asc" | "desc">("desc");

  // ---------------------------------------
  // Pagination
  // ---------------------------------------

  const [page, setPage] = useState(1);

  const [items, setItems] = useState<GridItem[]>([]);

  // ---------------------------------------
  // Selected Event
  // ---------------------------------------

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const [detailsOpen, setDetailsOpen] = useState(false);

  // ---------------------------------------
  // Debounce
  // ---------------------------------------

  const debouncedSearch = useDebounce(search, 500);

  const debouncedPriceRange = useDebounce(priceRange, 500);

  // ---------------------------------------
  // Events
  // ---------------------------------------

  const { data, isLoading, isFetching } = useGetEvents({
    page,
    limit: 4,
    category,
    search: debouncedSearch,
    minPrice: debouncedPriceRange[0],
    maxPrice: debouncedPriceRange[1],
  });

  // ---------------------------------------
  // Categories
  // ---------------------------------------

  const { data: cat } = useEventCategories({
    page: 1,
    limit: 1000,
  });

  const categories = cat?.categories ?? [];

  // ---------------------------------------
  // Event Details
  // ---------------------------------------

  const { data: eventDetails, isLoading: isDetailsLoading } = useGetSingleEvent(
    selectedEventId ?? "",
  );

  // ---------------------------------------
  // Event Reviews
  // ---------------------------------------

  const { data: reviewData, isLoading: isReviewsLoading } = useGetEventReviews({
    selectedEventId,
    rating,
    sort,
  });

  // ---------------------------------------
  // Create Event Review
  // ---------------------------------------

  const { createReview } = useCreateEventReview(selectedEventId);

  // ---------------------------------------
  // Cart
  // ---------------------------------------

  const { addItem } = useCartStore();

  // ---------------------------------------
  // Pagination
  // ---------------------------------------

  const hasMore = items.length < (data?.total ?? 0);

  useEffect(() => {
    if (!data) return;

    function retreiveData(data:GridItem[]) {
      if (page === 1) {
        setItems(data);
      } else {
        setItems((prev) => [...prev, ...data]);
      }
    }

    retreiveData(data.items)
  }, [data, page]);

  // ---------------------------------------
  // Event Filters
  // ---------------------------------------

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

  // ---------------------------------------
  // Infinite Scroll
  // ---------------------------------------

  useInfiniteScroll({
    loading: isFetching,
    hasMore,

    onLoadMore: () => setPage((prev) => prev + 1),
  });

  // ---------------------------------------
  // Review Submit
  // ---------------------------------------

  const handleReviewSubmit = async (formData: FieldValues) => {
    if (!selectedEventId) return;

    await createReview({
      eventId: selectedEventId,
      rating: Number(formData.rating),
      comment: formData.comment || null,
    });
  };

  // ---------------------------------------
  // Details Sheet
  // ---------------------------------------

  const handleDetailsOpenChange = (open: boolean) => {
    if (!open) {
      setRating("all");
      setSort("desc");
    }

    setDetailsOpen(open);
  };

  return (
    <div className="space-y-8 pt-28">
      {/* -------------------------------- */}
      {/* Filters */}
      {/* -------------------------------- */}

      <div className="flex flex-col items-center space-y-8">
        <div className="flex w-full flex-col justify-center gap-10 px-5 lg:flex-row">
          {/* Category */}

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

          {/* Price */}

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

        {/* Search */}

        <EntityFilters
          search={{
            value: search,
            onChange: handleSearchChange,
            placeholder: "Search events...",
            classname: "sm:w-xl lg:w-5xl",
          }}
        />
      </div>

      {/* -------------------------------- */}
      {/* Events */}
      {/* -------------------------------- */}

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
              onClick={() => addItem(event, "event")}
            />
          )}
        />
      </div>

      <ShoppingCart />

      {/* -------------------------------- */}
      {/* Event Details + Reviews */}
      {/* -------------------------------- */}

      <EventDetailsSheet
        data={eventDetails}
        isLoading={isDetailsLoading}
        open={detailsOpen}
        onOpenChange={handleDetailsOpenChange}
        reviewData={reviewData}
        isReviewsLoading={isReviewsLoading}
        rating={rating}
        sort={sort}
        onRatingChange={setRating}
        onSortChange={setSort}
        onReviewSubmit={handleReviewSubmit}
      />
    </div>
  );
}
