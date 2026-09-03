import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendNotification } from "../../lib/notifications/sendNotification";
import prisma from "../../lib/prisma/prisma";


interface NotificationJob {
  type: string;
  orderId: string;
  userId?: string;
  customerName: string;
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();

    // 1. Validate Secret Header (Security)
    const webhookSecret = process.env.CLOUDAMQP_SIGNING_SECRET;
    if (webhookSecret) {
      const signature = request.headers.get("x-cloudamqp-signature");
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      if (signature !== expectedSignature) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    // 2. Parse job data
    const job: NotificationJob = JSON.parse(rawBody);
    const { type, orderId, userId, customerName } = job;

    // 3. Fetch admin + super admin tokens
    const adminUsers = await prisma.user.findMany({
      where: {
        role: {
          in: ["ADMIN", "SUPER_ADMIN"],
        },
      },
      include: {
        fcmTokens: true,
      },
    });

    const adminTokens = adminUsers.flatMap((user) =>
      user.fcmTokens.map((fcmToken) => fcmToken.token)
    );

    // 4. Send admin notifications
    await Promise.all(
      adminTokens.map(async (token) => {
        try {
          await sendNotification({
            token,
            title: "New Order",
            body: `New order from ${customerName}`,
            type,
            orderId,
          });
        } catch (error) {
          console.error("Admin notification failed:", error);
        }
      })
    );

    // 5. Send client notification
    if (userId) {
      const client = await prisma.user.findUnique({
        where: { id: userId },
        include: { fcmTokens: true },
      });

      const clientTokens =
        client?.fcmTokens.map((fcmToken) => fcmToken.token) ?? [];

      await Promise.all(
        clientTokens.map(async (token) => {
          try {
            await sendNotification({
              token,
              title: "Order Received",
              body: "Your order has been received successfully.",
              type: "ORDER_RECEIVED",
              orderId,
            });
          } catch (error) {
            console.error("Client notification failed:", error);
          }
        })
      );
    }

    return NextResponse.json({ success: true, orderId }, { status: 200 });
  } catch (error) {
    console.error("Notification job failed:", error);
    return NextResponse.json(
      { error: "Failed to process notification" },
      { status: 500 }
    );
  }
}