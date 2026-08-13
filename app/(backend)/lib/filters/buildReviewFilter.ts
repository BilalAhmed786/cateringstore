import { Prisma } from "@prisma/client";
import { ReviewFilters } from "../types/type";


export function buildReviewFilter(
  filters: ReviewFilters,
): Prisma.MenuItemReviewWhereInput {
  const where: Prisma.MenuItemReviewWhereInput = {};

  /* ---------------- RATING ---------------- */

  if (filters.rating && filters.rating !== "all") {
    where.rating = Number(filters.rating);
  }

  /* ---------------- DATE ---------------- */

  if (filters.dateFilter && filters.dateFilter !== "all") {
  

    const createdAtFilter =
      filters.dateFilter === "today"
        ? {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lte: new Date(new Date().setHours(23, 59, 59, 999)),
          }
        : filters.dateFilter === "past7"
          ? {
              gte: new Date(Date.now() - 7 * 86400000),
            }
          : filters.dateFilter === "past30"
            ? {
                gte: new Date(Date.now() - 30 * 86400000),
              }
            : undefined;

    if (createdAtFilter) {
      where.createdAt = createdAtFilter;
    }
  }

  return where;
}