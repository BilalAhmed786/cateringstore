import { NextRequest, NextResponse } from "next/server";

import { Prisma } from "@prisma/client";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { buildFilter } from "../../reusables/filters/filters";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";

export async function GET(req: NextRequest) {
  try {
    await requireRole(req, ["admin"]);

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const skip = (page - 1) * limit;

    const where = buildFilter<Prisma.EventWhereInput>(
      {
        status: searchParams.get("status"),
        category: searchParams.get("category"),
        search: searchParams.get("search"),
        dateFilter: searchParams.get("dateFilter"),
      },
      {
        hasCategory: true,
        searchFields: ["name", "description"],
      }
    );

    const [items, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          category: true,
          reviews: true,
        },
      }),
      prisma.event.count({ where }),
    ]);

    // Optional: rating aggregation (same style as MenuItem)
    const itemsWithRatings = items.map((event) => {
      const totalReviews = event.reviews.length;
      const averageRating =
        totalReviews > 0
          ? event.reviews.reduce((sum, r) => sum + r.rating, 0) /
            totalReviews
          : 0;

      return {
        ...event,
        averageRating,
        totalReviews,
      };
    });

    return NextResponse.json({ items: itemsWithRatings, total });
  } catch (error) {
    console.error("Event GET error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch events",
      },
      { status: 500 }
    );
  }
}