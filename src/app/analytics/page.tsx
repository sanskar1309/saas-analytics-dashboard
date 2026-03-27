import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AnalyticsCharts } from "@/features/analytics/components/AnalyticsCharts";

export default function AnalyticsPage() {
  return (
    <DashboardLayout
      title="Analytics"
      subtitle="Revenue, growth, and acquisition breakdown."
    >
      <ErrorBoundary>
        <AnalyticsCharts />
      </ErrorBoundary>
    </DashboardLayout>
  );
}
