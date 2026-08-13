import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import { EventBody } from "./types/type";
import { buildSearchFilter } from "@/app/(backend)/lib/filters/buildSearchFilter";
import { buildCategoryFilter } from "@/app/(backend)/lib/filters/buildCategoryFilter";
import { buildStatusFilter } from "@/app/(backend)/lib/filters/buildStatusFilter";
import { buildDateFilter } from "@/app/(backend)/lib/filters/buildDateFilter";
import { buildPriceFilter } from "@/app/(backend)/lib/filters/buildPriceFilter";
import { buildSort } from "../../../lib/filters/buildSort";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    /* -------------------- PAGINATION -------------------- */

    const page = Math.max(
      1,
      Number(searchParams.get("page") ?? 1)
    );

    const limit = Math.max(
      1,
      Number(searchParams.get("limit") ?? 10)
    );

    const skip = (page - 1) * limit;

    /* -------------------- QUERY PARAMS -------------------- */

    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const dateFilter = searchParams.get("dateFilter");

    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const sort = searchParams.get("sort");

    /* -------------------- WHERE -------------------- */

    const where: Prisma.EventWhereInput = {
      ...buildSearchFilter(search, ["name", "description"]),
      ...buildCategoryFilter(category, "categoryId"),
      ...buildStatusFilter(status, "available"),
      ...buildDateFilter(dateFilter),
      ...buildPriceFilter(
        minPrice,
        maxPrice,
      ),
    };

    /* -------------------- SORT -------------------- */

   const orderBy =
  buildSort(
    sort,
    "finalPrice",
    "createdAt",
  );

    /* -------------------- QUERY -------------------- */

    const [items, total] = await Promise.all([
      prisma.event.findMany({
        where,
        skip,
        take: limit,
        orderBy,

        include: {
          category: true,

          menuItems: {
            include: {
              menuItem: {
                include: {
                  images: true,
                },
              },
            },
          },

          packages: {
            include: {
              package: true,
            },
          },
        },
      }),

      prisma.event.count({
        where,
      }),
    ]);

    /* -------------------- RESPONSE -------------------- */

    return NextResponse.json({
      items,
      total,
      page,
      limit,
      hasMore: skip + items.length < total,
    });
  } catch (error) {
    console.error("Event GET error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch events",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await requireRole(req, ["ADMIN"]);
    if (auth instanceof NextResponse) return auth;

    const body = await req.json() as EventBody;
  
    const {
      name,
      description,
      categoryId,
      discount = 0,
      menuItems = [],
      packages = [],
    } = body;

    if (
      !name ||
      (!menuItems.length && !packages.length)
    ) {
      return NextResponse.json(
        { message: "Invalid data" },
        { status: 400 }
      );
    }

    /* -------------------- GET MENU ITEM PRICES -------------------- */

    const dbMenuItems = await prisma.menuItem.findMany({
      where: {
        id: {
          in: menuItems.map((item) => item.menuItemId),
        },
      },
      select: {
        id: true,
        price: true,
      },
    });

    /* -------------------- GET PACKAGE PRICES -------------------- */

    const dbPackages = await prisma.package.findMany({
      where: {
        id: {
          in: packages.map((item) => item.packageId),
        },
      },
      select: {
        id: true,
        finalPrice: true,
      },
    });

    /* -------------------- CALCULATE ORIGINAL PRICE -------------------- */

    const menuTotal = menuItems.reduce((sum, item) => {
      const menu = dbMenuItems.find(
        (m) => m.id === item.menuItemId
      );

      return sum + (menu?.price ?? 0) * item.quantity;
    }, 0);

    const packageTotal = packages.reduce((sum, item) => {
      const pkg = dbPackages.find(
        (p) => p.id === item.packageId
      );

      return sum + (pkg?.finalPrice ?? 0) * item.quantity;
    }, 0);

    const originalPrice = menuTotal + packageTotal;

    /* -------------------- FINAL PRICE -------------------- */

    const finalPrice =
      originalPrice - (originalPrice * discount) / 100;

    /* -------------------- CREATE EVENT -------------------- */

    const createdEvent = await prisma.event.create({
      data: {
        name,
        description,
        categoryId,

        originalPrice,
        discountType: discount > 0 ? "PERCENTAGE" : null,
        discountValue: discount,
        finalPrice,

        menuItems: {
          create: menuItems.map((item) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
          })),
        },

        packages: {
          create: packages.map((item) => ({
            packageId: item.packageId,
            quantity: item.quantity,
          })),
        },
      },
    });

    return NextResponse.json(createdEvent.id, {
      status: 201,
    });
  } catch (error) {
    console.error("CREATE EVENT ERROR:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
