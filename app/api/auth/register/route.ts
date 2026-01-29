import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { signJwt } from "@/lib/jwt/jwt";
import { getCurrentUser } from "@/lib/guard/getCurrentuser";

export async function POST(req: NextRequest) {
  try {
    // 1️⃣ Verify Firebase token & get current user
    const currentUser = await getCurrentUser(req);

    if (!currentUser) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid Firebase token" },
        { status: 401 }
      );
    }

    // 2️⃣ Check if user already exists in DB
    const existingUser = await prisma.user.findUnique({
      where: { id: currentUser.id },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // 3️⃣ Create new user in DB
    const user = await prisma.user.create({
      data: {
        id: currentUser.id,
        email: currentUser.email,
        name: currentUser.name || "No Name",
        role: "CLIENT",
      },
    });

    // 4️⃣ Generate app JWT
    const token = signJwt({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    // 5️⃣ Set JWT cookie
    const response = NextResponse.json({ user });
    response.cookies.set({
      name: "access_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
