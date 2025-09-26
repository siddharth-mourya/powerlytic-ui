// app/page.tsx
"use client";

import { useHealthCheckRQ } from "./_lib/_react-query-hooks/health/useHealthCheckRQ";

export default function HomePage() {
  const data = useHealthCheckRQ();
  console.log("Health Check Data:", data);
  return (
    <div className="h-screen bg-red-500 flex items-center justify-center">
      <h1 className="text-4xl text-white">Tailwind Test</h1>
      <button className="btn btn-primary">DaisyUI Button</button>
    </div>
  );
}
