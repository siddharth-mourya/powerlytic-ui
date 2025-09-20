import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { api } from "@/lib/api/axios";

export const useHealthCheckRQ = () => {
  return useQuery({
    queryKey: [queryKeys.healthCheck],
    queryFn: () => api.get("/health").then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
