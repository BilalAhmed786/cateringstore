"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { ClientReview } from "../types/type";


interface ReviewCardProps {
  review: ClientReview;
}

function getReviewTypeLabel(type: ClientReview["type"]) {
  switch (type) {
    case "MENU":
      return "Menu Item";

    case "PACKAGE":
      return "Package";

    case "EVENT":
      return "Event";

    case "HAMPER":
      return "Hamper";

    default:
      return type;
  }
}

export default function ReviewCard({
  review,
}: ReviewCardProps) {
  return (
    <div className="rounded-2xl border bg-background p-5 shadow-sm">
      <div className="flex gap-4">
        {/* Image */}
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
          {review.item.image ? (
            <Image
              src={review.item.image}
              alt={review.item.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
              No image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold">
                {review.item.name}
              </h3>

              <p className="text-sm text-muted-foreground">
                {getReviewTypeLabel(review.type)}
              </p>
            </div>

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
          </div>

          {/* Comment */}
          {review.comment && (
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {review.comment}
            </p>
          )}

          {/* Date */}
          <p className="mt-3 text-xs text-muted-foreground">
            {new Date(review.createdAt).toLocaleDateString(
              "en-US",
              {
                month: "long",
                day: "numeric",
                year: "numeric",
              },
            )}
          </p>
        </div>
      </div>
    </div>
  );
}