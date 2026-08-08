import prisma from "@/app/(backend)/lib/prisma/prisma";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import { NextRequest, NextResponse } from "next/server";
import { buildFilter } from "../../reusables/filters/filters";
import { Prisma } from "@prisma/client";

// your auth helper

export async function POST(req: NextRequest) {
  try {
    await requireRole(req, ["admin"]);

    const body = await req.json();

    const menuItem = await prisma.menuItem.create({
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
        available: body.available,
        categoryId: body.categoryId,
      },
    });

    return NextResponse.json(menuItem, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const skip = (page - 1) * limit;

    // New filters
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const sort = searchParams.get("sort");

    // Existing reusable filters
    const where = buildFilter<Prisma.MenuItemWhereInput>(
      {
        status: searchParams.get("status"),
        category: searchParams.get("category"),
        search: searchParams.get("search"),
        dateFilter: searchParams.get("dateFilter"),
      },
      {
        hasCategory: true,
        searchFields: ["title", "description"],
      },
    );

    // Price filter (only applied if sent)
    if (minPrice || maxPrice) {
      where.price = {};

      if (minPrice) {
        where.price.gte = Number(minPrice);
      }

      if (maxPrice) {
        where.price.lte = Number(maxPrice);
      }
    }

    // Default ordering remains unchanged
    const orderBy: Prisma.MenuItemOrderByWithRelationInput =
      sort === "asc"
        ? { price: "asc" }
        : sort === "desc"
          ? { price: "desc" }
          : { createdAt: "desc" };

    const [items, total] = await Promise.all([
      prisma.menuItem.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          category: true,
          images: true,
          reviews: true,
        },
      }),

      prisma.menuItem.count({
        where,
      }),
    ]);

    const itemsWithRatings = items.map((item) => {
      const totalReviews = item.reviews.length;

      const averageRating =
        totalReviews > 0
          ? item.reviews.reduce((sum, review) => sum + review.rating, 0) /
            totalReviews
          : 0;

      return {
        ...item,
        averageRating,
        totalReviews,
        totalComments: totalReviews,
      };
    });

    return NextResponse.json({
      items: itemsWithRatings,
      total,
    });
  } catch (error) {
    console.error("MenuItem GET error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Failed to fetch menu items",
      },
      {
        status: 500,
      },
    );
  }
}
