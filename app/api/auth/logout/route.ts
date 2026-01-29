import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ message: "Logged out successfully" });

    // Delete JWT cookie
    response.cookies.set({
      name: "access_token",
      value: "",          // clear the value
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,          // immediately expire
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
}
