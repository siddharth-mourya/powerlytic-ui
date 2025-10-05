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
  default: "bg-gray-200 text-gray-700",
  success: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
  neutral: "bg-base-400 text-base-content",
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
        "px-3 py-1 text-xs font-medium rounded-full inline-flex items-center justify-center",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
