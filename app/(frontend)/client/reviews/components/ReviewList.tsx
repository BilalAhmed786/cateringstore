"use client";

import { MessageSquare } from "lucide-react";

import ReviewCard from "./ReviewCard";
import { useGetMyReviews } from "../hooks/useGetMyReviews";

import { ItemsPagination } from "@/app/(frontend)/components/reusables/pagination/pagination";
import { GetMyReviewsParams } from "../types/type";
import ContentSkeleton from "@/app/(frontend)/components/reusables/skeleton/ContentSkeleton";
import { Card, CardContent } from "@/app/(frontend)/components/ui/card";



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
          <Card key={index}>
            <CardContent className="p-5">
              <ContentSkeleton />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <MessageSquare className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

          <h2 className="font-semibold">
            Unable to load reviews
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Something went wrong while fetching your reviews.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!data?.reviews?.length) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <MessageSquare className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />

          <h2 className="font-semibold">
            No reviews found
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            No reviews match your search or selected filter.
          </p>
        </CardContent>
      </Card>
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