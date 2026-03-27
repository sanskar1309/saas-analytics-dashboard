"use client";

import { DollarSign, Users, MousePointerClick, TrendingDown } from "lucide-react";
import { KPICard } from "./KPICard";
import { KPICardSkeleton } from "@/components/ui/Skeleton";
import { ErrorState } from "@/components/ui/ErrorState";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { formatCurrency, formatNumber } from "@/lib/utils";

export function KPIGrid() {
  const { data, isLoading, isError, refetch } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => <KPICardSkeleton key={i} />)}
      </div>
    );
  }

  if (isError || !data) {
    return <ErrorState message="Failed to load dashboard stats." onRetry={refetch} />;
  }

  const cards = [
    {
      label: "Monthly Revenue",
      value: formatCurrency(data.monthlyRevenue),
      change: data.revenueChange,
      changeLabel: "vs last month",
      icon: DollarSign,
      iconColor: "text-indigo-600 dark:text-indigo-400",
      iconBg: "bg-indigo-50 dark:bg-indigo-500/10",
      accentColor: "bg-linear-to-r from-indigo-500/60 via-indigo-400/40 to-transparent",
      trend: (data.revenueChange >= 0 ? "up" : "down") as "up" | "down",
      positive: "up" as const,
    },
    {
      label: "Active Users",
      value: formatNumber(data.activeUsers),
      change: data.activeUsersChange,
      changeLabel: "vs last month",
      icon: Users,
      iconColor: "text-emerald-600 dark:text-emerald-400",
      iconBg: "bg-emerald-50 dark:bg-emerald-500/10",
      accentColor: "bg-linear-to-r from-emerald-500/60 via-emerald-400/40 to-transparent",
      trend: (data.activeUsersChange >= 0 ? "up" : "down") as "up" | "down",
      positive: "up" as const,
    },
    {
      label: "Conversion Rate",
      value: `${data.conversionRate}%`,
      change: data.conversionChange,
      changeLabel: "vs last month",
      icon: MousePointerClick,
      iconColor: "text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-50 dark:bg-amber-500/10",
      accentColor: "bg-linear-to-r from-amber-500/60 via-amber-400/40 to-transparent",
      trend: (data.conversionChange >= 0 ? "up" : "down") as "up" | "down",
      positive: "up" as const,
    },
    {
      label: "Churn Rate",
      value: `${data.churnRate}%`,
      change: data.churnChange,
      changeLabel: "vs last month",
      icon: TrendingDown,
      iconColor: "text-rose-600 dark:text-rose-400",
      iconBg: "bg-rose-50 dark:bg-rose-500/10",
      accentColor: "bg-linear-to-r from-rose-500/60 via-rose-400/40 to-transparent",
      trend: (data.churnChange >= 0 ? "up" : "down") as "up" | "down",
      positive: "down" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, i) => (
        <KPICard key={card.label} {...card} index={i} />
      ))}
    </div>
  );
}
