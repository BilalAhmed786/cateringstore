export interface EventBody {
  name: string;
  description?: string;
  categoryId: string;
  discount?: number;
  menuItems: {
    menuItemId: string;
    quantity: number;
  }[];
  packages: {
    packageId: string;
    quantity: number;
  }[];
}