import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

import { calculateCartTotal } from "../../utils/calculateCartTotal";
import { stripe } from "@/app/(backend)/lib/stripe/stripe";
import prisma from "@/app/(backend)/lib/prisma/prisma";
import { getCurrentUser } from "@/app/(backend)/lib/guard/getCurrentuser";
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

    // ---------------------------------------
    // Get logged-in user if available
    // ---------------------------------------

    let user = null;

    try {
      user = await getCurrentUser(req);
    } catch (error) {
      console.log(error)
      // Guest user or invalid/expired Firebase token
      user = null;
    }

    // ---------------------------------------
    // Calculate total securely
    // ---------------------------------------

    const total = await calculateCartTotal(items);

    // ---------------------------------------
    // Create Stripe PaymentIntent
    // ---------------------------------------

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: Math.round(total * 100),
        currency: "usd",

        automatic_payment_methods: {
          enabled: true,
        },

        metadata: {
          ...(user?.id && {
            userId: user.id,
          }),

          fullName: customer.fullName,
          email: customer.email,
          phone: customer.phone,
        },
      },
      {
        // Works for BOTH guest and logged-in users
        idempotencyKey: crypto.randomUUID(),
      }
    );

    // ---------------------------------------
    // Save CheckoutSession
    // ---------------------------------------

    await prisma.checkoutSession.create({
      data: {
        paymentIntentId: paymentIntent.id,

        // Logged-in → user.id
        // Guest → null
        userId: user?.id,
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
    console.error("Checkout error:", error);

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