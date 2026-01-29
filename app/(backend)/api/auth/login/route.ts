import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { signJwt } from "@/app/(backend)/lib/jwt/jwt";
import { getCurrentUser } from "@/app/(backend)/lib/guard/getCurrentuser"; // your helper

export async function POST(req: NextRequest) {
  try {
    // 1️⃣ Verify Firebase token and get current user
    const currentUser = await getCurrentUser(req);

    if (!currentUser) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid Firebase token" },
        { status: 401 }
      );
    }

    // 2️⃣ Fetch user from Postgres (already exists)
    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // 3️⃣ Create app JWT
    const token = signJwt({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    // 4️⃣ Set cookie
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
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Login failed" },
      { status: 500 }
    );
  }
}
