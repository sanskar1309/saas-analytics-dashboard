import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/services/api/users";
import type { UsersQueryParams } from "@/types/users";

export function useUsersData(params: UsersQueryParams) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => fetchUsers(params),
    placeholderData: (prev) => prev, // keep previous data while fetching
    staleTime: 30_000,
  });
}
