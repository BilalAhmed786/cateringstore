import { NextRequest } from "next/server";
import { ReviewParams, ReviewType } from "./types/type";


const reviewTypes: ReviewType[] = [
  "MENU_ITEM",
  "PACKAGE",
  "EVENT",
  "HAMPER",
];

export function getReviewParams(
  req: NextRequest
): ReviewParams {
  const { searchParams } = new URL(req.url);

  const pageParam = Number(
    searchParams.get("page")
  );

  const limitParam = Number(
    searchParams.get("limit")
  );

  const ratingParam = Number(
    searchParams.get("rating")
  );

  const typeParam =
    searchParams.get("type");

  const page =
    Number.isFinite(pageParam) && pageParam > 0
      ? pageParam
      : 1;

  const limit =
    Number.isFinite(limitParam) &&
    limitParam > 0
      ? Math.min(limitParam, 50)
      : 10;

  const rating =
    Number.isInteger(ratingParam) &&
    ratingParam >= 1 &&
    ratingParam <= 5
      ? ratingParam
      : undefined;

  const type =
    typeParam &&
    reviewTypes.includes(
      typeParam as ReviewType
    )
      ? (typeParam as ReviewType)
      : undefined;

  return {
    page,
    limit,
    search:
      searchParams.get("search")?.trim() || "",
    rating,
    type,
  };
}