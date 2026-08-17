import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";


const allowedRoles = [
  "CLIENT",
  "ADMIN",
  "SUPER_ADMIN",
] as const;

type CustomerRole = (typeof allowedRoles)[number];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Only SUPERADMIN can update roles
     const auth = await requireRole(req, ["SUPER_ADMIN"]);
        if (auth instanceof NextResponse) return auth;


 

    const { id } = await params;

    const body = await req.json();

    const { role } = body as {
      role?: CustomerRole;
    };

    // Validate role
    if (!role || !allowedRoles.includes(role)) {
      return NextResponse.json(
        {
          message: "Invalid role",
        },
        { status: 400 }
      );
    }

    // Check customer exists
    const customer = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!customer) {
      return NextResponse.json(
        {
          message: "Customer not found",
        },
        { status: 404 }
      );
    }

    // Optional: prevent changing your own role
    if (customer.id === auth.id) {
      return NextResponse.json(
        {
          message: "You cannot change your own role",
        },
        { status: 400 }
      );
    }

    // Update role
    const updatedCustomer = await prisma.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error("UPDATE CUSTOMER ROLE ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to update customer role",
      },
      { status: 500 }
    );
  }
}