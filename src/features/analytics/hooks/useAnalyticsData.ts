import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import type { AnalyticsData } from "@/types/analytics";

async function fetchAnalyticsData(): Promise<AnalyticsData> {
  const res = await fetch("/api/analytics");
  if (!res.ok) throw new Error("Failed to fetch analytics data");
  return res.json();
}

export function useAnalyticsData() {
  return useQuery({
    queryKey: queryKeys.analytics.data(),
    queryFn: fetchAnalyticsData,
    staleTime: 2 * 60_000,
  });
}
