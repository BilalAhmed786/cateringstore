"use client";

import Header from "./dashboard/(components)/Header";
import { useState } from "react";
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { logout } = useLogout();

  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden bg-background text-foreground">
        {/* Sidebar */}
        <Sidebar
          open={sidebarOpen}
          setOpen={setSidebarOpen}
          onLogout={logout}
        />

        {/* Right side */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <FCMInitializer />

          {/* Header */}
          <Header onLogout={logout} />

          {/* Main */}
          <main className="min-h-0 flex-1 overflow-y-auto bg-background">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}