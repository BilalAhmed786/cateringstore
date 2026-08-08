import prisma from "@/app/(backend)/lib/prisma/prisma";
import { CheckoutItem } from "../../types/type";

export async function menuItemCalculator(
  item: CheckoutItem
): Promise<number> {
  const menuItem = await prisma.menuItem.findUnique({
    where: {
      id: item.id,
    },
    select: {
      price: true,
      available: true,
    },
  });

  if (!menuItem) {
    throw new Error("Menu item not found.");
  }

  if (!menuItem.available) {
    throw new Error("Menu item unavailable.");
  }

  if (!Number.isInteger(item.quantity) || item.quantity < 1) {
    throw new Error("Invalid quantity.");
  }

  return menuItem.price * item.quantity;
}