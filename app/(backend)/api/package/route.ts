import { NextResponse } from "next/server";
import prisma from "../../lib/prisma/prisma";


export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      where: {
        available: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 8, // return up to 8 packages
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        publicId: true,
        finalPrice: true,
      },
    });

    return NextResponse.json(packages);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch featured packages." },
      { status: 500 }
    );
  }
}