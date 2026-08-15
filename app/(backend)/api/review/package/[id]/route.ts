import prisma from "@/app/(backend)/lib/prisma/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Package ID is required" },
        { status: 400 },
      );
    }

    const { searchParams } = new URL(req.url);

    const rating = searchParams.get("rating") || "all";
    const sort =
      searchParams.get("sort") === "asc"
        ? "asc"
        : "desc";

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    // ---------------------------------------
    // Base where
    // Used for overall statistics
    // ---------------------------------------

    const baseWhere: Prisma.PackageReviewWhereInput = {
      packageId: id,
    };

    // ---------------------------------------
    // Filtered where
    // Used for displayed reviews
    // ---------------------------------------

    const where: Prisma.PackageReviewWhereInput = {
      ...baseWhere,
    };

    // Rating filter
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
      prisma.packageReview.findMany({
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

      // Total reviews matching filter
      prisma.packageReview.count({
        where,
      }),

      // Overall average - NOT affected by filter
      prisma.packageReview.aggregate({
        where: baseWhere,

        _avg: {
          rating: true,
        },
      }),
    ]);

    return NextResponse.json({
      reviews,

      totalReviews,

      // Overall package rating
      averageRating:
        ratingAggregate._avg.rating ?? 0,

      page,
      limit,
      totalPages: Math.ceil(
        totalReviews / limit,
      ),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Failed to fetch package reviews",
      },
      { status: 500 },
    );
  }
}