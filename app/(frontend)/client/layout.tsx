"use client";

import ClientHeader from "./dashboard/components/ClientHeader";
import ClientSidebar from "./dashboard/components/ClientSidebar";
import ThemeProvider from "@/app/(frontend)/components/providers/ThemeProvider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="flex h-screen overflow-hidden bg-muted/30">
        {/* Sidebar */}
        <ClientSidebar />

        {/* Right side */}
        <div className="flex flex-1 flex-col">
          {/* Fixed/Sticky Header */}
          <ClientHeader />
          {/* Children */}
          <main className="flex-1 overflow-y-auto p-5 pt-5 sm:pt-5 sm:p-5 lg:p-5 lg:pt-5">
           
              {children}
          
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}