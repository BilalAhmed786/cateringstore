// types/hamper.ts

interface HamperItemInput{
  menuItemId: string;
  quantity: number;
};

export interface HamperBody {
  name: string;
  description?: string;
  discount?: number;
  image?: string;
  items: HamperItemInput[];
};