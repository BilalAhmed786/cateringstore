import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: RouteContext,
) {
  try {
    const auth = await requireRole(req, ["CLIENT"]);

    if (auth instanceof NextResponse) {
      return auth;
    }

    const { id } = await params;

    const tasting = await prisma.tastingInquiry.findFirst({
      where: {
        id,
        userId: auth.id,
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
    });

    if (!tasting) {
      return NextResponse.json(
        {
          message: "Tasting request not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(tasting);
  } catch (error) {
    console.error(
      "Get client tasting details error:",
      error,
    );

    return NextResponse.json(
      {
        message: "Failed to fetch tasting request",
      },
      {
        status: 500,
      },
    );
  }
}
