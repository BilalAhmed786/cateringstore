import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import { OrderStatus } from "@prisma/client";


export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole(req, ["ADMIN","SUPER_ADMIN"]);

  if (auth instanceof NextResponse) {
    return auth;
  }

  try {
    const { id } = await params;

    const body = await req.json();
    const { status } = body;

    if (!Object.values(OrderStatus).includes(status)) {
  return NextResponse.json(
    { message: "Invalid order status" },
    { status: 400 }
  );
}



    const existingOrder = await prisma.order.findUnique({
 
        where: {
        id,
      },
    });

    if (!existingOrder) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    const order = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
      select: {
        id: true,
        status: true,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Failed to update order status:", error);

    return NextResponse.json(
      {
        message: "Failed to update order status",
      },
      { status: 500 }
    );
  }
}


interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: RouteParams
) {
  try {
   const auth = await requireRole(req, ["ADMIN","SUPER_ADMIN"]);
      if (auth instanceof NextResponse) return auth;

    const { id } = await params;

    const order = await prisma.order.findUnique({
      where: {
        id,
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        items: {
          include: {
            menu: {
              include: {
                images: true,
              },
            },
          },
        },

        orderPackages: {
          include: {
            package: true,
          },
        },

        orderEvents: {
          include: {
            event: true,
          },
        },

        orderHampers: {
          include: {
            hamper: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error("GET ORDER ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch order" },
      { status: 500 }
    );
  }
}