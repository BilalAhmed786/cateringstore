import prisma from "@/app/(backend)/lib/prisma/prisma";
import { DateRange } from "../types/type";

export async function getRevenue(
  range: DateRange
) {
  const result = await prisma.order.aggregate({
    where: {
      createdAt: {
        gte: range.start,
        lt: range.end,
      },
      status: {
        not: "CANCELLED",
      },
    },

    _sum: {
      total: true,
    },
  });

  return result._sum.total ?? 0;
}