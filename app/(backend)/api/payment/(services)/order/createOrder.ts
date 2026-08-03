import prisma from "@/app/(backend)/lib/prisma/prisma";
import { CheckoutSession } from "../../types/type";



export async function createOrder(session: CheckoutSession) {
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        userId: session.userId ?? null,

        guestName: session.fullName,
        guestEmail: session.email,
        guestPhone: session.phone,

        paymentIntentId: session.paymentIntentId,

        total: session.total,

        status: "PENDING",
      },
    });

    for (const item of session.cart) {
      switch (item.type) {
        case "menuitem":
          await tx.orderMenuItem.create({
            data: {
              orderId: order.id,
              menuId: item.id,
              quantity: item.quantity,
              price: item.price,
            },
          });
          break;

        case "package":
          await tx.orderPackage.create({
            data: {
              orderId: order.id,
              packageId: item.id,
              quantity: item.quantity,
              price: item.price,
            },
          });
          break;

        case "hamper":
          await tx.orderHamper.create({
            data: {
              orderId: order.id,
              hamperId: item.id,
              quantity: item.quantity,
              price: item.price,
            },
          });
          break;

        case "event":
          await tx.orderEvent.create({
            data: {
              orderId: order.id,
              eventId: item.id,
              quantity: item.quantity,
              price: item.price,
            },
          });
          break;
      }
    }

    return order;
  });
}