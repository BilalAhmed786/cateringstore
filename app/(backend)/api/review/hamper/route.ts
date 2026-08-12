import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { getCurrentUser } from "@/app/(backend)/lib/guard/getCurrentuser";

export async function POST(req: NextRequest) {
  try {
    // ---------------------------------------
    // 1. Get authenticated user
    // ---------------------------------------

    const user = await getCurrentUser(req);

    if (!user) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 },
      );
    }

    // ---------------------------------------
    // 2. Get request body
    // ---------------------------------------

    const body = await req.json();

    const {
      hamperId,
      rating,
      comment,
    }: {
      hamperId: string;
      rating: number;
      comment?: string | null;
    } = body;

    // ---------------------------------------
    // 3. Validate input
    // ---------------------------------------

    if (!hamperId) {
      return NextResponse.json(
        { message: "Hamper ID is required" },
        { status: 400 },
      );
    }

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: "Rating must be between 1 and 5" },
        { status: 400 },
      );
    }

    // ---------------------------------------
    // 4. Check hamper exists
    // ---------------------------------------

    const hamper = await prisma.hamper.findUnique({
      where: {
        id: hamperId,
      },
      select: {
        id: true,
      },
    });

    if (!hamper) {
      return NextResponse.json(
        { message: "Hamper not found" },
        { status: 404 },
      );
    }

    // ---------------------------------------
    // 5. Check user purchased hamper
    // ---------------------------------------

    const purchased = await prisma.orderHamper.findFirst({
      where: {
        hamperId,

        order: {
          userId: user.id,
          status: "DELIVERED",
        },
      },
    });

    if (!purchased) {
      return NextResponse.json(
        {
          message:
            "You can only review a hamper that you have purchased and received.",
        },
        { status: 403 },
      );
    }

    // ---------------------------------------
    // 6. Check existing review
    // ---------------------------------------

    const alreadyReviewed =
      await prisma.hamperReview.findUnique({
        where: {
          userId_hamperId: {
            userId: user.id,
            hamperId,
          },
        },
      });

    if (alreadyReviewed) {
      return NextResponse.json(
        {
          message: "You have already reviewed this hamper.",
        },
        { status: 409 },
      );
    }

    // ---------------------------------------
    // 7. Create review
    // ---------------------------------------

    const review = await prisma.hamperReview.create({
      data: {
        userId: user.id,
        hamperId,
        rating,
        comment: comment?.trim() || null,
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

    // ---------------------------------------
    // 8. Return response
    // ---------------------------------------

    return NextResponse.json(
      {
        message: "Review submitted successfully",
        review,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create Hamper Review Error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to create hamper review",
      },
      { status: 500 },
    );
  }
}