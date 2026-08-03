import { headers } from "next/headers";
import { NextResponse } from "next/server";

import prisma from "@/app/(backend)/lib/prisma/prisma";
import { stripe } from "@/app/(backend)/lib/stripe/stripe";
import { createOrder } from "../order/createOrder";


export async function POST(req: Request) {
  const body = await req.text();

  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      {
        message: "Missing Stripe Signature",
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
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Invalid webhook signature",
      },
      {
        status: 400,
      }
    );
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;

      const session = await prisma.checkoutSession.findUnique({
        where: {
          paymentIntentId: paymentIntent.id,
        },
      });

      if (!session) break;

      if (session.status === "COMPLETED") break;

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

      await prisma.checkoutSession.update({
        where: {
          paymentIntentId: paymentIntent.id,
        },
        data: {
          status: "COMPLETED",
        },
      });

      break;
    }

    case "payment_intent.payment_failed": {
      await prisma.checkoutSession.updateMany({
        where: {
          paymentIntentId: event.data.object.id,
        },
        data: {
          status: "FAILED",
        },
      });

      break;
    }

    default:
      break;
  }

  return NextResponse.json({
    received: true,
  });
}