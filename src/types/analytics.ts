export interface RevenueDataPoint {
  month: string;
  mrr: number;
  arr: number;
  newMrr: number;
  expansionMrr: number;
  churnedMrr: number;
}

export interface UserGrowthDataPoint {
  date: string;
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  churnedUsers: number;
}

export interface TrafficSource {
  name: string;
  value: number;
  color: string;
}

export interface AnalyticsData {
  revenue: RevenueDataPoint[];
  userGrowth: UserGrowthDataPoint[];
  trafficSources: TrafficSource[];
}
