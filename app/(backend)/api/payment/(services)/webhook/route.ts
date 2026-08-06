import { headers } from "next/headers";
import { NextResponse } from "next/server";

import prisma from "@/app/(backend)/lib/prisma/prisma";
import { stripe } from "@/app/(backend)/lib/stripe/stripe";
import { createOrder } from "../order/createOrder";

export async function POST(req: Request) {
  const body = await req.text();

  const headerList = await headers();
  const signature = headerList.get("stripe-signature");

  console.log("========== STRIPE WEBHOOK ==========");
  console.log("Body Length:", body.length);
  console.log("Signature Exists:", !!signature);
  console.log(
    "Webhook Secret Prefix:",
    process.env.STRIPE_WEBHOOK_SECRET?.substring(0, 12)
  );

  if (!signature) {
    return NextResponse.json(
      {
        message: "Missing Stripe-Signature header",
      },
      {
        status: 400,
      }
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log("Webhook Verified:", event.type);
  } catch (error) {
    console.error("Webhook verification failed");
    console.error(error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Invalid webhook signature",
      },
      {
        status: 400,
      }
    );
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object;

        console.log("PaymentIntent:", paymentIntent.id);

        const session = await prisma.checkoutSession.findUnique({
          where: {
            paymentIntentId: paymentIntent.id,
          },
        });

        if (!session) {
          console.log("Checkout session not found");
          break;
        }

        console.log("Checkout Session:", session.id);
        console.log("Checkout Status:", session.status);

        if (session.status === "COMPLETED") {
          console.log("Already processed");
          break;
        }

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

        console.log("Order Created");

        await prisma.checkoutSession.update({
          where: {
            paymentIntentId: paymentIntent.id,
          },
          data: {
            status: "COMPLETED",
          },
        });

        console.log("Checkout Session Updated");

        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object;

        console.log("Payment Failed:", paymentIntent.id);

        await prisma.checkoutSession.updateMany({
          where: {
            paymentIntentId: paymentIntent.id,
          },
          data: {
            status: "FAILED",
          },
        });

        break;
      }

      default:
        console.log("Unhandled Event:", event.type);
        break;
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error("Webhook Processing Error");
    console.error(error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Webhook processing failed",
      },
      {
        status: 500,
      }
    );
  }
}