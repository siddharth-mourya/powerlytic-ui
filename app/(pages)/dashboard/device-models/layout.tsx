"use client";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h2 className="text-2xl mb-5 font-bold">Port Types</h2>

      {children}
    </div>
  );
}
