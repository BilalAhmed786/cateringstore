import prisma from "@/app/(backend)/lib/prisma/prisma";
import { CheckoutItem } from "../types/type";



export async function packageCalculator(
  item: CheckoutItem
): Promise<number> {
  const packageData = await prisma.package.findUnique({
    where: {
      id: item.id,
    },
    select: {
      originalPrice: true,
      discountType: true,
      discountValue: true,
      available: true,
    },
  });

  if (!packageData) {
    throw new Error("Package not found.");
  }

  if (!packageData.available) {
    throw new Error("Package unavailable.");
  }

  if (!Number.isInteger(item.quantity) || item.quantity < 1) {
    throw new Error("Invalid quantity.");
  }

  // ===========================
  // Normal Package
  // ===========================

  if (!item.selectedItems?.length) {
    return packageData.originalPrice * item.quantity;
  }

  // ===========================
  // Customized Package
  // ===========================

  const menuItems = await prisma.menuItem.findMany({
    where: {
      id: {
        in: item.selectedItems.map(
          (selected) => selected.menuItemId
        ),
      },
    },
    select: {
      id: true,
      price: true,
    },
  });

  const priceMap = new Map(
    menuItems.map((menuItem) => [
      menuItem.id,
      menuItem.price,
    ])
  );

  let subtotal = 0;

  for (const selectedItem of item.selectedItems) {
    const price = priceMap.get(selectedItem.menuItemId);

    if (price === undefined) {
      throw new Error(
        `Menu item ${selectedItem.menuItemId} not found.`
      );
    }

    subtotal += price * selectedItem.quantity;
  }

  let finalPrice = subtotal;

  switch (packageData.discountType) {
    case "PERCENTAGE":
      finalPrice -=
        subtotal * (packageData.discountValue ?? 0 / 100);
      break;

    case "FIXED":
      finalPrice -= packageData.discountValue ?? 0;
      break;

    default:
      break;
  }

  return finalPrice * item.quantity;
}