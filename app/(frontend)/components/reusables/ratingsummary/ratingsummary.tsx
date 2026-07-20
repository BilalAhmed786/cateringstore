import { Star, MessageCircle } from "lucide-react";
import { RatingSummaryProps } from "../types/types";




export function RatingSummary({
  rating = 0,
  count = 0,
}: RatingSummaryProps) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-600">
      {/* ⭐ Rating */}
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
      </div>

      {/* 💬 Review / Comment Count */}
      <div className="flex items-center gap-1 text-gray-500">
        <MessageCircle className="h-4 w-4" />
        <span className="text-xs">({count})</span>
      </div>
    </div>
  );
}
