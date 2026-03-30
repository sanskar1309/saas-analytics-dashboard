import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import type { UsersQueryParams, UsersResponse } from "@/types/users";

async function fetchUsers(params: UsersQueryParams): Promise<UsersResponse> {
  const search = new URLSearchParams({
    page:      String(params.page),
    pageSize:  String(params.pageSize),
    search:    params.search,
    plan:      params.plan,
    sortBy:    params.sortBy,
    sortOrder: params.sortOrder,
  });
  const res = await fetch(`/api/users?${search}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export function useUsersData(params: UsersQueryParams) {
  return useQuery({
    queryKey: queryKeys.users.list(params),
    queryFn: () => fetchUsers(params),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
  });
}
