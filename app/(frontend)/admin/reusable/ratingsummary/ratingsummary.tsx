import { Star } from "lucide-react";

export function RatingSummary({
  rating = 0,
  count = 0,
}: {
  rating?: number;
  count?: number;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <div className="flex items-center gap-0.5">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
      </div>
      <span className="text-xs text-gray-400">({count})</span>
    </div>
  );
}
