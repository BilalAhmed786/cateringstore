import prisma from "@/app/(backend)/lib/prisma/prisma";

export async function getClientMenuReviews(
  userId: string,
  search: string | null,
) {
  const searchValue = search?.trim();

  return prisma.menuItemReview.findMany({
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
            menuItem: {
              title: {
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

      menuItem: {
        select: {
          id: true,
          title: true,

          images: {
            select: {
              url: true,
            },
            take: 1,
          },
        },
      },
    },
  });
}