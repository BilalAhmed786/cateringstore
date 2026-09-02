import { NextRequest, NextResponse } from "next/server";

import { TastingInquiryStatus } from "@prisma/client";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

// GET single tasting inquiry
export async function GET(
  req: NextRequest,
  context: RouteContext,
) {
  try {
    const auth = await requireRole(req, [
      "ADMIN",
      "SUPER_ADMIN",
    ]);

    if (auth instanceof NextResponse) {
      return auth;
    }

    const { id } = await context.params;

    const inquiry = await prisma.tastingInquiry.findUnique({
      where: {
        id,
      },
    });

    if (!inquiry) {
      return NextResponse.json(
        {
          success: false,
          message: "Tasting inquiry not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: inquiry,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "GET SINGLE TASTING INQUIRY ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch tasting inquiry",
      },
      { status: 500 },
    );
  }
}

// PATCH status
export async function PATCH(
  req: NextRequest,
  context: RouteContext,
) {
  try {
    // Only SUPER_ADMIN can update
    const auth = await requireRole(req, ["SUPER_ADMIN"]);

    if (auth instanceof NextResponse) {
      return auth;
    }

    const { id } = await context.params;

    const body: {
      status?: TastingInquiryStatus;
    } = await req.json();

    if (!body.status) {
      return NextResponse.json(
        {
          success: false,
          message: "Status is required",
        },
        { status: 400 },
      );
    }

    const validStatuses = [
      "PENDING",
      "CONFIRMED",
      "COMPLETED",
      "CANCELLED",
    ];

    if (!validStatuses.includes(body.status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid tasting inquiry status",
        },
        { status: 400 },
      );
    }

    const inquiry =
      await prisma.tastingInquiry.update({
        where: {
          id,
        },
        data: {
          status: body.status,
        },
      });

    return NextResponse.json(
      {
        success: true,
        message: "Tasting inquiry status updated",
        data: inquiry,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      "UPDATE TASTING STATUS ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update tasting inquiry status",
      },
      { status: 500 },
    );
  }
}