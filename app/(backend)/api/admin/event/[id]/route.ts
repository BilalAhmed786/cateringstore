import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userOrResponse = await requireRole(req, ["ADMIN"]);
  if (userOrResponse instanceof NextResponse) return userOrResponse;

  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const event = await prisma.event.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      createdAt: true,
    },
  });

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  return NextResponse.json(event);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userOrResponse = await requireRole(req, ["ADMIN"]);
  if (userOrResponse instanceof NextResponse) return userOrResponse;

  const { id } = await params;
  const body = await req.json();
  const { title, description, status } = body;

  if (!title) {
    return NextResponse.json(
      { error: "Title is required" },
      { status: 400 }
    );
  }

  const updated = await prisma.event.update({
    where: { id },
    data: {
      title,
      description: description ?? null,
      status,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userOrResponse = await requireRole(req, ["ADMIN"]);
  if (userOrResponse instanceof NextResponse) return userOrResponse;

  const { id } = await params;

  await prisma.event.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}

