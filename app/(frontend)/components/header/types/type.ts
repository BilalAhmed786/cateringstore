
export interface NavItem{
  name: string;
  href: string;
};

export interface MobileMenuProps{
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  authLoading: boolean;
  isLoggedIn: boolean;
  isPending: boolean;
  onDashboard: () => void;
  onLogout: () => void;
};