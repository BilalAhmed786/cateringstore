import prisma from "@/app/(backend)/lib/prisma/prisma";
import { CheckoutSession } from "../../types/type";

export async function createOrder(session: CheckoutSession) {
  return prisma.$transaction(async (tx) => {
    /* -------------------- CHECK DUPLICATE ORDER -------------------- */

    const existingOrder = await tx.order.findUnique({
      where: {
        paymentIntentId: session.paymentIntentId,
      },
    });

    if (existingOrder) {
      return existingOrder;
    }

    /* -------------------- CREATE ORDER -------------------- */

    const order = await tx.order.create({
      data: {
        userId: session.userId ?? null,

        guestName: session.fullName,
        guestEmail: session.email,
        guestPhone: session.phone,
        notes: session.notes,

        paymentIntentId: session.paymentIntentId,

        total: session.total,

        status: "PENDING",
      },
    });

    /* -------------------- CREATE ORDER ITEMS -------------------- */

    for (const item of session.cart) {
      const price = item.finalPrice ?? item.price;

      if (price === undefined) {
        throw new Error(`Price missing for item ${item.id}`);
      }

      switch (item.type) {
        case "menuitem":
          await tx.orderMenuItem.create({
            data: {
              orderId: order.id,
              menuId: item.id,
              quantity: item.quantity,
              price,
            },
          });
          break;

        case "package":
          await tx.orderPackage.create({
            data: {
              orderId: order.id,
              packageId: item.id,
              quantity: item.quantity,
              price,
            },
          });
          break;

        case "hamper":
          await tx.orderHamper.create({
            data: {
              orderId: order.id,
              hamperId: item.id,
              quantity: item.quantity,
              price,
            },
          });
          break;

        case "event":
          await tx.orderEvent.create({
            data: {
              orderId: order.id,
              eventId: item.id,
              quantity: item.quantity,
              price,
            },
          });
          break;
      }
    }

    return order;
  });
}
