import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats } from "@/services/api/dashboard";
import { queryKeys } from "@/lib/queryKeys";

export function useDashboardStats() {
  return useQuery({
    queryKey: queryKeys.dashboard.stats(),
    queryFn: fetchDashboardStats,
  });
}
