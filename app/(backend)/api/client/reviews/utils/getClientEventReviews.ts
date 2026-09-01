import prisma from "@/app/(backend)/lib/prisma/prisma";

export async function getClientEventReviews(
  userId: string,
  search: string | null,
) {
  const searchValue = search?.trim();

  return prisma.eventReview.findMany({
    where: {
      userId,

      ...(searchValue && {
        OR: [
          {
            comment: {
              contains: searchValue,
              mode: "insensitive",
            },
          },
          {
            event: {
              name: {
                contains: searchValue,
                mode: "insensitive",
              },
            },
          },
        ],
      }),
    },

    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      rating: true,
      comment: true,
      createdAt: true,

      event: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
}