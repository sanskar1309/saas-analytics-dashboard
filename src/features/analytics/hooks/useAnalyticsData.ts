import { useQuery } from "@tanstack/react-query";
import { fetchAnalyticsData } from "@/services/api/analytics";

export function useAnalyticsData() {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: fetchAnalyticsData,
    staleTime: 60_000,
  });
}
