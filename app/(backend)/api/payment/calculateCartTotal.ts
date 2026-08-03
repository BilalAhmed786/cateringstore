import { eventCalculator } from "./calculators/eventCalculator";
import { hamperCalculator } from "./calculators/hamperCalculator";
import { menuItemCalculator } from "./calculators/menuItemCalculator";
import { packageCalculator } from "./calculators/packageCalculator";
import { CheckoutItem } from "./types/type";

export async function calculateCartTotal(
  items: CheckoutItem[]
): Promise<number> {
  let total = 0;

  for (const item of items) {
    switch (item.type) {
      case "menuitem":
        total += await menuItemCalculator(item);
        break;

      case "package":
        total += await packageCalculator(item);
        break;

      case "hamper":
        total += await hamperCalculator(item);
        break;

      case "event":
        total += await eventCalculator(item);
        break;

      default:
        throw new Error(`Unknown item type: ${item.type}`);
    }
  }

  return total;
}


