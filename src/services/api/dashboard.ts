import { MOCK_DASHBOARD_STATS } from "./mockData";
import type { DashboardStats } from "@/types/dashboard";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  await delay(600);
  return { ...MOCK_DASHBOARD_STATS };
}
