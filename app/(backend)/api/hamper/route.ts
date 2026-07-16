import { NextResponse } from "next/server";
import prisma from "../../lib/prisma/prisma";


export async function GET() {
  try {
    const categories = await prisma.hamperCategory.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 8,
      select: {
        id: true,
        name: true,
        image: true,
        publicId: true,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch featured hamper categories." },
      { status: 500 }
    );
  }
}