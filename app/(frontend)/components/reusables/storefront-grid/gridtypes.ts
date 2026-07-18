import { GridItem } from "../grid/gridtypes";

export interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export interface ProductCardProps {
  item: GridItem;
}

export interface StorefrontGridProps {
  items: GridItem[];
  isLoading?: boolean;
}