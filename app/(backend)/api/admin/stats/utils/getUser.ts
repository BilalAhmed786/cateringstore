import prisma from "@/app/(backend)/lib/prisma/prisma";
import { DateRange } from "../types/type";

export async function getUserCount(
  range: DateRange
) {
  return prisma.user.count({
   where: {
      createdAt: {
        gte: range.start,
        lt: range.end,
      },
    },
  });
}