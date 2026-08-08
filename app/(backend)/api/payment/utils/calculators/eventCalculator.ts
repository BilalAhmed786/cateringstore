import prisma from "@/app/(backend)/lib/prisma/prisma";
import { CheckoutItem } from "../../types/type";


export async function eventCalculator(
  item: CheckoutItem
): Promise<number> {
  const event = await prisma.event.findUnique({
    where: {
      id: item.id,
    },
    select: {
      originalPrice: true,
      available: true,
    },
  });

  if (!event) {
    throw new Error("Event not found.");
  }

  if (!event.available) {
    throw new Error("Event unavailable.");
  }

  if (!Number.isInteger(item.quantity) || item.quantity < 1) {
    throw new Error("Invalid quantity.");
  }

  return event.originalPrice * item.quantity;
}