// GET /api/reviews/testimonials

import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [menuItemReviews, packageReviews, hamperReviews, eventReviews] =
      await Promise.all([
        prisma.menuItemReview.findMany({
          include: {
            user: {
              select: {
                name: true,
              },
            },
            menuItem: {
              select: {
                title: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        }),

        prisma.packageReview.findMany({
          include: {
            user: {
              select: {
                name: true,
              },
            },
            package: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        }),

        prisma.hamperReview.findMany({
          include: {
            user: {
              select: {
                name: true,
              },
            },
            hamper: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        }),

        prisma.eventReview.findMany({
          include: {
            user: {
              select: {
                name: true,
              },
            },
            event: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        }),
      ]);

    const reviews = [
      ...menuItemReviews.map((review) => ({
        id: review.id,
        name: review.user.name ?? "Customer",
        review: review.comment,
        rating: review.rating,
        type: "MENU_ITEM",
        itemName: review.menuItem.title,
        createdAt: review.createdAt,
      })),

      ...packageReviews.map((review) => ({
        id: review.id,
        name: review.user.name ?? "Customer",
        review: review.comment,
        rating: review.rating,
        type: "PACKAGE",
        itemName: review.package.name,
        createdAt: review.createdAt,
      })),

      ...hamperReviews.map((review) => ({
        id: review.id,
        name: review.user.name ?? "Customer",
        review: review.comment,
        rating: review.rating,
        type: "HAMPER",
        itemName: review.hamper.name,
        createdAt: review.createdAt,
      })),

      ...eventReviews.map((review) => ({
        id: review.id,
        name: review.user.name ?? "Customer",
        review: review.comment,
        rating: review.rating,
        type: "EVENT",
        itemName: review.event.name,
        createdAt: review.createdAt,
      })),
    ];

    reviews.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    );

    return NextResponse.json({
      reviews,
    });
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch testimonials",
      },
      {
        status: 500,
      }
    );
  }
}