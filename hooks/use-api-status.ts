import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export type ApiStatus = "online" | "offline" | "loading";

export function useApiStatus() {
  // Use TanStack Query to fetch and cache the API status
  const { data, isLoading } = useQuery({
    queryKey: ["apiStatus"],
    queryFn: async () => {
      try {
        const response = await api.get("");
        return response.status === 200;
      } catch {
        return false;
      }
    },
    // Check every 30 seconds
    refetchInterval: 30000,
    // Always refresh when window regains focus
    refetchOnWindowFocus: true,
  });

  // Determine the status based on the query state
  const status: ApiStatus = isLoading ? "loading" : data ? "online" : "offline";

  return { status };
}
