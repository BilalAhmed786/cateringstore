import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { signJwt } from "@/app/(backend)/lib/jwt/jwt";

export async function POST(req: NextRequest) {
  try {
    const { uid, email, name } = await req.json();

    if (!uid || !email) {
      return NextResponse.json(
        { message: "Invalid user data" },
        { status: 400 }
      );
    }

    // Create or get user
    const user = await prisma.user.upsert({
      where: { id: uid },
      update: {}, // nothing on login
      create: {
        id: uid,
        email,
        name,
        role: "CLIENT",
      },
    });

    // Create JWT
    const token = signJwt({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    // Set cookie
    const response = NextResponse.json({ user });

    response.cookies.set({
      name: "access_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "OAuth failed" },
      { status: 500 }
    );
  }
}
