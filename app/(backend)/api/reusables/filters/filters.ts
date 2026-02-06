import { Prisma } from "@prisma/client";
import { MenuItemFilters } from "../types/type";

export function Datafilter(filters: MenuItemFilters): Prisma.MenuItemWhereInput {
  const { status, category, search, dateFilter } = filters;

  const where: Prisma.MenuItemWhereInput = {};

  // STATUS filter
  if (status && status.toLowerCase() !== "all") {
    if (status.toLowerCase() === "true") where.available = true;
    else if (status.toLowerCase() === "false") where.available = false;
  }

  // CATEGORY filter
  if (category && category.toLowerCase() !== "all") {
    where.categoryId = category.trim();
  }

  // SEARCH filter
  if (search?.trim()) {
    where.OR = [
      { title: { contains: search.trim(), mode: "insensitive" } },
      { description: { contains: search.trim(), mode: "insensitive" } },
    ];
  }

  // DATE FILTER
  if (dateFilter && dateFilter.toLowerCase() !== "all") {
    const now = new Date();
    let start: Date | undefined;

    if (dateFilter.toLowerCase() === "today") {
      start = new Date(now);
      start.setHours(0, 0, 0, 0);
      const end = new Date(now);
      end.setHours(23, 59, 59, 999);
      where.createdAt = { gte: start, lte: end };
    } else if (dateFilter.toLowerCase() === "past7") {
      start = new Date();
      start.setDate(start.getDate() - 7);
      where.createdAt = { gte: start };
    } else if (dateFilter.toLowerCase() === "past30") {
      start = new Date();
      start.setDate(start.getDate() - 30);
      where.createdAt = { gte: start };
    }
  }

  return where;
}
