import prisma from "@/app/(backend)/lib/prisma/prisma";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import { NextResponse } from "next/server";
// your auth helper

export async function POST(req: Request) {
  try {
    await requireRole(req, ["admin"]);

    const body = await req.json();

    const menuItem = await prisma.menuItem.create({
      data: {
        title: body.title,
        description: body.description,
        price: body.price,
        available: body.available,
        categoryId: body.categoryId,
      },
    });

    return NextResponse.json(menuItem, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }
}
