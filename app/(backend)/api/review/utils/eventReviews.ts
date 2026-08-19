import prisma from "@/app/(backend)/lib/prisma/prisma";
import { ReviewParams } from "./types/type";


export async function getEventReviews(
  params: ReviewParams
) {
  if (
    params.type &&
    params.type !== "EVENT"
  ) {
    return [];
  }

  return prisma.eventReview.findMany({
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
            event: {
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

      event: {
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