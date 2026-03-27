"use client";

import dynamic from "next/dynamic";
import { Users, TrendingUp } from "lucide-react";
import { ChartWrapper } from "@/components/charts/ChartWrapper";
import { ChartSkeleton } from "@/components/ui/Skeleton";
import { useAnalyticsData } from "../hooks/useAnalyticsData";
import { formatCurrency, formatNumber } from "@/lib/utils";

// ─── Code-split: load Recharts only in the browser ───────────────────────────
// These are large bundles (~250 kB) — dynamic import cuts initial JS payload.

const RevenueChart = dynamic(
  () => import("@/components/charts/RevenueChart").then((m) => ({ default: m.RevenueChart })),
  { ssr: false, loading: () => <ChartSkeleton height={260} /> }
);

const UserGrowthChart = dynamic(
  () => import("@/components/charts/UserGrowthChart").then((m) => ({ default: m.UserGrowthChart })),
  { ssr: false, loading: () => <ChartSkeleton height={260} /> }
);

const TrafficSourceChart = dynamic(
  () => import("@/components/charts/TrafficSourceChart").then((m) => ({ default: m.TrafficSourceChart })),
  { ssr: false, loading: () => <ChartSkeleton height={300} /> }
);

// ─── Stat pill ────────────────────────────────────────────────────────────────

function StatPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5 dark:border-gray-800 dark:bg-gray-800/60">
      <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-gray-500">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-semibold tabular-nums text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

// ─── Revenue legend ───────────────────────────────────────────────────────────

const RevenueLegend = () => (
  <div className="flex flex-wrap items-center gap-5">
    {[
      { color: "#6366f1", label: "MRR",          dashed: false },
      { color: "#10b981", label: "New MRR",       dashed: true  },
      { color: "#f43f5e", label: "Churned MRR",   dashed: true  },
    ].map(({ color, label, dashed }) => (
      <div key={label} className="flex items-center gap-1.5">
        <svg width="20" height="2" className="shrink-0">
          <line
            x1="0" y1="1" x2="20" y2="1"
            stroke={color}
            strokeWidth="2"
            strokeDasharray={dashed ? "4 2" : "0"}
          />
        </svg>
        <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
      </div>
    ))}
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

export function AnalyticsCharts() {
  const { data, isLoading, error } = useAnalyticsData();

  const latestRevenue = data?.revenue.at(-1);
  const latestGrowth  = data?.userGrowth.at(-1);
  const hasRevenue    = (data?.revenue?.length ?? 0) > 0;
  const hasGrowth     = (data?.userGrowth?.length ?? 0) > 0;
  const hasTraffic    = (data?.trafficSources?.length ?? 0) > 0;

  return (
    <div className="space-y-5">
      {/* Revenue ── full width */}
      <ChartWrapper
        title="Monthly Recurring Revenue"
        subtitle="Last 12 months"
        isLoading={isLoading}
        error={error}
        isEmpty={!isLoading && !hasRevenue}
        emptyIcon={TrendingUp}
        emptyTitle="No revenue data yet"
        emptyDescription="Revenue metrics will appear once billing data is available."
        actions={
          latestRevenue && (
            <>
              <StatPill label="MRR" value={formatCurrency(latestRevenue.mrr)} />
              <StatPill label="ARR" value={formatCurrency(latestRevenue.arr, true)} />
            </>
          )
        }
        footer={<RevenueLegend />}
      >
        <RevenueChart data={data?.revenue ?? []} />
      </ChartWrapper>

      {/* User growth + traffic ── 2/3 + 1/3 */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <ChartWrapper
          className="lg:col-span-2"
          title="User Growth"
          subtitle="Total vs active users"
          isLoading={isLoading}
          error={error}
          isEmpty={!isLoading && !hasGrowth}
          emptyIcon={Users}
          emptyTitle="No user data yet"
          emptyDescription="User growth will appear once accounts are created."
          actions={
            latestGrowth && (
              <>
                <StatPill label="Total"  value={formatNumber(latestGrowth.totalUsers)}  />
                <StatPill label="Active" value={formatNumber(latestGrowth.activeUsers)} />
              </>
            )
          }
        >
          <UserGrowthChart data={data?.userGrowth ?? []} />
        </ChartWrapper>

        <ChartWrapper
          title="Traffic Sources"
          subtitle="This month"
          isLoading={isLoading}
          error={error}
          isEmpty={!isLoading && !hasTraffic}
          emptyTitle="No traffic data yet"
        >
          <TrafficSourceChart data={data?.trafficSources ?? []} />
        </ChartWrapper>
      </div>
    </div>
  );
}
