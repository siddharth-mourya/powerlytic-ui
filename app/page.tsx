"use client";

import { useRouter } from "next/navigation";
import { useHealthCheckRQ } from "./_lib/_react-query-hooks/health/useHealthCheckRQ";

export default function HomePage() {
  const data = useHealthCheckRQ();
  const router = useRouter();

  router.push("/login");

  return <></>;
}
