"use client";

import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { Package } from "../types/type";



export function useGetPackageDetails(id: string) {
  return useQuery<Package>({
    queryKey: ["package", id],
    enabled: !!id,
    queryFn: async () =>
      apiRequest({
        url: `/api/admin/packages/${id}`,
        method: "GET",
        authRequired: true,
      }),
  });
}