import { headers } from "next/headers";
import { NextResponse } from "next/server";

import prisma from "@/app/(backend)/lib/prisma/prisma";
import { stripe } from "@/app/(backend)/lib/stripe/stripe";
import { createOrder } from "../../utils/order/createOrder";

export async function POST(req: Request) {
  // ---------------------------------------
  // 1. Check environment variables FIRST
  // ---------------------------------------

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is missing");

    return NextResponse.json(
      {
        message: "Stripe webhook is not configured",
      },
      {
        status: 500,
      }
    );
  }

  // ---------------------------------------
  // 2. Get raw request body
  // ---------------------------------------

  const body = await req.text();

  // ---------------------------------------
  // 3. Get Stripe signature
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
      }
    );
  }

  // ---------------------------------------
  // 4. Verify Stripe webhook
  // ---------------------------------------

  let event: import("stripe").default.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch (error) {
    console.error("Stripe webhook verification failed:", error);

    return NextResponse.json(
      {
        message: "Invalid webhook signature",
      },
      {
        status: 400,
      }
    );
  }

  // ---------------------------------------
  // 5. Handle successful payment
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
        console.error(
          "CheckoutSession not found:",
          paymentIntent.id
        );

        // Return 200 because Stripe delivered the event,
        // but there is no checkout session to process.
        return NextResponse.json({
          received: true,
          message: "Checkout session not found",
        });
      }

      // ---------------------------------------
      // Prevent duplicate processing
      // ---------------------------------------

      if (session.status === "COMPLETED") {
        console.log(
          "CheckoutSession already completed:",
          paymentIntent.id
        );

        return NextResponse.json({
          received: true,
          message: "Already processed",
        });
      }

      // ---------------------------------------
      // Create order
      // ---------------------------------------

      await createOrder({
        userId: null,

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

      console.log(
        "Order successfully created:",
        paymentIntent.id
      );
    } catch (error) {
      console.error(
        "Error processing successful payment:",
        error
      );

      // IMPORTANT:
      // Return 500 so Stripe knows processing failed
      // and can retry the webhook.
      return NextResponse.json(
        {
          message: "Order processing failed",
        },
        {
          status: 500,
        }
      );
    }
  }

  // ---------------------------------------
  // 6. Handle failed payment
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

      console.log(
        "CheckoutSession marked FAILED:",
        paymentIntent.id
      );
    } catch (error) {
      console.error(
        "Failed to update CheckoutSession:",
        error
      );

      return NextResponse.json(
        {
          message: "Failed to update checkout session",
        },
        {
          status: 500,
        }
      );
    }
  }

  // ---------------------------------------
  // 7. Tell Stripe we received the event
  // ---------------------------------------

  return NextResponse.json({
    received: true,
  });
} 