import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const userOrResponse = await requireRole(req, ["ADMIN"]);
      if (userOrResponse instanceof NextResponse) return userOrResponse;
  const { id } = params;
  const { name } = await req.json();

  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

  const updated = await prisma.category.update({
    where: { id },
    data: { name },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {

  const userOrResponse = await requireRole(req, ["ADMIN"]);
      if (userOrResponse instanceof NextResponse) return userOrResponse;
  const { id } = params;

  await prisma.category.delete({ where: { id } });

  return NextResponse.json({ success: true });
}



export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const userOrResponse = await requireRole(req, ["ADMIN"]);
      if (userOrResponse instanceof NextResponse) return userOrResponse;
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const category = await prisma.category.findUnique({
    where: { id },
    select: { id: true, name: true, createdAt: true }, 
  });

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json(category);
}


