import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextResponse } from "next/server";
import { CreatePackageBody } from "./types/type";


export async function POST(req: Request) {
  try {

      const auth = await requireRole(req, ["ADMIN"]);
      if (auth instanceof NextResponse) return auth;
    
      const body = await req.json() as CreatePackageBody;
      const { name, description, discount = 0, items } = body;

    if (!name || !items?.length) {
      return NextResponse.json(
        { message: "Invalid data" },
        { status: 400 }
      );
    }

    // Get menu item prices
    const menuItems = await prisma.menuItem.findMany({
      where: { id: { in: items.map((i) => i.menuItemId) } },
      select: { id: true, price: true },
    });

    const originalPrice = items.reduce((sum: number, item) => {
      const menu = menuItems.find((m) => m.id === item.menuItemId);
      return sum + (menu?.price || 0) * item.quantity;
    }, 0);

    const finalPrice = originalPrice - (originalPrice * discount) / 100;

    const createdPackage = await prisma.package.create({
      data: {
        name,
        description,
        originalPrice,
        discountType: discount > 0 ? "PERCENTAGE" : null,
        discountValue: discount,
        finalPrice,
        items: {
          create: items.map((i) => ({
            menuItemId: i.menuItemId,
            quantity: i.quantity,
          })),
        },
      },
    });

    return NextResponse.json(createdPackage, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
