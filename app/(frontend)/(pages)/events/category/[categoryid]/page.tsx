"use client";

import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
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
import { useGetEventReviews } from "../../hook/useGetEventReviews";
import { useCreateEventReview } from "../../hook/useCreateHamperReview";



export default function EventCategoryBrowser() {
  const params = useParams();

  const categoryId = params.categoryid as string;

  // ---------------------------------------
  // Event Filters
  // ---------------------------------------

  const [search, setSearch] = useState("");

  const [priceRange, setPriceRange] =
    useState<[number, number]>([0, 5000]);

  // ---------------------------------------
  // Review Filters
  // ---------------------------------------

  const [rating, setRating] = useState("all");

  const [sort, setSort] =
    useState<"asc" | "desc">("desc");

  // ---------------------------------------
  // Pagination
  // ---------------------------------------

  const [page, setPage] = useState(1);

  const [items, setItems] =
    useState<GridItem[]>([]);

  // ---------------------------------------
  // Selected Event
  // ---------------------------------------

  const [selectedEventId, setSelectedEventId] =
    useState<string | null>(null);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  // ---------------------------------------
  // Debounce
  // ---------------------------------------

  const debouncedSearch =
    useDebounce(search, 500);

  const debouncedPrice =
    useDebounce(priceRange, 500);

  // ---------------------------------------
  // Events
  // ---------------------------------------

  const {
    data,
    isLoading,
    isFetching,
  } = useGetEvents({
    page,
    limit: 4,
    category: categoryId,
    search: debouncedSearch,
    minPrice: debouncedPrice[0],
    maxPrice: debouncedPrice[1],
  });

  // ---------------------------------------
  // Event Details
  // ---------------------------------------

  const {
    data: eventDetails,
    isLoading: isDetailsLoading,
  } = useGetSingleEvent(
    selectedEventId ?? "",
  );

  // ---------------------------------------
  // Event Reviews
  // ---------------------------------------

  const {
    data: reviewData,
    isLoading: isReviewsLoading,
  } = useGetEventReviews({
    selectedEventId: selectedEventId ?? "",
    rating,
    sort,
  });

  // ---------------------------------------
  // Create Review
  // ---------------------------------------

  const { createReview } =
    useCreateEventReview(selectedEventId);

  // ---------------------------------------
  // Cart
  // ---------------------------------------

  const { addItem } = useCartStore();

  // ---------------------------------------
  // Pagination
  // ---------------------------------------

  const hasMore =
    items.length < (data?.total ?? 0);

  useEffect(() => {
    if (!data) return;

    function dataRetrieve(
      data: GridItem[],
    ) {
      if (page === 1) {
        setItems(data);
      } else {
        setItems((prev) => [
          ...prev,
          ...data,
        ]);
      }
    }

    dataRetrieve(data.items);
  }, [data, page]);

  // ---------------------------------------
  // Infinite Scroll
  // ---------------------------------------

  useInfiniteScroll({
    loading: isFetching,
    hasMore,
    onLoadMore: () =>
      setPage((p) => p + 1),
  });

  // ---------------------------------------
  // Search
  // ---------------------------------------

  const handleSearchChange = (
    value: string,
  ) => {
    setSearch(value);
    setPage(1);
  };

  // ---------------------------------------
  // Price
  // ---------------------------------------

  const handlePriceChange = (
    value: [number, number],
  ) => {
    setPriceRange(value);
    setPage(1);
  };

  // ---------------------------------------
  // Review Submit
  // ---------------------------------------

  const handleReviewSubmit = async (
    formData: FieldValues,
  ) => {
    if (!selectedEventId) return;

    await createReview({
      eventId: selectedEventId,
      rating: Number(formData.rating),
      comment: formData.comment || null,
    });
  };

  // ---------------------------------------
  // Details Open
  // ---------------------------------------

  const handleDetailsOpenChange = (
    open: boolean,
  ) => {
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

      <div className="flex flex-col items-center gap-6">

        <div className="w-full max-w-2xl px-4">
          <PriceFilter
            value={priceRange}
            onChange={handlePriceChange}
            min={0}
            max={5000}
            step={100}
          />
        </div>

        <div>
          <EntityFilters
            search={{
              value: search,
              onChange: handleSearchChange,
              placeholder: "Search events...",
              classname: "lg:w-5xl sm:w-xl",
            }}
          />
        </div>

      </div>

      {/* -------------------------------- */}
      {/* Events */}
      {/* -------------------------------- */}

      <div className="relative mx-7">
        <StorefrontGrid
          items={items}
          type="event"
          isLoading={
            isLoading && page === 1
          }
          onItemClick={(item) => {
            setSelectedEventId(item.id);
            setDetailsOpen(true);
          }}
          renderActions={(item) => (
            <UniButton
              label="Add To Cart"
              onClick={() =>
                addItem(item, "event")
              }
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
        onOpenChange={
          handleDetailsOpenChange
        }

        reviewData={reviewData}
        isReviewsLoading={
          isReviewsLoading
        }

        rating={rating}
        sort={sort}

        onRatingChange={setRating}
        onSortChange={setSort}

        onReviewSubmit={
          handleReviewSubmit
        }
      />
    </div>
  );
}