import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { CreatePackageBody } from "../types/type";


export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    // This will automatically delete related PackageItems
    await prisma.package.delete({ where: { id } });

    return NextResponse.json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error("DELETE Package error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete package",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole(req, ["ADMIN"]);

    const { id } = await params;
    const body = await req.json() as CreatePackageBody;

    const existingPackage = await prisma.package.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!existingPackage) {
      return NextResponse.json({ message: "Package not found" }, { status: 404 });
    }

    let originalPrice = existingPackage.originalPrice;
    let finalPrice = existingPackage.finalPrice;

    // If items are updated, recalc price
    if (body.items?.length) {
      const menuItems = await prisma.menuItem.findMany({
        where: { id: { in: body.items.map(i => i.menuItemId) } },
        select: { id: true, price: true },
      });

      originalPrice = body.items.reduce((sum, item) => {
        const menu = menuItems.find(m => m.id === item.menuItemId);
        return sum + (menu?.price || 0) * item.quantity;
      }, 0);

      finalPrice = originalPrice - ((originalPrice * (body.discount ?? existingPackage.discountValue)) / 100);
    }

    const updatedPackage = await prisma.package.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        discountValue: body.discount,
        discountType: body.discount && body.discount > 0 ? "PERCENTAGE" : null,
        originalPrice,
        finalPrice,
        available: body.available,
        items: body.items?.length
          ? {
              deleteMany: {}, 
              create: body.items.map(i => ({ menuItemId: i.menuItemId, quantity: i.quantity })),
            }
          : undefined,
      },
    });

    return NextResponse.json(updatedPackage);
  } catch (error) {
    console.error("Update package error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to update package" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const packageData = await prisma.package.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            menuItem: {
              select: {
                id: true,
                title: true,
                price: true,
                images: true,
              },
            },
          },
        },
      },
    });

    if (!packageData) {
      return NextResponse.json(
        { message: "Package not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(packageData);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch package details" },
      { status: 500 },
    );
  }
}
