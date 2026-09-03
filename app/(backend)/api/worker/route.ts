import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "../../lib/prisma/prisma";
import { sendNotification } from "../../lib/notifications/sendNotification";

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

    // 1. Get CloudAMQP Webhook Headers
    const webhookId = request.headers.get("webhook-id");
    const webhookTimestamp = request.headers.get("webhook-timestamp");
    const webhookSignature = request.headers.get("webhook-signature");

    // 2. Signature Verification
    if (webhookSecret && webhookSignature && webhookId && webhookTimestamp) {
      // CloudAMQP constructs the payload as: "{id}.{timestamp}.{body}"
      const payloadToSign = `${webhookId}.${webhookTimestamp}.${rawBody}`;

      // Compute expected HMAC SHA256 signature (Base64 encoded)
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(payloadToSign)
        .digest("base64");

      // Extract all signatures from header (space-separated: "v1,sig1 v1,sig2")
      const signatures = webhookSignature
        .split(" ")
        .map((part) => part.replace(/^v1,/, ""));

      // Verify if at least one signature matches
      const isValid = signatures.some((sig) => {
        try {
          return crypto.timingSafeEqual(
            Buffer.from(sig),
            Buffer.from(expectedSignature)
          );
        } catch {
          return false;
        }
      });

      if (!isValid) {
        console.error("CloudAMQP signature verification failed!");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    // 3. Process Job Payload
    const job: NotificationJob = JSON.parse(rawBody);
    const { type, orderId, userId, customerName } = job;

    // Fetch Admin and Super Admin FCM Tokens
    const adminUsers = await prisma.user.findMany({
      where: { role: { in: ["ADMIN", "SUPER_ADMIN"] } },
      include: { fcmTokens: true },
    });

    const adminTokens = adminUsers.flatMap((user) =>
      user.fcmTokens.map((fcmToken) => fcmToken.token)
    );

    // Notify Admins
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

    // Notify Client
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

    // Return 200 OK -> Tells CloudAMQP to ACK & remove the message from the queue
    return NextResponse.json({ success: true, orderId }, { status: 200 });
  } catch (error) {
    console.error("Notification job failed:", error);
    return NextResponse.json(
      { error: "Failed to process notification" },
      { status: 500 }
    );
  }
}