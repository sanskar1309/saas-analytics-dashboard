import { MOCK_REVENUE_DATA, MOCK_USER_GROWTH, MOCK_TRAFFIC_SOURCES } from "./mockData";
import type { AnalyticsData } from "@/types/analytics";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchAnalyticsData(): Promise<AnalyticsData> {
  await delay(800);
  return {
    revenue: [...MOCK_REVENUE_DATA],
    userGrowth: [...MOCK_USER_GROWTH],
    trafficSources: [...MOCK_TRAFFIC_SOURCES],
  };
}
