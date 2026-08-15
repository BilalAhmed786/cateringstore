import { buildRatingFilter } from "@/app/(backend)/lib/filters/buildRatingFilter";
import { buildSort } from "@/app/(backend)/lib/filters/buildSort";
import { getCurrentUser } from "@/app/(backend)/lib/guard/getCurrentuser";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";




export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Menu item ID is required" },
        { status: 400 },
      );
    }

    const { searchParams } = new URL(req.url);

    /* -----------------------------
       Review Filters
    ----------------------------- */

    const rating = searchParams.get("rating");
    const sort = searchParams.get("sort");

    /* -----------------------------
       Base Where
       Used for overall statistics
    ----------------------------- */

    const baseWhere = {
      menuItemId: id,
    };

    /* -----------------------------
       Filtered Where
    ----------------------------- */

    const where = {
      ...baseWhere,

      ...buildRatingFilter(rating),
    };

    /* -----------------------------
       Queries
    ----------------------------- */

    const [reviews, totalReviews, ratingAggregate] =
      await Promise.all([
        // Filtered reviews
        prisma.menuItemReview.findMany({
          where,

          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },

          orderBy: buildSort(sort,"rating"),
        }),

        // ALL reviews count
        prisma.menuItemReview.count({
          where: baseWhere,
        }),

        // ALL reviews average
        prisma.menuItemReview.aggregate({
          where: baseWhere,

          _avg: {
            rating: true,
          },
        }),
      ]);

    /* -----------------------------
       Can Review
    ----------------------------- */

    let canReview = false;

    const user = await getCurrentUser(req);

    if (user) {
      const purchased =
        await prisma.orderMenuItem.findFirst({
          where: {
            menuId: id,

            order: {
              userId: user.id,
              status: "DELIVERED",
            },
          },
        });

      const alreadyReviewed =
        await prisma.menuItemReview.findUnique({
          where: {
            userId_menuItemId: {
              userId: user.id,
              menuItemId: id,
            },
          },
        });

      canReview = !!purchased && !alreadyReviewed;
    }

    /* -----------------------------
       Response
    ----------------------------- */

    return NextResponse.json({
      reviews,
                  // Overall statistics, NOT affected by filter
      totalReviews,

      averageRating:ratingAggregate._avg.rating ?? 0,

      canReview,
    });
  } catch (error) {
    console.error(
      "Menu item reviews error:",
      error,
    );

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch reviews",
      },
      { status: 500 },
    );
  }
}