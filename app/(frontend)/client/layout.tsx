
import ClientHeader from "./dashboard/components/ClientHeader";
import ClientSidebar from "./dashboard/components/ClientSidebar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      {/* Sidebar */}
      <ClientSidebar />

      {/* Main area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden md:pl-64">
        {/* Header */}
        <ClientHeader />

        {/* Page content */}
        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-4 pt-20 sm:p-6 sm:pt-20 lg:p-8 lg:pt-20">
          {children}
        </main>
      </div>
    </div>
  );
}