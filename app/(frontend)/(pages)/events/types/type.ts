import { Event } from "@/app/(frontend)/admin/events/types/type";

export interface EventDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: Event;
  isLoading: boolean;
}