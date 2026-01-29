import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/app/(backend)/lib/guard/getCurrentuser";

export async function GET(req: NextRequest) {
  try {

    const user = await getCurrentUser(req);

    if (!user) {
      return NextResponse.json({ error: "User not found or not authenticated" }, { status: 401 });
    }

   
    return NextResponse.json({ user });
  } catch (err) {
    console.error("Error verifying token:", err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
