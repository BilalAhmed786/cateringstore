import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import { OrderStatus } from "@prisma/client";


export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole(req, ["ADMIN"]);

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