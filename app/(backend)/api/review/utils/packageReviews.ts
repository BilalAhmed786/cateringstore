import prisma from "@/app/(backend)/lib/prisma/prisma";
import { ReviewParams } from "./types/type";

export async function getPackageReviews(
  params: ReviewParams
) {
  // Don't query PackageReview if another
  // review type was specifically requested.
  if (
    params.type &&
    params.type !== "PACKAGE"
  ) {
    return [];
  }

  return prisma.packageReview.findMany({
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
            package: {
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

      package: {
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