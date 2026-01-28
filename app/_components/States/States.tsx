import { ReactNode } from "react";
import { AlertCircle } from "lucide-react";

/**
 * EmptyState - Shows when there's no data
 */
export function EmptyState({
  icon: Icon = AlertCircle,
  title,
  description,
  action,
}: {
  icon?: React.ComponentType<{ className: string }>;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <Icon className="h-12 w-12 text-base-content/30 mb-4" />
      <h3 className="text-lg font-semibold text-base-content mb-2">{title}</h3>
      {description && (
        <p className="text-base-content/60 text-center max-w-sm mb-6">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}

/**
 * LoadingState - Shows when data is loading
 */
export function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="loading loading-spinner loading-lg text-primary mb-4" />
      <p className="text-base-content/60">{message}</p>
    </div>
  );
}

/**
 * ErrorState - Shows when there's an error
 */
export function ErrorState({
  title = "Something went wrong",
  description,
  action,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-lg bg-error/10 border border-error/30 p-6">
      <div className="flex gap-4">
        <AlertCircle className="h-6 w-6 text-error flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold text-error mb-1">{title}</h3>
          {description && (
            <p className="text-sm text-error/80 mb-4">{description}</p>
          )}
          {action && <div>{action}</div>}
        </div>
      </div>
    </div>
  );
}
