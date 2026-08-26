export interface TastingFormValues {
  eventType: string;
  guests: string;
  date: string;
  time: string;
  foodPreferences: string[];
  name: string;
  email: string;
  phone: string;
  message: string;
};

export const steps = [
  "event",
  "guests",
  "date",
  "food",
  "contact",
] as const;

export type Step = (typeof steps)[number];

export interface CreateTastingResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    userId: string;
    eventType: string;
    guests: string;
    date: string;
    time: string;
    foodPreferences: string[];
    name: string;
    email: string;
    phone: string;
    message: string | null;
    createdAt: string;
  };
};