import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    // ADMIN + SUPERADMIN can view customers
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

    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {};

    const [customers, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,

        select: {
          id: true,
          name: true,
          email: true,
          role:true,
          createdAt: true,

          _count: {
            select: {
              orders: true,
            },
          },
        },

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.user.count({
        where,
      }),
    ]);

    return NextResponse.json({
      customers,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error("GET CUSTOMERS ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}