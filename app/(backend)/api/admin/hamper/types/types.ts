// types/hamper.ts

interface HamperItemInput{
  menuItemId: string;
  quantity: number;
};

export interface CreateHamperBody {
  name: string;
  description?: string;
  eventId: string;
  discount?: number;
  image?: string;
  items: HamperItemInput[];
};