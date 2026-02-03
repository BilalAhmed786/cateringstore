import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const userOrResponse = await requireRole(req, ["ADMIN"]);
      if (userOrResponse instanceof NextResponse) return userOrResponse;
  const body = await req.json();
  const { name } = body;

  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

  const newCategory = await prisma.category.create({
    data: { name },
  });

  return NextResponse.json(newCategory);

}

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return NextResponse.json(categories);
}