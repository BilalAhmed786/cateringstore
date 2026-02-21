import { Prisma } from "@prisma/client";
import { CommonFilters } from "../types/type";


type WhereLike = {
  OR?: unknown;
};

export function buildFilter<T extends WhereLike>(
  filters: CommonFilters,
  options: {
    searchFields: readonly (keyof T)[];
    hasCategory?: boolean;
  }
): T {
  const where = {} as T;

  /* -------- STATUS -------- */
  if (filters.status && filters.status !== "all") {
    (where as Prisma.MenuItemWhereInput | Prisma.PackageWhereInput).available =
      filters.status === "true";
  }

  /* -------- SEARCH -------- */
  if (filters.search?.trim()) {
    where.OR = options.searchFields.map((field) => ({
      [field]: {
        contains: filters.search,
        mode: "insensitive",
      },
    })) as T["OR"];
  }

  /* -------- CATEGORY (OPTIONAL) -------- */
  if (
    options.hasCategory &&
    filters.category &&
    filters.category !== "all"
  ) {
    (where as Prisma.MenuItemWhereInput).categoryId =
      filters.category.trim();
  }

  /* -------- DATE -------- */
  if (filters.dateFilter && filters.dateFilter !== "all") {
    const now = new Date();

    const createdAtFilter =
      filters.dateFilter === "today"
        ? {
            gte: new Date(now.setHours(0, 0, 0, 0)),
            lte: new Date(now.setHours(23, 59, 59, 999)),
          }
        : filters.dateFilter === "past7"
        ? { gte: new Date(Date.now() - 7 * 86400000) }
        : filters.dateFilter === "past30"
        ? { gte: new Date(Date.now() - 30 * 86400000) }
        : undefined;

    if (createdAtFilter) {
      (where as Prisma.MenuItemWhereInput | Prisma.PackageWhereInput).createdAt =
        createdAtFilter;
    }
  }

  return where;
}