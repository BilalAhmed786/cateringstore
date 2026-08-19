import prisma from "@/app/(backend)/lib/prisma/prisma";
import { ReviewParams } from "./types/type";


export async function getHamperReviews(
  params: ReviewParams
) {
  if (
    params.type &&
    params.type !== "HAMPER"
  ) {
    return [];
  }

  return prisma.hamperReview.findMany({
    where: {
     
     ...(params.rating !== undefined && {
        rating: params.rating,
      }),

      ...(params.search && {
        OR: [
          {
            comment: {
              contains: params.search,
              mode: "insensitive",
            },
          },

          {
            user: {
              name: {
                contains: params.search,
                mode: "insensitive",
              },
            },
          },

          {
            user: {
              email: {
                contains: params.search,
                mode: "insensitive",
              },
            },
          },

          {
            hamper: {
              name: {
                contains: params.search,
                mode: "insensitive",
              },
            },
          },
        ],
      }),
    },

    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },

      hamper: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}