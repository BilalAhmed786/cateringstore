import ClientStats from "./components/ClientStats";
import QuickActions from "./components/QuickActions";
import RecentOrders from "./components/RecentOrders";
import RecentReviews from "./components/RecentReviews";
import TastingRequests from "./components/TastingRequests";
import WelcomeSection from "./components/WelcomeSection";

export default function ClientDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <WelcomeSection />

      {/* Client statistics */}
      <ClientStats />

      {/* Quick actions */}
      <QuickActions />

      {/* Main dashboard content */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentOrders />
        <TastingRequests />
      </div>

      {/* Reviews */}
      <RecentReviews />
    </div>
  );
}