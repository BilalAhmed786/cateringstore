import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { uid, email, name } = await req.json();

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { id: uid } });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 200 });
    }

    // Create new user
    const user = await prisma.user.create({
      data: {
        id: uid,
        email,
        name,
        role: "CLIENT", // default role
      },
    });

    return NextResponse.json({ user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
  }
}
