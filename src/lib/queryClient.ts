import { QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "./toast";

/**
 * Factory so the Providers component can create a fresh client per request
 * on the server while reusing one instance in the browser.
 */
export function createQueryClient(): QueryClient {
  return new QueryClient({
    queryCache: new QueryCache({
      onError(error, query) {
        // Only surface toast for background re-fetch failures
        // (when stale data is already on screen). Initial-load errors are
        // handled inline by the feature components via ErrorState.
        if (query.state.dataUpdateCount > 0) {
          toast.warning(
            "Failed to refresh data",
            error instanceof Error ? error.message : "Showing cached results"
          );
        }
      },
    }),
    defaultOptions: {
      queries: {
        staleTime: 60_000,        // 1 min — data is "fresh" for 1 minute
        gcTime:    5 * 60_000,    // 5 min — keep unused cache alive
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}
