import { ReactNode } from "react";
import { FieldValues } from "react-hook-form";

import { GridItem } from "../grid/gridtypes";
import { Package } from "@/app/(frontend)/admin/packages/types/type";

export type StorefrontType =
  | "menu"
  | "package"
  | "hamper"
  | "event";

/* -------------------------------- */
/* Product Card */
/* -------------------------------- */

export interface ProductCardProps {
  item: GridItem;
  type: StorefrontType;
  onClick?: () => void;
  renderSubtitle?: (item: GridItem) => ReactNode;
  renderActions?: (item: GridItem) => ReactNode;
}

/* -------------------------------- */
/* Storefront Grid */
/* -------------------------------- */

export interface StorefrontGridProps {
  items: GridItem[];
  type: StorefrontType;
  isLoading: boolean;
  onItemClick?: (item: GridItem) => void;
  renderSubtitle?: (item: GridItem) => ReactNode;
  renderActions?: (item: GridItem) => ReactNode;
}

/* -------------------------------- */
/* Product Details */
/* -------------------------------- */

export interface ProductImage {
  id: string;
  url: string;
  publicId: string;
}

export interface ProductMenuItem {
  id: string;
  title: string;
  description: string | null;
  price: number;
  images: ProductImage[];
}

export interface ProductPackageItem {
  id: string;
  menuItem: ProductMenuItem;
}

export interface ProductReviewUser {
  id: string;
  name: string | null;
}

export interface ProductReview {
  id: string;
  rating: number;
  comment: string | null;
  user: ProductReviewUser;
}

/* -------------------------------- */
/* Product Details Sheet */
/* -------------------------------- */

export interface ProductDetailsSheetProps {
  data?: Package;
  isLoading: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReviewSubmit?: (
    formData: FieldValues
  ) => Promise<void>;
}

/* -------------------------------- */
/* Quantity Selector */
/* -------------------------------- */

export interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}