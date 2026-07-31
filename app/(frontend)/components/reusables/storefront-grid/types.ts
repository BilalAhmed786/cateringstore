import { ReactNode } from "react";
import { GridItem } from "../grid/gridtypes";
import { Package } from "@/app/(frontend)/admin/packages/types/type";
import { Hamper } from "@/app/(frontend)/admin/hampers/types/type";





export type StorefrontType =
  | "menu"
  | "package"
  | "hamper"
  | "event";


export interface ProductCardProps {
  item: GridItem;
  type:string;
  onClick?: () => void;
  renderSubtitle?: (item: GridItem) => ReactNode;
  renderActions?: (item: GridItem) => ReactNode;
}

export interface StorefrontGridProps {
  items: GridItem[];
  type:string;
  isLoading: boolean;
  onItemClick?: (item: GridItem) => void;
  renderSubtitle?: (
    item: GridItem
  ) => ReactNode;

  renderActions?: (
    item: GridItem
  ) => ReactNode;
}



export interface ProductDetailsSheetProps {
  data?:Package | Hamper;
  isLoading: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}