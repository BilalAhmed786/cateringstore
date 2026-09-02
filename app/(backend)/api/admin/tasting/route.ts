import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    const auth = await requireRole(req, [
      "ADMIN",
      "SUPER_ADMIN",
    ]);

    if (auth instanceof NextResponse) return auth;

    const { searchParams } = new URL(req.url);

    const page = Math.max(
      Number(searchParams.get("page")) || 1,
      1,
    );

    const limit = Math.max(
      Number(searchParams.get("limit")) || 10,
      1,
    );

    const search =
      searchParams.get("search")?.trim() || "";

    const status =
      searchParams.get("status") || "all";

    const skip = (page - 1) * limit;

    const where = {
      ...(status !== "all"
        ? {
            status: status as
              | "PENDING"
              | "CONFIRMED"
              | "COMPLETED"
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
              {
                phone: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                eventType: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {}),
    };

    const [inquiries, total] = await Promise.all([
      prisma.tastingInquiry.findMany({
        where,
        skip,
        take: limit,

        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.tastingInquiry.count({
        where,
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: inquiries,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(
      "GET ADMIN TASTING INQUIRIES ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch tasting inquiries",
      },
      { status: 500 },
    );
  }
}

