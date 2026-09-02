import { buildSearchFilter } from "@/app/(backend)/lib/filters/buildSearchFilter";
import { buildStatusFilter } from "@/app/(backend)/lib/filters/buildStatusFilter";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";


const tastingSearchFields = [
  "eventType",
  "name",
  "email",
  "phone",
  "message",
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
        tastingSearchFields,
      ),

      ...buildStatusFilter(
        status,
        "status",
      ),
    };

    const [inquiries, total] = await Promise.all([
      prisma.tastingInquiry.findMany({
        where,
        skip,
        take: limit,

        orderBy: {
          createdAt: "desc",
        },

        select: {
          id: true,
          eventType: true,
          guests: true,
          date: true,
          time: true,
          foodPreferences: true,
          name: true,
          email: true,
          phone: true,
          message: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      }),

      prisma.tastingInquiry.count({
        where,
      }),
    ]);

    return NextResponse.json({
      inquiries,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(
      "Client tasting inquiries error:",
      error,
    );

    return NextResponse.json(
      {
        message: "Failed to fetch tasting inquiries",
      },
      {
        status: 500,
      },
    );
  }
}