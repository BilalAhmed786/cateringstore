import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { FieldValues } from "react-hook-form";
import { useUploadEventImage } from "./useuploadeventimage";

export function useCreateEvent() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const uploadEventImage  = useUploadEventImage();

  return useMutation<string, Error, FieldValues>({
    mutationFn: async (data) => {
      const { image:_image, ...rest } = data;

        return apiRequest({
        url: "/api/admin/event",
        method: "POST",
        body: rest,
        authRequired: true,
      });

    
    },

    onSuccess: async(eventId,variables) => {
     
      if (variables.image) {
        await uploadEventImage.mutateAsync({
          eventId,
          image: variables.image[0],
        });
      }
     
      toast.success("Event created successfully!");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/admin/events");
    },

    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to create event");
      }
    },
  });
}