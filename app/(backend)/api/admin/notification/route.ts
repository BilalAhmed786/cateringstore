import { NextRequest, NextResponse } from "next/server";

import prisma from "@/app/(backend)/lib/prisma/prisma";
import { getCurrentUser } from "@/app/(backend)/lib/guard/getCurrentuser";


export async function POST(req: NextRequest) {
  try {
    
    const user = await getCurrentUser(req);

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 },
      );
    }

    const { token } = await req.json();

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { message: "FCM token is required" },
        { status: 400 },
      );
    }

    // Optional: only allow admin roles
    if (
      user.role !== "ADMIN" &&
      user.role !== "SUPER_ADMIN"
    ) {
      return NextResponse.json(
        { message: "Forbidden" },
        { status: 403 },
      );
    }

    // Create token or update existing token
    const fcmToken = await prisma.fcmToken.upsert({
      where: {
        token,
      },
      update: {
        userId: user.id,
      },
      create: {
        token,
        userId: user.id,
      },
    });

    return NextResponse.json(
      {
        message: "FCM token saved successfully",
        data: fcmToken,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Failed to save FCM token:", error);

    return NextResponse.json(
      { message: "Failed to save FCM token" },
      { status: 500 },
    );
  }
}