import ClientHeader from "./dashboard/components/ClientHeader";
import ClientSidebar from "./dashboard/components/ClientSidebar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <ClientSidebar />

      {/* Main area */}
      <div className="md:pl-64">
        {/* Header */}
        <ClientHeader />

        {/* Page content */}
        <main className="p-4 pt-20 sm:p-6 sm:pt-20 lg:p-8 lg:pt-20">
          {children}
        </main>
      </div>
    </div>
  );
}