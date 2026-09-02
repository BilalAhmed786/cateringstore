import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "../../lib/guard/roleGuard";
import { sendNotification } from "../../lib/notifications/sendNotification";
import prisma from "../../lib/prisma/prisma";

export async function POST(req: NextRequest) {
  try {
    // ---------------------------------------
    // Authentication
    // ---------------------------------------

    const auth = await requireRole(req, ["CLIENT"]);

    if (auth instanceof NextResponse) {
      return auth;
    }

    const userId = auth.id;

    // ---------------------------------------
    // Request body
    // ---------------------------------------

    const body = await req.json();

    const {
      eventType,
      guests,
      date,
      time,
      foodPreferences,
      name,
      email,
      phone,
      message,
    } = body;

    // ---------------------------------------
    // Basic validation
    // ---------------------------------------

    if (
      !eventType ||
      !guests ||
      !date ||
      !time ||
      !name ||
      !email ||
      !phone
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Required fields are missing",
        },
        { status: 400 },
      );
    }

    // ---------------------------------------
    // Create tasting inquiry
    // ---------------------------------------

    const inquiry = await prisma.tastingInquiry.create({
      data: {
        userId,
        eventType,
        guests,
        date: new Date(date),
        time,
        foodPreferences: foodPreferences ?? [], name,
        email,
        phone,
        message: message || null,
      },
    });

    // ---------------------------------------
    // Get Admin + Super Admin FCM tokens
    // ---------------------------------------

    const adminTokens = await prisma.fcmToken.findMany({
      where: {
        user: {
          role: {
            in: ["ADMIN", "SUPER_ADMIN"],
          },
        },
      },
      select: {
        token: true,
      },
    });

    // ---------------------------------------
    // Send notifications
    // ---------------------------------------

    if (adminTokens.length > 0) {
      await Promise.allSettled(
        adminTokens.map(({ token }) =>
          sendNotification({
            token,
            title: "New Tasting Inquiry",
            body: `${name} submitted a new tasting request.`,
            type: "NEW_TASTING_INQUIRY",
            inquiryId: inquiry.id,
          }),
        ),
      );
    }

    // ---------------------------------------
    // Response
    // ---------------------------------------

    return NextResponse.json(
      {
        success: true,
        message: "Tasting inquiry submitted successfully",
        data: inquiry,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("CREATE TASTING INQUIRY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit tasting inquiry",
      },
      { status: 500 },
    );
  }
}
