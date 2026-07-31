import prisma from "@/app/(backend)/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const skip = (page - 1) * limit;

    const [total, categories] = await Promise.all([
      prisma.menuCategory.count({
        where: { name: { contains: search, mode: "insensitive" } },
      }),
      prisma.menuCategory.findMany({
        where: { name: { contains: search, mode: "insensitive" } },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return NextResponse.json({ categories, total });
  } catch (err: unknown) {
    let message = "Server error";

    if (err instanceof Error) message = err.message;
    else if (typeof err === "string") message = err;

    console.error("GET /api/admin/category/paginated error:", err);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
