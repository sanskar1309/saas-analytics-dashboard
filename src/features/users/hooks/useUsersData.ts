import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchUsers } from "@/services/api/users";
import { queryKeys } from "@/lib/queryKeys";
import type { UsersQueryParams } from "@/types/users";

export function useUsersData(params: UsersQueryParams) {
  return useQuery({
    queryKey: queryKeys.users.list(params),
    queryFn: () => fetchUsers(params),
    // Keep the previous page visible while the next page loads (no flash)
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
