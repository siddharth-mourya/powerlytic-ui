export const PortTypesListSkeleton = () => {
  return (
    <div className="my-5 space-y-3">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-3 bg-base-100 rounded-lg border border-base-200 shadow-sm"
        >
          {/* Left skeleton */}
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-2">
              <div className="skeleton h-4 w-24 rounded"></div>
              <div className="skeleton h-4 w-16 rounded"></div>
              <div className="skeleton h-4 w-20 rounded"></div>
            </div>
            <div className="skeleton h-3 w-40 rounded"></div>
          </div>

          {/* Right buttons skeleton */}
          <div className="flex gap-2">
            <div className="skeleton h-6 w-12 rounded"></div>
            <div className="skeleton h-6 w-12 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
