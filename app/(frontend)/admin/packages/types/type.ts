export interface MenuItem {
  id: string;
  name: string;
  price: number;
}
export interface PackageItemsFieldProps {
  menuItems: MenuItem[];
  name: string;
}

export interface SelectedItem extends MenuItem {
  quantity: number;
}


export interface SelectedItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}



export type PackageFilters = {
  status?: string;
  dateFilter?:string;
  search?: string;
  page?: number;
  limit?: number;
};

export type PackageMenuItem = {
  id: string;
  packageId: string;
  menuItemId: string;
  quantity: number;
  menuItem: {
    id: string;
    title: string;
    price: number;
    images: {
      url: string;
    }[];
  };
}