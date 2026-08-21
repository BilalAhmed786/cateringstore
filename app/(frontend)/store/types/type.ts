import { PackageItem } from "../../(pages)/packages/types/type";
import { Package } from "../../admin/packages/types/type";

import { GridItem } from "../../components/reusables/grid/gridtypes";
import { CartItem } from "../../components/reusables/types/types";
export interface CartStore {
  items:(CartItem[])
  addItem: (item: GridItem,type:string) => void;
  removeItem: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  addCustomizedPackage:(packageData:Package,selectedItems:PackageItem[],totalPrice:number)=>void

  clearCart: ()=> void;
}

export type AdminNotification = {
  id: string;
  title: string;
  body: string;
  type?: string;
  orderId?: string;
};

export interface NotificationStore {
  notifications: AdminNotification[];

  addNotification: (
    notification: AdminNotification
  ) => void;

  removeNotification: (id: string) => void;

  clearNotifications: () => void;
}
