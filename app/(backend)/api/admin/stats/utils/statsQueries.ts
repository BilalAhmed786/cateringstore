import prisma from "@/app/(backend)/lib/prisma/prisma";

type DateRange = {
  start: Date;
  end: Date;
};

export async function getOrderCount(
  range: DateRange
) {
  return prisma.order.count({
    where: {
      createdAt: {
        gte: range.start,
        lt: range.end,
      },
    },
  });
}