import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { signJwt } from "@/app/(backend)/lib/jwt/jwt";
import { getCurrentUser } from "@/app/(backend)/lib/guard/getCurrentuser";

export async function POST(req: NextRequest) {
  try {
    // 1 Verify Firebase token & get current user
    const {uid,name,email} = await req.json()
    
    const currentUser = await getCurrentUser(req);
   
    if (currentUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // 3 Create new user in DB
    const user = await prisma.user.create({
      data: {
        id: uid,
        email,
        name,
        role: "CLIENT",
      },
    });

    // 4 Generate app JWT
    const token = signJwt({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    // 5 Set JWT cookie
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
