import prisma from "@/app/(backend)/lib/prisma/prisma";
import { DateRange } from "../types/type";

export async function getDeliveredOrderCount(
  range: DateRange
) {
  return prisma.order.count({
    where: {
      createdAt: {
        gte: range.start,
        lt: range.end,
      },
      status: "DELIVERED",
    },
  });
}
