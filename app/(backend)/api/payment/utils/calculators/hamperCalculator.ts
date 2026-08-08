import prisma from "@/app/(backend)/lib/prisma/prisma";
import { CheckoutItem } from "../../types/type";


export async function hamperCalculator(
  item: CheckoutItem
): Promise<number> {
  const hamper = await prisma.hamper.findUnique({
    where: {
      id: item.id,
    },
    select: {
      originalPrice: true,
      available: true,
    },
  });

  if (!hamper) {
    throw new Error("Hamper not found.");
  }

  if (!hamper.available) {
    throw new Error("Hamper unavailable.");
  }

  if (!Number.isInteger(item.quantity) || item.quantity < 1) {
    throw new Error("Invalid quantity.");
  }

  return hamper.originalPrice * item.quantity;
}