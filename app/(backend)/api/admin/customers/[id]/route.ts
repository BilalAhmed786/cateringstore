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
  { params }: RouteContext
) {
  try {
    const auth = await requireRole(req, ["ADMIN","SUPER_ADMIN"]);
           if (auth instanceof NextResponse) return auth;

    const { id } = await params;

    const customer = await prisma.user.findUnique({
      where: {
        id,
      },

      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,

        orders: {
          orderBy: {
            createdAt: "desc",
          },

          select: {
            id: true,
            status: true,
            total: true,
            createdAt: true,
            paymentIntentId: true,
          },
        },

        _count: {
          select: {
            orders: true,
          },
        },
      },
    });

    if (!customer) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error("GET CUSTOMER ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch customer" },
      { status: 500 }
    );
  }
}