import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { uid, email, name } = await req.json();

    if (!uid || !email) {
      return NextResponse.json(
        { message: "Invalid user data" },
        { status: 400 }
      );
    }

    const user = await prisma.user.upsert({
      where: { id: uid },
      update: {}, // nothing on login
      create: {
        id: uid,
        email,
        name,
        role: "CLIENT", // DEFAULT ROLE
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "OAuth failed" },
      { status: 500 }
    );
  }
}
