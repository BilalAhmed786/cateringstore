import { ReactNode } from "react";
import { FieldValues } from "react-hook-form";

import { GridItem } from "../grid/gridtypes";
import { Package } from "@/app/(frontend)/admin/packages/types/type";
import { Hamper } from "@/app/(frontend)/admin/hampers/types/type";


export type StorefrontType =
  | "menuitem"
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

export interface PackageReview {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;

  user: {
    id: string;
    name: string | null;
  };
}


export interface PackageReviewResponse {
  reviews: PackageReview[];
  totalReviews: number;
  averageRating: number;
  canReview: boolean;
}

export interface ProductDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  data?: Package | Hamper;
  isLoading: boolean;

  reviewData?: PackageReviewResponse;
  isReviewsLoading: boolean;

  rating: string;
  sort: "asc" | "desc";

  onRatingChange: (value: string) => void;

  onSortChange: (
    value: "asc" | "desc",
  ) => void;

  onReviewSubmit: (
    formData: FieldValues,
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