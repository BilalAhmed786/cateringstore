import { buildSearchFilter } from "@/app/(backend)/lib/filters/buildSearchFilter";
import { buildStatusFilter } from "@/app/(backend)/lib/filters/buildStatusFilter";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

const orderSearchFields = [
  "id",
  "guestName",
  "guestEmail",
  "guestPhone",
] as const;

export async function GET(req: NextRequest) {
  try {
    const auth = await requireRole(req, ["CLIENT"]);

    if (auth instanceof NextResponse) {
      return auth;
    }

    const userId = auth.id;

    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search");
    const status = searchParams.get("status");

    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1,
    );

    const limit = Math.min(
      Math.max(
        Number(searchParams.get("limit")) || 10,
        1,
      ),
      100,
    );

    const skip = (page - 1) * limit;

    const where = {
      userId,

      ...buildSearchFilter(
        search,
        orderSearchFields,
      ),

      ...buildStatusFilter(status,"status"),
    };

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          total: true,
          status: true,
          createdAt: true,
          guestName: true,
          guestEmail: true,
          guestPhone: true,
        },
      }),

      prisma.order.count({
        where,
      }),
    ]);

    return NextResponse.json({
      orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Client orders error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch client orders",
      },
      {
        status: 500,
      },
    );
  }
}