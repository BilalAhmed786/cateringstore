import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import { NextRequest, NextResponse } from "next/server";
import { HamperBody } from "./types/types";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { Prisma } from "@prisma/client";
import { buildSearchFilter } from "@/app/(backend)/lib/filters/buildSearchFilter";
import { buildCategoryFilter } from "@/app/(backend)/lib/filters/buildCategoryFilter";
import { buildStatusFilter } from "@/app/(backend)/lib/filters/buildStatusFilter";
import { buildDateFilter } from "@/app/(backend)/lib/filters/buildDateFilter";
import { buildPriceFilter } from "@/app/(backend)/lib/filters/buildPriceFilter";
import { buildSort } from "../../../lib/filters/buildSort";

export async function POST(req: NextRequest) {
  try {
    const auth = await requireRole(req, ["ADMIN"]);
    if (auth instanceof NextResponse) return auth;

    const body = (await req.json()) as HamperBody;

    const { name, description, discount = 0, image, categoryId, items } = body;

    if (!name || !items?.length) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    /* -------------------- GET MENU ITEM PRICES -------------------- */

    const menuItems = await prisma.menuItem.findMany({
      where: {
        id: { in: items.map((i) => i.menuItemId) },
      },
      select: {
        id: true,
        price: true,
      },
    });

    /* -------------------- CALCULATE ORIGINAL PRICE -------------------- */

    const originalPrice = items.reduce((sum, item) => {
      const menu = menuItems.find((m) => m.id === item.menuItemId);
      return sum + (menu?.price || 0) * item.quantity;
    }, 0);

    /* -------------------- FINAL PRICE -------------------- */

    const finalPrice = originalPrice - (originalPrice * discount) / 100;

    /* -------------------- CREATE HAMPER -------------------- */

    const createdHamper = await prisma.hamper.create({
      data: {
        name,
        description,
        image,
        categoryId,
        originalPrice,
        discountType: discount > 0 ? "PERCENTAGE" : null,
        discountValue: discount,
        finalPrice,

        items: {
          create: items.map((item) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
          })),
        },
      },
    });

    return NextResponse.json(createdHamper.id, { status: 201 });
  } catch (error) {
    console.error("Hamper create error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);

    const skip = (page - 1) * limit;

    /* -------------------- FILTERS -------------------- */

    const where: Prisma.HamperWhereInput = {
      AND: [
        buildSearchFilter(
          searchParams.get("search"),
          ["name", "description"],
        ),

        buildCategoryFilter(
          searchParams.get("category"),
        ),

        buildStatusFilter(
          searchParams.get("status"),
        ),

        buildDateFilter(
          searchParams.get("dateFilter"),
        ),

        buildPriceFilter(
          searchParams.get("minPrice"),
          searchParams.get("maxPrice"),
          "finalPrice",
        ),
      ].filter(Boolean) as Prisma.HamperWhereInput[],
    };

    /* -------------------- SORT -------------------- */

    const orderBy = buildSort(
      searchParams.get("sort"),
      "finalPrice",
      "createdAt",
    );

    /* -------------------- QUERY -------------------- */

    const [items, total] = await Promise.all([
      prisma.hamper.findMany({
        where,
        skip,
        take: limit,
        orderBy,

        include: {
          category: true,

          items: {
            include: {
              menuItem: true,
            },
          },

          _count: {
            select: {
              reviews: true,
            },
          },
        },
      }),

      prisma.hamper.count({
        where,
      }),
    ]);

    /* -------------------- RATINGS -------------------- */

    const hamperRatings =
      await prisma.hamperReview.groupBy({
        by: ["hamperId"],

        where: {
          hamperId: {
            in: items.map((hamper) => hamper.id),
          },
        },

        _avg: {
          rating: true,
        },
      });

    const ratingMap = new Map(
      hamperRatings.map((rating) => [
        rating.hamperId,
        rating._avg.rating ?? 0,
      ]),
    );

    /* -------------------- RESPONSE -------------------- */

    const mappedItems = items.map((hamper) => ({
      ...hamper,

      totalItems: hamper.items.reduce(
        (sum, item) => sum + item.quantity,
        0,
      ),

      averageRating:
        ratingMap.get(hamper.id) ?? 0,

      totalReviews:
        hamper._count.reviews,

      totalComments:
        hamper._count.reviews,
    }));

    return NextResponse.json({
      items: mappedItems,
      total,
    });
  } catch (error) {
    console.error("Hamper GET error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch hampers",
      },
      {
        status: 500,
      },
    );
  }
}
