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

    const webhookSecret = process.env.CLOUDAMQP_SIGNING_SECRET;
    const signature = request.headers.get("x-cloudamqp-signature");

    // Compute expected HMAC signature
    const expectedSignature = webhookSecret
      ? crypto
          .createHmac("sha256", webhookSecret)
          .update(rawBody)
          .digest("hex")
      : null;

    // --- DEBUG LOGS (Check Vercel Runtime Logs) ---
    console.log("--- CLOUDAMQP DEBUG LOGS ---");
    console.log("Raw Body Length:", rawBody.length);
    console.log("Raw Body Content:", rawBody);
    console.log("Header x-cloudamqp-signature:", signature);
    console.log("Env Secret Defined?:", Boolean(webhookSecret));
    console.log("Env Secret Length:", webhookSecret?.length);
    console.log("Expected Signature:", expectedSignature);
    console.log("Match?:", signature === expectedSignature);
    console.log("-------------------------------");

    // 1. Validate Secret Header
    if (webhookSecret) {
      if (!signature) {
        console.error("DEBUG: Signature header is missing entirely from CloudAMQP request.");
        return NextResponse.json({ error: "Missing signature header" }, { status: 401 });
      }

      if (signature !== expectedSignature) {
        console.error("DEBUG: Signature mismatch detected!");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    } else {
      console.warn("DEBUG: CLOUDAMQP_SIGNING_SECRET is missing in process.env!");
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