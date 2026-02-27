import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const userOrResponse = await requireRole(req, ["ADMIN"]);
  if (userOrResponse instanceof NextResponse) return userOrResponse;

  const body = await req.json();
  const { title, description, status } = body;

  if (!title) {
    return NextResponse.json(
      { error: "Title is required" },
      { status: 400 }
    );
  }

  const newEvent = await prisma.event.create({
    data: {
      title,
      description: description ?? null,
      status,
    },
  });

  return NextResponse.json(newEvent);
}

export async function GET() {
  const events = await prisma.event.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      createdAt: true,
    },
  });

  return NextResponse.json(events);
}

