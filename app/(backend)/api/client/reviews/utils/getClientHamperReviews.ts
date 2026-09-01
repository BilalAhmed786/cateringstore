import prisma from "@/app/(backend)/lib/prisma/prisma";

export async function getClientHamperReviews(
  userId: string,
  search: string | null,
) {
  const searchValue = search?.trim();

  return prisma.hamperReview.findMany({
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
            hamper: {
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

      hamper: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
}