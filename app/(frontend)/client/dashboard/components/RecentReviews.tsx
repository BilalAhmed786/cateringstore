"use client";

import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

import { useGetMyReviews } from "../../reviews/hooks/useGetMyReviews";
import ContentSkeleton from "@/app/(frontend)/components/reusables/skeleton/ContentSkeleton";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/app/(frontend)/components/ui/card";



export default function RecentReviews() {
  const { data, isLoading } = useGetMyReviews({
    page: 1,
    limit: 3,
    type: "ALL",
  });

  if (isLoading) {
    return <ContentSkeleton />;
  }

  const reviews = data?.reviews ?? [];

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <CardHeader className="flex flex-row items-start justify-between border-b px-5 py-4">
        <div>
          <CardTitle className="text-lg">
            Recent Reviews
          </CardTitle>

          <CardDescription className="mt-1">
            Your latest catering experiences
          </CardDescription>
        </div>

        <Link
          href="/client/reviews"
          className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardHeader>

      {/* Reviews */}
      <CardContent className="p-0">
        {reviews.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <Star className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />

            <p className="font-medium">
              No reviews yet
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Your reviews will appear here after your orders.
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {reviews.map((review) => (
              <div
                key={`${review.type}-${review.id}`}
                className="px-5 py-4 transition-colors hover:bg-muted/40"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Review content */}
                  <div className="min-w-0 flex-1">
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Item name */}
                    <p className="mt-2 font-medium">
                      {review.item.name}
                    </p>

                    {/* Review type */}
                    <p className="mt-0.5 text-xs font-medium uppercase text-muted-foreground">
                      {review.type}
                    </p>

                    {/* Comment */}
                    {review.comment && (
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {review.comment}
                      </p>
                    )}
                  </div>

                  {/* Date */}
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {new Date(review.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      },
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}