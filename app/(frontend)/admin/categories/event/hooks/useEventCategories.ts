"use client";

import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { useQuery } from "@tanstack/react-query";
import { EventcategoryParams, EventCategoryResponse } from "../types/type";
;


export const useEventCategories = ({
  page,
  limit,
  search,
}: EventcategoryParams) => {
  return useQuery({
    queryKey: ["eventcategories", page, limit, search],
    queryFn: async () =>
      apiRequest<EventCategoryResponse>({
        url: `/api/admin/category/event?page=${page}&limit=${limit}&search=${search ?? ""}`,
        method: "GET",
        authRequired: true,
      }),
    
  });
};