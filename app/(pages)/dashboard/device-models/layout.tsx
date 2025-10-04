"use client";

import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const router = useRouter();
  const handleNewClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(`/dashboard/device-models/new`);
  };

  return (
    <div>
      <div className="flex align-center justify-between">
        <h2 className="text-2xl mb-5 font-bold">Port Types</h2>
        <a
          onClick={(e) => handleNewClick(e)}
          href={`/dashboard/device-models/new`}
          className="btn btn-xs btn-outline "
        >
          + New
        </a>
      </div>
      {children}
    </div>
  );
}
