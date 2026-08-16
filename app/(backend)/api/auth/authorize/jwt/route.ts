import { getJwtUser } from "@/app/(backend)/lib/guard/getJwtUser";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  try {
    const user = await getJwtUser(req);

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 },
      );
    }

    return NextResponse.json({
      user,
    });
  } catch (error) {
    console.error("Authorize error:", error);

    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }
}