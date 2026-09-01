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

    if (!id) {
      return NextResponse.json(
        {
          message: "Order ID is required",
        },
        {
          status: 400,
        },
      );
    }

    const order = await prisma.order.findFirst({
      where: {
        id,
        userId: auth.id,
      },
      select: {
        id: true,
        total: true,
        status: true,
        createdAt: true,
        guestName: true,
        guestEmail: true,
        guestPhone: true,
        notes: true,

        items: {
          select: {
            id: true,
            quantity: true,
            price: true,

            menu: {
              select: {
                id: true,
                title: true,
                images: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },

        orderPackages: {
          select: {
            id: true,
            quantity: true,
            price: true,

            package: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },

        orderHampers: {
          select: {
            id: true,
            quantity: true,
            price: true,

            hamper: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },

        orderEvents: {
          select: {
            id: true,
            quantity: true,
            price: true,

            event: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        {
          message: "Order not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json({
      order,
    });
  } catch (error) {
    console.error("Client single order error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch order",
      },
      {
        status: 500,
      },
    );
  }
}