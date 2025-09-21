import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import { api } from "@/app/_lib/api/axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
export const useAuthRQ = () => {
  return useQuery<User>({
    queryKey: [queryKeys.auth.profile],
    queryFn: () => api.get("/auth/me").then((res) => res.data),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
