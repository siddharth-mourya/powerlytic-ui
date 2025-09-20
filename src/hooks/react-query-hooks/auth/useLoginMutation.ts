import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api/axios";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
  role: string;
  orgId: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface LoginRequest {
  email: string;
  password: string;
}

export const useLoginMutation = () => {
  const router = useRouter();

  const mutationFn = (params: LoginRequest): Promise<LoginResponse> => {
    return api
      .post("/auth/login", { email: params.email, password: params.password })
      .then((res) => res.data);
  };

  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: mutationFn,
    retry: 1,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      localStorage.setItem("token", data.token);

      const decoded = jwtDecode<DecodedToken>(data.token);
      localStorage.setItem("role", decoded.role);

      if (decoded.role === "companyAdmin") router.push("/dashboard/company");
      if (decoded.role === "orgAdmin") router.push("/dashboard/org-admin");
      if (decoded.role === "orgOperator") router.push("/dashboard/operator");
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
      
    },
  });
};
