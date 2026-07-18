import { GridItem } from "../../components/reusables/grid/gridtypes";
import { CartItem } from "../../components/reusables/types/types";

export interface CartStore {
  items: CartItem[];

  addItem: (item: GridItem) => void;

  removeItem: (id: string) => void;

  increase: (id: string) => void;

  decrease: (id: string) => void;

  clearCart: () => void;
}