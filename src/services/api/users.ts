import { MOCK_USERS } from "./mockData";
import type { UsersQueryParams, UsersResponse } from "@/types/users";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchUsers(params: UsersQueryParams): Promise<UsersResponse> {
  await delay(500);

  let filtered = [...MOCK_USERS];

  // Filter by plan
  if (params.plan !== "All") {
    filtered = filtered.filter((u) => u.plan === params.plan);
  }

  // Search
  if (params.search.trim()) {
    const q = params.search.toLowerCase();
    filtered = filtered.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.country.toLowerCase().includes(q)
    );
  }

  // Sort
  filtered.sort((a, b) => {
    const aVal = a[params.sortBy];
    const bVal = b[params.sortBy];
    if (aVal < bVal) return params.sortOrder === "asc" ? -1 : 1;
    if (aVal > bVal) return params.sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const total = filtered.length;
  const totalPages = Math.ceil(total / params.pageSize);
  const start = (params.page - 1) * params.pageSize;
  const data = filtered.slice(start, start + params.pageSize);

  return {
    data,
    total,
    page: params.page,
    pageSize: params.pageSize,
    totalPages,
  };
}
