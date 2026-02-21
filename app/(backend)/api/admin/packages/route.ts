import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { CreatePackageBody } from "./types/type";
import { buildFilter } from "../../reusables/filters/filters";
import { Prisma } from "@prisma/client";



export async function POST(req: Request) {
  try {

      const auth = await requireRole(req, ["ADMIN"]);
      if (auth instanceof NextResponse) return auth;
    
      const body = await req.json() as CreatePackageBody;
      const { name, description, discount = 0, items } = body;

    if (!name || !items?.length) {
      return NextResponse.json(
        { message: "Invalid data" },
        { status: 400 }
      );
    }

    // Get menu item prices
    const menuItems = await prisma.menuItem.findMany({
      where: { id: { in: items.map((i) => i.menuItemId) } },
      select: { id: true, price: true },
    });

    const originalPrice = items.reduce((sum: number, item) => {
      const menu = menuItems.find((m) => m.id === item.menuItemId);
      return sum + (menu?.price || 0) * item.quantity;
    }, 0);

    const finalPrice = originalPrice - (originalPrice * discount) / 100;

    const createdPackage = await prisma.package.create({
      data: {
        name,
        description,
        originalPrice,
        discountType: discount > 0 ? "PERCENTAGE" : null,
        discountValue: discount,
        finalPrice,
        items: {
          create: items.map((i) => ({
            menuItemId: i.menuItemId,
            quantity: i.quantity,
          })),
        },
      },
    });

    return NextResponse.json(createdPackage, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}



export async function GET(req: NextRequest) {
  try {
    await requireRole(req, ["admin"]);

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 10);
    const skip = (page - 1) * limit;

    /* -------------------- FILTERS -------------------- */
   const where = buildFilter<Prisma.PackageWhereInput>(
  {
    status: searchParams.get("status"),
    search: searchParams.get("search"),
    dateFilter: searchParams.get("dateFilter"),
  },
  {
    searchFields: ["name", "description"],
  }
);
    /* -------------------- QUERY -------------------- */
    const [items, total] = await Promise.all([
      prisma.package.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          items: {
            include: {
              menuItem: true,
            },
          },
        },
      }),
      prisma.package.count({ where }),
    ]);

    const mappedItems = items.map((pkg) => ({
      ...pkg,
      totalItems: pkg.items.reduce(
        (sum, i) => sum + i.quantity,
        0
      ),
    }));

    return NextResponse.json({
      items: mappedItems,
      total,
    });
  } catch (error) {
    console.error("Package GET error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch packages",
      },
      { status: 500 }
    );
  }
}