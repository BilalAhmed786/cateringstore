import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/app/(frontend)/components/reusables/apireq/apireq";
import { GetTestimonialsResponse } from "../types/type";

export function useGetTestimonials() {
  return useQuery<GetTestimonialsResponse>({
    queryKey: ["testimonials"],
    queryFn: () =>
      apiRequest<GetTestimonialsResponse>({

         url: "/api/review/testimonial",
         method:"GET",
         
      }
       
      ),
    staleTime: 1000 * 60 * 5,
  });
}