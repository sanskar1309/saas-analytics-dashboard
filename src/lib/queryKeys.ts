import type { UsersQueryParams } from "@/types/users";

/**
 * Centralized, type-safe query key factory.
 * All query keys live here to prevent typos and enable
 * fine-grained cache invalidation.
 */
export const queryKeys = {
  dashboard: {
    all: ["dashboard"] as const,
    stats: () => [...queryKeys.dashboard.all, "stats"] as const,
  },

  analytics: {
    all: ["analytics"] as const,
    data: () => [...queryKeys.analytics.all, "data"] as const,
  },

  users: {
    all: ["users"] as const,
    lists: () => [...queryKeys.users.all, "list"] as const,
    list: (params: UsersQueryParams) =>
      [...queryKeys.users.lists(), params] as const,
  },
} as const;
