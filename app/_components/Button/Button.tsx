"use client";

import { Loader2 } from "lucide-react";
import classNames from "classnames";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants: Record<string, string> = {
    primary:
      "bg-primary text-primary-content hover:bg-primary-focus shadow-sm hover:shadow-md active:scale-95",
    secondary:
      "bg-secondary text-secondary-content hover:bg-secondary-focus shadow-sm hover:shadow-md active:scale-95",
    outline:
      "border-1 text-primary bg-transparent hover:bg-primary hover:text-primary-content active:scale-95",
    ghost: "text-base-content hover:bg-base-200 active:scale-95",
    danger:
      "bg-error text-error-content hover:bg-red-700 shadow-sm hover:shadow-md active:scale-95",
  };

  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={classNames(
        baseStyles,
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 className=" h-4 w-4 animate-spin" />}
      {!loading && leftIcon && <span className="">{leftIcon}</span>}
      {children}
      {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}
