
"use client";

import { MessageSquare } from "lucide-react";

import ReviewCard from "./ReviewCard";
import { useGetMyReviews } from "../hooks/useGetMyReviews";
import { ItemsPagination } from "@/app/(frontend)/components/reusables/pagination/pagination";
import { GetMyReviewsParams } from "../types/type";

interface ReviewListProps {
  search: string;
  type: GetMyReviewsParams["type"];
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function ReviewList({
  search,
  type,
  page,
  limit,
  onPageChange,
}: ReviewListProps) {
  const {
    data,
    isLoading,
    isError,
  } = useGetMyReviews({
    search,
    type,
    page,
    limit,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-2xl border bg-background p-5"
          >
            <div className="flex gap-4">
              <div className="h-16 w-16 shrink-0 rounded-xl bg-muted" />

              <div className="flex-1 space-y-3">
                <div className="h-5 w-48 rounded bg-muted" />
                <div className="h-4 w-24 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-3 w-32 rounded bg-muted" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border bg-background py-12 text-center">
        <MessageSquare className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

        <h2 className="font-semibold">
          Unable to load reviews
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Something went wrong while fetching your reviews.
        </p>
      </div>
    );
  }

  if (!data?.reviews?.length) {
    return (
      <div className="rounded-2xl border bg-background py-12 text-center">
        <MessageSquare className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

        <h2 className="font-semibold">
          No reviews found
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          No reviews match your search or selected filter.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {data.reviews.map((review) => (
          <ReviewCard
            key={`${review.type}-${review.id}`}
            review={review}
          />
        ))}
      </div>

      <ItemsPagination
        page={page}
        total={data.total}
        limit={limit}
        onPageChange={onPageChange}
      />
    </div>
  );
}
