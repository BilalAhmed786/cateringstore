import prisma from "@/app/(backend)/lib/prisma/prisma";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // 1. Get authenticated user
    const auth = await requireRole(req, ["CLIENT"]);

    if (auth instanceof NextResponse) {
      return auth;
    }

    const user = auth;

    // 2. Get request body
    const body = await req.json();

    const { packageId, rating, comment } = body;

    // 3. Validate input
    if (!packageId || rating === undefined) {
      return NextResponse.json(
        {
          message: "packageId and rating are required",
        },
        { status: 400 },
      );
    }

    const numericRating = Number(rating);

    if (
      !Number.isInteger(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return NextResponse.json(
        {
          message: "Rating must be an integer between 1 and 5",
        },
        { status: 400 },
      );
    }

    // 4. Check whether package exists
    const packageData = await prisma.package.findUnique({
      where: {
        id: packageId,
      },
    });

    if (!packageData) {
      return NextResponse.json(
        {
          message: "Package not found",
        },
        { status: 404 },
      );
    }

    // 5. Check whether user purchased this package
    //    and the order has been delivered
    const purchased = await prisma.orderPackage.findFirst({
      where: {
        packageId,
        order: {
          userId: user.id,
          status: "DELIVERED",
        },
      },
    });

    if (!purchased) {
      return NextResponse.json(
        {
          message: "You can only review packages you have purchased",
        },
        { status: 403 },
      );
    }

    // 6. Check if user already reviewed this package
    const existingReview = await prisma.packageReview.findUnique({
      where: {
        userId_packageId: {
          userId: user.id,
          packageId,
        },
      },
    });

    if (existingReview) {
      return NextResponse.json(
        {
          message: "You have already reviewed this package",
        },
        { status: 409 },
      );
    }

    // 7. Create review
    const review = await prisma.packageReview.create({
      data: {
        userId: user.id,
        packageId,
        rating: numericRating,
        comment: comment || null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Review created successfully",
        review,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create package review error:", error);

    return NextResponse.json(
      {
        message: "Failed to create package review",
      },
      { status: 500 },
    );
  }
}