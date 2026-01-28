export function PageContentHeader({ title }: { title: string }) {
  return (
    <div className="mb-6 pb-4 border-b border-base-300">
      <h1 className="text-3xl font-bold text-base-content tracking-tight">
        {title}
      </h1>
    </div>
  );
}
