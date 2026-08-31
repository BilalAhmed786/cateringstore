"use client";
import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";

type Review = {
  id: string;
  rating: number;
  comment: string;
  itemName: string;
  createdAt: string;
};

const reviews: Review[] = [
  {
    id: "1",
    rating: 5,
    comment: "Excellent food and very professional service.",
    itemName: "Wedding Catering Package",
    createdAt: "2 days ago",
  },
  {
    id: "2",
    rating: 4,
    comment: "Great taste and good presentation.",
    itemName: "Premium Food Package",
    createdAt: "1 week ago",
  },
  {
    id: "3",
    rating: 5,
    comment: "Everything was fresh and delicious.",
    itemName: "Ramadan Hamper",
    createdAt: "2 weeks ago",
  },
];

export default function RecentReviews() {
  return (
    <div className="rounded-xl border bg-card shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div>
          <h2 className="text-lg font-semibold">
            Recent Reviews
          </h2>

          <p className="text-sm text-muted-foreground">
            Your latest catering experiences
          </p>
        </div>

        <Link
          href="/client/reviews"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Reviews */}
      <div className="divide-y">
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
          reviews.map((review) => (
            <div
              key={review.id}
              className="px-5 py-4 transition-colors hover:bg-muted/40"
            >
              <div className="flex items-start justify-between gap-4">

                {/* Review content */}
                <div className="min-w-0 flex-1">

                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map(
                      (_, index) => (
                        <Star
                          key={index}
                          className={`h-4 w-4 ${
                            index < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ),
                    )}
                  </div>

                  <p className="mt-2 font-medium">
                    {review.itemName}
                  </p>

                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {review.comment}
                  </p>
                </div>

                {/* Date */}
                <span className="shrink-0 text-xs text-muted-foreground">
                  {review.createdAt}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}