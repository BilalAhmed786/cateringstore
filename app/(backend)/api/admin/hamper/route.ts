import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import { NextRequest, NextResponse } from "next/server";
import { HamperBody } from "./types/types";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { Prisma } from "@prisma/client";
import { buildFilter } from "../../reusables/filters/filters";


export async function POST(req: Request) {
  try {
    const auth = await requireRole(req, ["ADMIN"]);
    if (auth instanceof NextResponse) return auth;

    const body = (await req.json()) as HamperBody;

    const {
      name,
      description,
      discount = 0,
      image,
      categoryId,
      items,
    } = body;

    if (!name || !items?.length) {
      return NextResponse.json(
        { message: "Invalid data" },
        { status: 400 }
      );
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

    const finalPrice =
      originalPrice - (originalPrice * discount) / 100;

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

    const where = buildFilter<Prisma.HamperWhereInput>(
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
      prisma.hamper.findMany({
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
      prisma.hamper.count({ where }),
    ]);

    /* -------------------- MAPPING -------------------- */

    const mappedItems = items.map((hamper) => ({
      ...hamper,
      totalItems: hamper.items.reduce(
        (sum, i) => sum + i.quantity,
        0
      ),
    }));

    return NextResponse.json({
      items: mappedItems,
      total,
    });

  } catch (error) {
    console.error("Hampers GET error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch hampers",
      },
      { status: 500 }
    );
  }

}