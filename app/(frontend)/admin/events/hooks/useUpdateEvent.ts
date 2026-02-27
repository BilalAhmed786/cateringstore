import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { FieldValues } from "react-hook-form";
import { Event } from "../types/type";

export function useUpdateEvent() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<Event, unknown, FieldValues>({
    mutationFn: ({ id, title, description, status }) =>
      apiRequest<Event>({
        url: `/api/admin/event/${id}`,
        method: "PUT",
        body: { title, description, status },
        authRequired: true,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event updated successfully!");
      router.push("/admin/events");
    },
    onError: (error: unknown) => {
      console.error(error);
      toast.error("Failed to update event");
    },
  });
}

