"use client";

import { useAuthContext } from "@/app/_lib/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { FullScreenLoader } from "../Loader/FullScreenLoader";

type ProtectedPageProps = {
  children: ReactNode;
};

export function Authenticator({ children }: ProtectedPageProps) {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (user && pathname === "/login") {
        router.replace("/dashboard");
      } else if (!user && pathname !== "/login") {
        router.replace("/login");
      }
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) return <FullScreenLoader />;

  // block rendering until redirect decision is made
  if (!user && pathname !== "/login") return null;
  if (user && pathname === "/login") return null;

  return <>{children}</>;
}
