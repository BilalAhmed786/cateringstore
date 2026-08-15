export function buildRatingFilter(
  rating: string | null,
): { rating?: number } {
  if (!rating || rating === "all") {
    return {};
  }

  const value = Number(rating);

  if (
    !Number.isInteger(value) ||
    value < 1 ||
    value > 5
  ) {
    return {};
  }

  return {
    rating: value,
  };
}