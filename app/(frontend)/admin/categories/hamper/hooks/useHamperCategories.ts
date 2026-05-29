"use client";

import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useQuery } from "@tanstack/react-query";
import { HampercategoryParams } from "../types/type";
import { HamperCategoryResponse } from "../types/type";


export const useHamperCategories = ({
  page,
  limit,
  search,
}: HampercategoryParams) => {
  return useQuery({
    queryKey: ["hampercategories", page, limit, search],
    queryFn: async () =>
      apiRequest<HamperCategoryResponse>({
        url: `/api/admin/category/hamper?page=${page}&limit=${limit}&search=${search ?? ""}`,
        method: "GET",
        authRequired: true,
      }),
    
  });
};