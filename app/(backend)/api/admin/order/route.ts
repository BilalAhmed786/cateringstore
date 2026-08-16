import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";


export async function GET(req: NextRequest) {
  try {
     const auth = await requireRole(req, ["ADMIN","SUPER_ADMIN"]);
      if (auth instanceof NextResponse) return auth;
   

    const { searchParams } = new URL(req.url);

    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1
    );

    const limit = Math.max(
      Number(searchParams.get("limit")) || 10,
      1
    );

    const search = searchParams.get("search")?.trim() || "";

    const status = searchParams.get("status") || "all";

    const skip = (page - 1) * limit;

    const where = {
      ...(status !== "all"
        ? {
            status: status as
              | "PENDING"
              | "CONFIRMED"
              | "COOKING"
              | "DELIVERED"
              | "CANCELLED",
          }
        : {}),

      ...(search
        ? {
            OR: [
              {
                id: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                guestName: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                guestEmail: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                guestPhone: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                user: {
                  name: {
                    contains: search,
                    mode: "insensitive" as const,
                  },
                },
              },
              {
                user: {
                  email: {
                    contains: search,
                    mode: "insensitive" as const,
                  },
                },
              },
            ],
          }
        : {}),
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
          userId: true,
          status: true,
          total: true,
          createdAt: true,

          guestName: true,
          guestEmail: true,
          guestPhone: true,

          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
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
    console.error("GET ADMIN ORDERS ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}