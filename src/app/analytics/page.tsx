import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AnalyticsCharts } from "@/features/analytics/components/AnalyticsCharts";

export default function AnalyticsPage() {
  return (
    <DashboardLayout
      title="Analytics"
      subtitle="Revenue, user growth, and traffic breakdown."
    >
      <AnalyticsCharts />
    </DashboardLayout>
  );
}
