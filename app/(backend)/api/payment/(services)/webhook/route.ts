import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/app/(backend)/lib/prisma/prisma";
import { stripe } from "@/app/(backend)/lib/stripe/stripe";
import { createOrder } from "../../utils/order/createOrder";
import { sendNotification } from "@/app/(backend)/lib/notifications/sendNotification";

export async function POST(req: NextRequest) {
  const body = await req.text();

  // ---------------------------------------
  // 1. Get Stripe signature
  // ---------------------------------------

  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    console.error("stripe-signature header is missing");

    return NextResponse.json(
      {
        message: "Missing Stripe Signature",
      },
      {
        status: 400,
      },
    );
  }

  // ---------------------------------------
  // 2. Verify Stripe webhook
  // ---------------------------------------

  let event: import("stripe").default.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    console.error("Stripe webhook verification failed:", error);

    return NextResponse.json(
      {
        message: "Invalid webhook signature",
      },
      {
        status: 400,
      },
    );
  }

  // ---------------------------------------
  // 3. Handle successful payment
  // ---------------------------------------

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    try {
      const session = await prisma.checkoutSession.findUnique({
        where: {
          paymentIntentId: paymentIntent.id,
        },
      });

      if (!session) {
        console.error("CheckoutSession not found:", paymentIntent.id);

        return NextResponse.json({
          received: true,
          message: "Checkout session not found",
        });
      }

      // ---------------------------------------
      // Prevent duplicate processing
      // ---------------------------------------

      if (session.status === "COMPLETED") {
        console.log("CheckoutSession already completed:", paymentIntent.id);

        return NextResponse.json({
          received: true,
          message: "Already processed",
        });
      }

      // ---------------------------------------
      // Create order
      // ---------------------------------------

      const order = await createOrder({
        userId: session.userId,
        fullName: session.fullName,
        email: session.email,
        phone: session.phone,
        notes: session.notes,
        paymentIntentId: session.paymentIntentId,
        total: session.total,
        cart: session.cart as never,
      });

      // ---------------------------------------
      // Mark checkout session completed
      // ---------------------------------------

      await prisma.checkoutSession.update({
        where: {
          paymentIntentId: paymentIntent.id,
        },
        data: {
          status: "COMPLETED",
        },
      });

      // ---------------------------------------
      // Get Admin + Super Admin FCM tokens
      // ---------------------------------------

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
        user.fcmTokens.map((fcmToken) => fcmToken.token),
      );

      // ---------------------------------------
      // Send notification to Admin + Super Admin
      // ---------------------------------------

      for (const token of adminTokens) {
        try {
          await sendNotification({
            token,
            title: "New Order",
            body: `New order from ${session.fullName}`,
            type: "NEW_ORDER",
            orderId: order.id,
          });
        } catch (error) {
          console.error("Failed to notify admin FCM token:", token, error);
        }
      }

      // ---------------------------------------
      // Get Client FCM tokens
      // ---------------------------------------

      if (order.userId) {
        const client = await prisma.user.findUnique({
          where: {
            id: order.userId,
          },
          include: {
            fcmTokens: true,
          },
        });

        const clientTokens =
          client?.fcmTokens.map((fcmToken) => fcmToken.token) ?? [];

        // ---------------------------------------
        // Send notification to Client
        // ---------------------------------------

        for (const token of clientTokens) {
          try {
            await sendNotification({
              token,
              title: "Order Received",
              body: "Your order has been received successfully.",
              type: "ORDER_RECEIVED",
              orderId: order.id,
            });
          } catch (error) {
            console.error("Failed to notify client FCM token:", token, error);
          }
        }
      }

      console.log("Order successfully created:", paymentIntent.id);
    } catch (error) {
      console.error("Error processing successful payment:", error);

      return NextResponse.json(
        {
          message: "Order processing failed",
        },
        {
          status: 500,
        },
      );
    }
  }

  // ---------------------------------------
  // 4. Handle failed payment
  // ---------------------------------------

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object;

    try {
      await prisma.checkoutSession.updateMany({
        where: {
          paymentIntentId: paymentIntent.id,
        },
        data: {
          status: "FAILED",
        },
      });

      console.log("CheckoutSession marked FAILED:", paymentIntent.id);
    } catch (error) {
      console.error("Failed to update CheckoutSession:", error);

      return NextResponse.json(
        {
          message: "Failed to update checkout session",
        },
        {
          status: 500,
        },
      );
    }
  }

  // ---------------------------------------
  // 5. Tell Stripe we received the event
  // ---------------------------------------

  return NextResponse.json({
    received: true,
  });
}
