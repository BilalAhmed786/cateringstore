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
        {
          message: "Authentication required",
        },
        { status: 401 },
      );
    }

    // ---------------------------------------
    // 2. Get request body
    // ---------------------------------------

    const body = await req.json();

    const { eventId, rating, comment } = body;

    if (!eventId) {
      return NextResponse.json(
        {
          message: "Event ID is required",
        },
        { status: 400 },
      );
    }

    // ---------------------------------------
    // 3. Validate rating
    // ---------------------------------------

    if (
      typeof rating !== "number" ||
      rating < 1 ||
      rating > 5
    ) {
      return NextResponse.json(
        {
          message: "Rating must be between 1 and 5",
        },
        { status: 400 },
      );
    }

    // ---------------------------------------
    // 4. Check event exists
    // ---------------------------------------

    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      return NextResponse.json(
        {
          message: "Event not found",
        },
        { status: 404 },
      );
    }

    // ---------------------------------------
    // 5. Check user purchased event
    // ---------------------------------------

    const purchased = await prisma.orderEvent.findFirst({
      where: {
        eventId,
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
            "You can only review an event that you have purchased and received.",
        },
        { status: 403 },
      );
    }

    // ---------------------------------------
    // 6. Check existing review
    // ---------------------------------------

    const existingReview =
      await prisma.eventReview.findUnique({
        where: {
          userId_eventId: {
            userId: user.id,
            eventId,
          },
        },
      });

    if (existingReview) {
      return NextResponse.json(
        {
          message: "You have already reviewed this event.",
        },
        { status: 409 },
      );
    }

    // ---------------------------------------
    // 7. Create review
    // ---------------------------------------

    const review = await prisma.eventReview.create({
      data: {
        userId: user.id,
        eventId,
        rating,
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

    // ---------------------------------------
    // 8. Return review
    // ---------------------------------------

    return NextResponse.json(
      {
        message: "Review submitted successfully",
        review,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CREATE EVENT REVIEW ERROR:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to create event review",
      },
      { status: 500 },
    );
  }
}