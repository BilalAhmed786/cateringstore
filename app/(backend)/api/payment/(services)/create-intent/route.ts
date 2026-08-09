import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { calculateCartTotal } from "../../utils/calculateCartTotal";
import { stripe } from "@/app/(backend)/lib/stripe/stripe";
import prisma from "@/app/(backend)/lib/prisma/prisma";


export async function POST(req: NextRequest) {
  try {
    const { customer, items } = await req.json();

    if (!customer || !items?.length) {
      return NextResponse.json(
        {
          message: "Customer and cart items are required.",
        },
        {
          status: 400,
        }
      );
    }

    // Calculate total securely from the database
    const total = await calculateCartTotal(items);

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: Math.round(total * 100),
        currency: "usd",

        automatic_payment_methods: {
          enabled: true,
        },

        metadata: {
          fullName: customer.fullName,
          email: customer.email,
          phone: customer.phone,
        },
      },
      {
        idempotencyKey: crypto.randomUUID(),
      }
    );

    // Save temporary checkout session
    await prisma.checkoutSession.create({
      data: {
        paymentIntentId: paymentIntent.id,
        userId:customer.userId,
        fullName: customer.fullName,
        email: customer.email,
        phone: customer.phone,
        notes: customer.notes,
        cart: items,
        total,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Unable to create payment intent.",
      },
      {
        status: 500,
      }
    );
  }
}