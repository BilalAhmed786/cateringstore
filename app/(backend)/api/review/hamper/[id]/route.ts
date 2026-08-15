import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { buildRatingFilter } from "@/app/(backend)/lib/filters/buildRatingFilter";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { getCurrentUser } from "@/app/(backend)/lib/guard/getCurrentuser";
import { buildSort } from "@/app/(backend)/lib/filters/buildSort";


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // ---------------------------------------
    // Validate ID
    // ---------------------------------------

    if (!id) {
      return NextResponse.json(
        { message: "Hamper ID is required" },
        { status: 400 },
      );
    }

    const { searchParams } = new URL(req.url);

    // ---------------------------------------
    // Review Filters
    // ---------------------------------------

    const rating = searchParams.get("rating");
    const sort = searchParams.get("sort");

    // ---------------------------------------
    // Base Where
    // Used for overall statistics
    // ---------------------------------------

    const baseWhere: Prisma.HamperReviewWhereInput = {
      hamperId: id,
    };

    // ---------------------------------------
    // Filtered Where
    // ---------------------------------------

    const where: Prisma.HamperReviewWhereInput = {
      ...baseWhere,
      ...buildRatingFilter(rating),
    };

    // ---------------------------------------
    // Queries
    // ---------------------------------------

    const [
      reviews,
      filteredTotal,
      ratingAggregate,
      totalReviews,
    ] = await Promise.all([
      // Reviews after filters
      prisma.hamperReview.findMany({
        where,

        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },

        orderBy: buildSort(sort, "rating"),
      }),

      // Total filtered reviews
      prisma.hamperReview.count({
        where,
      }),

      prisma.hamperReview.aggregate({
        where: baseWhere,

        _avg: {
          rating: true,
        },
      }),
      
      prisma.hamperReview.count({
        where: baseWhere,
      }),
    ]);

    // ---------------------------------------
    // Can Review
    // ---------------------------------------

    let canReview = false;

    const user = await getCurrentUser(req);

    if (user) {
      // Check whether user purchased
      // and received the hamper
      const purchased =
        await prisma.orderHamper.findFirst({
          where: {
            hamperId: id,

            order: {
              userId: user.id,
              status: "DELIVERED",
            },
          },
        });

      // Check whether user already reviewed
      const alreadyReviewed =
        await prisma.hamperReview.findUnique({
          where: {
            userId_hamperId: {
              userId: user.id,
              hamperId: id,
            },
          },
        });

      canReview =
        !!purchased && !alreadyReviewed;
    }

    // ---------------------------------------
    // Response
    // ---------------------------------------

    return NextResponse.json({
      reviews,

      // Number of reviews matching filter
      filteredTotal,

      // Overall number of reviews
      totalReviews,

      // Overall average rating
      averageRating:
        ratingAggregate._avg.rating ?? 0,

      canReview,
    });
  } catch (error) {
    console.error(
      "Hamper reviews error:",
      error,
    );

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch hamper reviews",
      },
      { status: 500 },
    );
  }
}