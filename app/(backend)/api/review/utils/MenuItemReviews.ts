import prisma from "@/app/(backend)/lib/prisma/prisma";
import { ReviewParams } from "./types/type";

export async function getMenuItemReviews(
  params: ReviewParams
) {
  // If a different type was requested,
  // don't query MenuItemReview at all.
  if (
    params.type &&
    params.type !== "MENU_ITEM"
  ) {
    return [];
  }

  return prisma.menuItemReview.findMany({
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
            menuItem: {
              title: {
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

      menuItem: {
        select: {
          id: true,
          title: true,

          images: {
            take: 1,

            select: {
              url: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });
}