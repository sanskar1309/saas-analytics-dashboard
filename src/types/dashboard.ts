export interface KPIMetric {
  id: string;
  label: string;
  value: string | number;
  change: number; // percentage change vs previous period
  changeLabel: string;
  trend: "up" | "down" | "neutral";
  prefix?: string;
  suffix?: string;
}

export interface DashboardStats {
  monthlyRevenue: number;
  activeUsers: number;
  conversionRate: number;
  churnRate: number;
  revenueChange: number;
  activeUsersChange: number;
  conversionChange: number;
  churnChange: number;
}
