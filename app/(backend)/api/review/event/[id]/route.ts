import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/app/(backend)/lib/prisma/prisma";


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Event ID is required" },
        { status: 400 },
      );
    }

    const { searchParams } = new URL(req.url);

    const rating = searchParams.get("rating") || "all";

    const sort =
      searchParams.get("sort") === "asc"
        ? "asc"
        : "desc";

    const page =
      Number(searchParams.get("page")) || 1;

    const limit =
      Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    // ---------------------------------------
    // Base Where
    // Used for overall statistics
    // ---------------------------------------

    const baseWhere: Prisma.EventReviewWhereInput = {
      eventId: id,
    };

    // ---------------------------------------
    // Filtered Where
    // Used for displayed reviews
    // ---------------------------------------

    const where: Prisma.EventReviewWhereInput = {
      ...baseWhere,
    };

    // ---------------------------------------
    // Rating Filter
    // ---------------------------------------

    if (rating !== "all") {
      const ratingNumber = Number(rating);

      if (
        Number.isInteger(ratingNumber) &&
        ratingNumber >= 1 &&
        ratingNumber <= 5
      ) {
        where.rating = ratingNumber;
      }
    }

    // ---------------------------------------
    // Queries
    // ---------------------------------------

    const [
      reviews,
      totalReviews,
      ratingAggregate,
    ] = await Promise.all([
      // Filtered reviews
      prisma.eventReview.findMany({
        where,

        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },

        orderBy: {
          createdAt: sort,
        },

        skip,
        take: limit,
      }),

      // Total filtered reviews
      prisma.eventReview.count({
        where,
      }),

      // Overall average rating
      // NOT affected by rating filter
      prisma.eventReview.aggregate({
        where: baseWhere,

        _avg: {
          rating: true,
        },
      }),
    ]);

    // ---------------------------------------
    // Response
    // ---------------------------------------

    return NextResponse.json({
      reviews,

      totalReviews,

      averageRating:
        ratingAggregate._avg.rating ?? 0,

      page,

      limit,

      totalPages: Math.ceil(
        totalReviews / limit,
      ),
    });
  } catch (error) {
    console.error(
      "Event reviews error:",
      error,
    );

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch event reviews",
      },
      { status: 500 },
    );
  }
}