"use client";

import { useQuery } from "@tanstack/react-query";

import { apiRequest } from "@/app/(frontend)/utils/apirequest";
import { ProductDetails } from "@/app/(frontend)/components/reusables/storefront-grid/productdetails";

export function useGetSingleHamper(id: string) {
  return useQuery({
    queryKey: ["hamper", id],

    enabled: !!id,

    queryFn: () =>
      apiRequest<ProductDetails>({
        url: `/api/admin/hampers/${id}`,
        method: "GET",
        authRequired: true,
      }),
  });
}