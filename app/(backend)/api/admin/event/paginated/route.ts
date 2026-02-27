import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/app/(backend)/lib/guard/roleGuard";

export async function GET(req: NextRequest) {
  try {
    const userOrResponse = await requireRole(req, ["ADMIN"]);
    if (userOrResponse instanceof NextResponse) return userOrResponse;

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const skip = (page - 1) * limit;

    const [total, events] = await Promise.all([
      prisma.event.count({
        where: { title: { contains: search, mode: "insensitive" } },
      }),
      prisma.event.findMany({
        where: { title: { contains: search, mode: "insensitive" } },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

    return NextResponse.json({ events, total });
  } catch (err: unknown) {
    let message = "Server error";

    if (err instanceof Error) message = err.message;
    else if (typeof err === "string") message = err;

    console.error("GET /api/admin/event/paginated error:", err);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

