"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
}

export function StarRating({
  value,
  onChange,
  max = 5,
}: StarRatingProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, index) => {
        const rating = index + 1;

        return (
          <button
            key={rating}
            type="button"
            onClick={() => onChange(rating)}
            className="transition-transform hover:scale-110"
            aria-label={`Rate ${rating} out of ${max}`}
          >
            <Star
              className={`h-8 w-8 ${
                rating <= value
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-muted-foreground"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}