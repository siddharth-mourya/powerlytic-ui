"use client";

import { ReactNode } from "react";

export function SectionWrapper({ children }: { children: ReactNode }) {
  return <div className="rounded-xl bg-base-200 p-6 shadow-sm">{children}</div>;
}
