import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { api } from "@/app/_lib/api/axios";

export const useHealthCheckRQ = () => {
  return useQuery({
    queryKey: [queryKeys.healthCheck],
    queryFn: () => api.get("/health-check").then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
