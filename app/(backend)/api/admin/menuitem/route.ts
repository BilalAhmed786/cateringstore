import prisma from "@/app/(backend)/lib/prisma/prisma";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { buildCategoryFilter } from "@/app/(backend)/lib/filters/buildCategoryFilter";
import { buildDateFilter } from "@/app/(backend)/lib/filters/buildDateFilter";
import { buildPriceFilter } from "@/app/(backend)/lib/filters/buildPriceFilter";
import { buildSearchFilter } from "@/app/(backend)/lib/filters/buildSearchFilter";
import { buildSort } from "@/app/(backend)/lib/filters/buildSort";
import { buildStatusFilter } from "@/app/(backend)/lib/filters/buildStatusFilter";


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

    // --------------------------------
    // Pagination
    // --------------------------------

    const page = Math.max(
      Number(searchParams.get("page") ?? 1),
      1,
    );

    const limit = Math.max(
      Number(searchParams.get("limit") ?? 10),
      1,
    );

    const skip = (page - 1) * limit;

    // --------------------------------
    // Filters
    // --------------------------------

    const where: Prisma.MenuItemWhereInput = {
      ...buildSearchFilter(
        searchParams.get("search"),
        ["title", "description"] as const,
      ),

      ...buildStatusFilter(
        searchParams.get("status"),
      ),

      ...buildCategoryFilter(
        searchParams.get("category"),
      ),

      ...buildDateFilter(
        searchParams.get("dateFilter"),
      ),

      ...buildPriceFilter(
        searchParams.get("minPrice"),
        searchParams.get("maxPrice"),
        "price",
      ),
    };

    // --------------------------------
    // Sorting
    // --------------------------------

    const orderBy =
      buildSort(
        searchParams.get("sort"),
        "price",
      ) as Prisma.MenuItemOrderByWithRelationInput;

    // --------------------------------
    // Database
    // --------------------------------

    const [items, total] = await Promise.all([
      prisma.menuItem.findMany({
        where,
        skip,
        take: limit,
        orderBy,

        include: {
          category: true,
          images: true,

          _count: {
            select: {
              reviews: true,
            },
          },
        },
      }),

      prisma.menuItem.count({
        where,
      }),
    ]);

    // --------------------------------
    // Ratings
    // --------------------------------

    const ratings = await prisma.menuItemReview.groupBy({
      by: ["menuItemId"],

      where: {
        menuItemId: {
          in: items.map((item) => item.id),
        },
      },

      _avg: {
        rating: true,
      },
    });

    const ratingMap = new Map(
      ratings.map((rating) => [
        rating.menuItemId,
        rating._avg.rating ?? 0,
      ]),
    );

    // --------------------------------
    // Response Mapping
    // --------------------------------

    const mappedItems = items.map((item) => ({
      ...item,

      averageRating: ratingMap.get(item.id) ?? 0,

      totalReviews: item._count.reviews,

      totalComments: item._count.reviews,
    }));

    // --------------------------------
    // Response
    // --------------------------------

    return NextResponse.json({
      items: mappedItems,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("MenuItem GET error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch menu items",
      },
      {
        status: 500,
      },
    );
  }
}