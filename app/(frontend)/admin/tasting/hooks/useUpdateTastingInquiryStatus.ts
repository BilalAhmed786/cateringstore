import { useMutation, useQueryClient } from "@tanstack/react-query";

import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";

import {
  TastingInquiryStatus,
  UpdateTastingInquiryResponse,
} from "../../../(pages)/tasting/types/type";

interface UpdateStatusPayload {
  id: string;
  status: TastingInquiryStatus;
}

export function useUpdateTastingInquiryStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: UpdateStatusPayload) =>
      apiRequest<UpdateTastingInquiryResponse>({
        url: `/api/admin/tasting/${id}`,
        method: "PATCH",
        authRequired: true,
        body: {
          status,
        },
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["tasting-inquiry", variables.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["tasting-inquiries"],
      });
    },
  });
}