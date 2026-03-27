"use client";

import { RevenueChart } from "@/components/charts/RevenueChart";
import { UserGrowthChart } from "@/components/charts/UserGrowthChart";
import { TrafficSourceChart } from "@/components/charts/TrafficSourceChart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ChartSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { useAnalyticsData } from "../hooks/useAnalyticsData";
import { formatCurrency, formatNumber } from "@/lib/utils";

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

export function AnalyticsCharts() {
  const { data, isLoading, isError, refetch } = useAnalyticsData();

  if (isError) {
    return <ErrorState message="Failed to load analytics data." onRetry={refetch} />;
  }

  const latestRevenue = data?.revenue.at(-1);
  const latestGrowth  = data?.userGrowth.at(-1);

  return (
    <div className="space-y-5">
      {/* Revenue — full width */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Monthly Recurring Revenue</CardTitle>
            <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
              Last 12 months
            </p>
          </div>
          {!isLoading && latestRevenue && (
            <div className="flex items-center gap-2">
              <StatPill label="MRR" value={formatCurrency(latestRevenue.mrr)} />
              <StatPill label="ARR" value={formatCurrency(latestRevenue.arr, true)} />
            </div>
          )}
        </CardHeader>
        <CardContent className="pt-4">
          {isLoading
            ? <ChartSkeleton height={260} />
            : <RevenueChart data={data!.revenue} />
          }
          {/* Legend */}
          {!isLoading && (
            <div className="mt-4 flex items-center gap-5 border-t border-gray-50 pt-3 dark:border-gray-800">
              {[
                { color: "#6366f1", label: "MRR" },
                { color: "#10b981", label: "New MRR", dashed: true },
                { color: "#f43f5e", label: "Churned MRR", dashed: true },
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
          )}
        </CardContent>
      </Card>

      {/* User growth + traffic */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div>
              <CardTitle>User Growth</CardTitle>
              <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                Total vs active users
              </p>
            </div>
            {!isLoading && latestGrowth && (
              <div className="flex items-center gap-2">
                <StatPill label="Total" value={formatNumber(latestGrowth.totalUsers)} />
                <StatPill label="Active" value={formatNumber(latestGrowth.activeUsers)} />
              </div>
            )}
          </CardHeader>
          <CardContent className="pt-4">
            {isLoading
              ? <ChartSkeleton height={260} />
              : <UserGrowthChart data={data!.userGrowth} />
            }
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Traffic Sources</CardTitle>
              <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                This month
              </p>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading
              ? <ChartSkeleton height={320} />
              : <TrafficSourceChart data={data!.trafficSources} />
            }
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
