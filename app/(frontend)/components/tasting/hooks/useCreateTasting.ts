"use client";

import { useMutation } from "@tanstack/react-query";

import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

import type { CreateTastingResponse, TastingFormValues } from "../type";

export function useCreateTasting() {
  return useMutation({
    mutationFn: async (
      data: TastingFormValues,
    ): Promise<CreateTastingResponse> => {
      return apiRequest<CreateTastingResponse>({
        url: "/api/tasting",
        method: "POST",
        body: data,
        authRequired:true
      });
    },
  });
}
