import prisma from "@/app/(backend)/lib/prisma/prisma";

export async function getClientPackageReviews(
  userId: string,
  search: string | null,
) {
  const searchValue = search?.trim();

  return prisma.packageReview.findMany({
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
            package: {
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

      package: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
}