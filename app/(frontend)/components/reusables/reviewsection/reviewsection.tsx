"use client";

import { Star } from "lucide-react";
import { FieldValues } from "react-hook-form";

import { ReviewForm } from "../reviewform/reviewform";

export interface Review {
  id: string;
  rating: number;
  comment?: string | null;
  user: {
    id: string;
    name: string | null;
  };
}

interface ReviewSectionProps {
  reviews: Review[];
  canReview: boolean;
  onSubmit?: (formData: FieldValues) => Promise<void>;
  title?: string;
}

export function ReviewSection({
  reviews,
  canReview,
  onSubmit,
  title = "Customer Reviews",
}: ReviewSectionProps) {
  return (
    <section className="space-y-5">
      <h3 className="text-2xl font-semibold">
        {title}
      </h3>

      {/* Reviews */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border p-5"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">
                  {review.user.name || "Anonymous"}
                </h4>

                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                  <span>{review.rating}</span>
                </div>
              </div>

              {review.comment && (
                <p className="mt-3 leading-7 text-muted-foreground">
                  {review.comment}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          No reviews yet.
        </p>
      )}

      {/* Review Form */}
      {canReview && onSubmit && (
        <div className="rounded-xl border border-primary bg-primary/5 p-5">
          <ReviewForm onSubmit={onSubmit} />
        </div>
      )}
    </section>
  );
}
