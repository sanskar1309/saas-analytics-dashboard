import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { KPIGrid } from "@/features/dashboard/components/KPIGrid";
import { AnalyticsCharts } from "@/features/analytics/components/AnalyticsCharts";

export default function DashboardPage() {
  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Welcome back — here's what's happening today."
    >
      <div className="space-y-6">
        <ErrorBoundary>
          <KPIGrid />
        </ErrorBoundary>

        <ErrorBoundary>
          <AnalyticsCharts />
        </ErrorBoundary>
      </div>
    </DashboardLayout>
  );
}
