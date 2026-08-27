"use client";

import { useState } from "react";

import Header from "./dashboard/(components)/Header";
import Sidebar from "./dashboard/(components)/Sidebar";
import { useLogout } from "./dashboard/hooks/useLogout";
import FCMInitializer from "./dashboard/(components)/FCMInitializer";
import ThemeProvider from "@/app/(frontend)/components/providers/ThemeProvider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  

  const { logout } = useLogout();

  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden bg-background text-foreground">
        <Sidebar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          onLogout={logout}
        />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <FCMInitializer />

          <Header
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
          />

          <main className="min-h-0 flex-1 overflow-y-auto bg-background">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}