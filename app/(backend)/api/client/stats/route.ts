import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    const auth = await requireRole(req, ["CLIENT"]);

    if (auth instanceof NextResponse) {
      return auth;
    }

    const userId = auth.id;

    const [
      totalOrders,
      activeOrders,
      menuReviews,
      packageReviews,
      eventReviews,
      hamperReviews,
      tastingRequests,
    ] = await Promise.all([
      // Total orders
      prisma.order.count({
        where: {
          userId,
        },
      }),

      // Active orders
      prisma.order.count({
        where: {
          userId,
          status: {
            in: [
              "PENDING",
              "CONFIRMED",
              "COOKING",
            ],
          },
        },
      }),

      // Menu item reviews
      prisma.menuItemReview.count({
        where: {
          userId,
        },
      }),

      // Package reviews
      prisma.packageReview.count({
        where: {
          userId,
        },
      }),

      // Event reviews
      prisma.eventReview.count({
        where: {
          userId,
        },
      }),

      // Hamper reviews
      prisma.hamperReview.count({
        where: {
          userId,
        },
      }),

      // Tasting requests
      prisma.tastingInquiry.count({
        where: {
          userId,
        },
      }),
    ]);

    const myReviews =
      menuReviews +
      packageReviews +
      eventReviews +
      hamperReviews;

    return NextResponse.json({
      totalOrders,
      activeOrders,
      myReviews,
      tastingRequests,
    });
  } catch (error) {
    console.error("Client dashboard stats error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch client dashboard stats",
      },
      {
        status: 500,
      }
    );
  }
}