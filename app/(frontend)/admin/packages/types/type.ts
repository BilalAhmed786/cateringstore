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

