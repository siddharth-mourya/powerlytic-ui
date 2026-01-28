import classNames from "classnames";
import { ReactNode } from "react";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-base-300 text-base-content",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  error: "bg-error/15 text-error",
  info: "bg-info/15 text-info",
  neutral: "bg-base-300 text-base-content",
};

export const Badge = ({
  children,
  variant = "default",
  className,
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) => {
  return (
    <span
      className={classNames(
        "inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-colors",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
};
