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

export async function POST(req: NextRequest) {
  const userOrResponse = await requireRole(req, ["ADMIN"]);
  if (userOrResponse instanceof NextResponse) return userOrResponse;

  try {
    const body = await req.json();

    const {
      name,
      description,
      categoryId,
      discount,
      menuItems = [],
      packages = [],
    } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Event name is required" },
        { status: 400 }
      );
    }

    if (!categoryId) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }

    if (!menuItems.length && !packages.length) {
      return NextResponse.json(
        {
          error: "Select at least one menu item or package",
        },
        { status: 400 }
      );
    }

    // ---------------- Fetch Menu Item Prices ----------------

    const menuItemIds = menuItems.map(
      (m: { menuItemId: string }) => m.menuItemId
    );

    const dbMenuItems = await prisma.menuItem.findMany({
      where: {
        id: {
          in: menuItemIds,
        },
      },
      select: {
        id: true,
        price: true,
      },
    });

    // ---------------- Fetch Package Prices ----------------

    const packageIds = packages.map(
      (p: { packageId: string }) => p.packageId
    );

    const dbPackages = await prisma.package.findMany({
      where: {
        id: {
          in: packageIds,
        },
      },
      select: {
        id: true,
        finalPrice: true,
      },
    });

    // ---------------- Calculate Prices ----------------

    const menuTotal = menuItems.reduce(
      (
        total: number,
        item: { menuItemId: string; quantity: number }
      ) => {
        const dbItem = dbMenuItems.find(
          (m) => m.id === item.menuItemId
        );

        return total + (dbItem?.price ?? 0) * item.quantity;
      },
      0
    );

    const packageTotal = packages.reduce(
      (
        total: number,
        item: { packageId: string; quantity: number }
      ) => {
        const dbPackage = dbPackages.find(
          (p) => p.id === item.packageId
        );

        return total + (dbPackage?.finalPrice ?? 0) * item.quantity;
      },
      0
    );

    const originalPrice = menuTotal + packageTotal;

    let finalPrice = originalPrice;
    let discountType = null;
    let discountValue = null;

    if (
      discount &&
      discount.type &&
      discount.value &&
      Number(discount.value) > 0
    ) {
      discountType = discount.type;
      discountValue = Number(discount.value);

      if (discount.type === "PERCENTAGE") {
        finalPrice =
          originalPrice -
          (originalPrice * discountValue) / 100;
      } else if (discount.type === "FIXED") {
        finalPrice = originalPrice - discountValue;
      }

      finalPrice = Math.max(0, finalPrice);
    }

    // ---------------- Create Event ----------------

    const newEvent = await prisma.event.create({
      data: {
        name,
        description: description ?? null,

        categoryId,

        originalPrice,
        discountType,
        discountValue,
        finalPrice,

        menuItems: {
          create: menuItems.map(
            (m: {
              menuItemId: string;
              quantity: number;
            }) => ({
              menuItemId: m.menuItemId,
              quantity: m.quantity,
            })
          ),
        },

        packages: {
          create: packages.map(
            (p: {
              packageId: string;
              quantity: number;
            }) => ({
              packageId: p.packageId,
              quantity: p.quantity,
            })
          ),
        },
      },

      include: {
        menuItems: true,
        packages: true,
      },
    });

    return NextResponse.json(newEvent.id, {
      status: 201,
    });
  } catch (error) {
    console.error("CREATE EVENT ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to create event",
      },
      {
        status: 500,
      }
    );
  }
}
