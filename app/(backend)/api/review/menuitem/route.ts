import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";


export async function POST(req: NextRequest) {
  try {
    const user = await requireRole(req, ["CLIENT"]);

    // requireRole returns NextResponse when authentication/role fails
    if (user instanceof NextResponse) {
      return user;
    }

    const {
      menuItemId,
      rating,
      comment,
    } = await req.json();

    if (!menuItemId || rating === undefined) {
      return NextResponse.json(
        {
          error: "Menu item and rating are required",
        },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        {
          error: "Rating must be between 1 and 5",
        },
        { status: 400 }
      );
    }

    const menuItem = await prisma.menuItem.findUnique({
      where: {
        id: menuItemId,
      },
    });

    if (!menuItem) {
      return NextResponse.json(
        {
          error: "Menu item not found",
        },
        { status: 404 }
      );
    }

    const existingReview =
      await prisma.menuItemReview.findFirst({
        where: {
          userId: user.id,
          menuItemId,
        },
      });

    if (existingReview) {
      return NextResponse.json(
        {
          error: "You have already reviewed this menu item",
        },
        { status: 409 }
      );
    }

    const review = await prisma.menuItemReview.create({
      data: {
        userId: user.id,
        menuItemId,
        rating,
        comment: comment || null,
      },
    });

    return NextResponse.json(
      {
        message: "Review submitted successfully",
        review,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create review error:", error);

    return NextResponse.json(
      {
        error: "Failed to create review",
      },
      { status: 500 }
    );
  }
}

