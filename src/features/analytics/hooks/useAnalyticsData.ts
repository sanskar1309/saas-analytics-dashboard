import { useQuery } from "@tanstack/react-query";
import { fetchAnalyticsData } from "@/services/api/analytics";
import { queryKeys } from "@/lib/queryKeys";

export function useAnalyticsData() {
  return useQuery({
    queryKey: queryKeys.analytics.data(),
    queryFn: fetchAnalyticsData,
    // Analytics data changes less frequently — keep fresh for 2 min
    staleTime: 2 * 60_000,
  });
}
