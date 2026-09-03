"use client";
import FCMInitializer from "../admin/dashboard/(components)/FCMInitializer";
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
        <div className="flex flex-1 flex-col overflow-auto">
          <FCMInitializer />
          {/* Fixed/Sticky Header */}
          <ClientHeader />
          {/* Children */}
          <main className="flex-1 overflow-auto">
           
              {children}
          
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}