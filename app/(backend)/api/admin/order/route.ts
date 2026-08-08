import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";

export async function GET(req: NextRequest) {
    
    const auth = await requireRole(req, ["ADMIN"]);
    if (auth instanceof NextResponse) return auth;
     try {

    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
      select: {
        id: true,
        guestName: true,
        total: true,
        status: true,
        createdAt: true,
      },
    });

    const formattedOrders = orders.map((order) => ({
      id: order.id,
      customer: order.guestName,
      amount: `$${order.total.toFixed(2)}`,
      status: order.status,
      createdAt: order.createdAt,
    }));

    return NextResponse.json(formattedOrders);
  } catch (error) {
    console.error("Failed to fetch recent orders:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch recent orders",
      },
      { status: 500 }
    );
  }
}