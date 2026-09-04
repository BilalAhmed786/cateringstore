import { AdminNotification } from "@/app/(frontend)/store/types/type";

export interface NavItem{
  name: string;
  href: string;
};

export interface MobileMenuProps {
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  authLoading: boolean;
  isLoggedIn: boolean;
  isPending: boolean;

  onDashboard: () => void;
  onLogout: () => void;
  notifications: AdminNotification[];
  clearNotifications: () => void;
}