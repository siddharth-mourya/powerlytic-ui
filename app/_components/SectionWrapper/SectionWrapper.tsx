"use client";

import { ReactNode } from "react";

export function SectionWrapper({ children }: { children: ReactNode }) {
  return (
    <div
      className="
        bg-base-100
        md:rounded-lg
        md:border md:border-base-300
        md:p-6
        md:shadow md:hover:shadow-md
        md:transition-shadow md:duration-200
      "
    >
      {children}
    </div>
  );
}
