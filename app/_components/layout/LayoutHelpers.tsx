import { ReactNode } from "react";
import classNames from "classnames";

/**
 * Page container - provides consistent padding and max-width
 */
export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

/**
 * Section spacing - creates consistent vertical rhythm
 */
export function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={classNames("space-y-4", className)}>{children}</section>
  );
}

/**
 * Stack - vertical flex container with consistent spacing
 */
export function Stack({
  children,
  gap = "md",
  className,
}: {
  children: ReactNode;
  gap?: "sm" | "md" | "lg";
  className?: string;
}) {
  const gapMap = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };

  return (
    <div className={classNames("flex flex-col", gapMap[gap], className)}>
      {children}
    </div>
  );
}

/**
 * HStack - horizontal flex container with consistent spacing
 */
export function HStack({
  children,
  gap = "md",
  align = "center",
  justify = "start",
  className,
}: {
  children: ReactNode;
  gap?: "sm" | "md" | "lg";
  align?: "start" | "center" | "end";
  justify?: "start" | "center" | "between" | "end";
  className?: string;
}) {
  const gapMap = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
  };

  const alignMap = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
  };

  const justifyMap = {
    start: "justify-start",
    center: "justify-center",
    between: "justify-between",
    end: "justify-end",
  };

  return (
    <div
      className={classNames(
        "flex flex-row",
        gapMap[gap],
        alignMap[align],
        justifyMap[justify],
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Form group - groups related form fields
 */
export function FormGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={classNames("space-y-4", className)}>{children}</div>;
}

/**
 * Form row - groups form fields horizontally
 */
export function FormRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={classNames("grid grid-cols-1 sm:grid-cols-2 gap-4", className)}
    >
      {children}
    </div>
  );
}

/**
 * Actions bar - for button groups and actions
 */
export function ActionsBar({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={classNames(
        "flex gap-3 items-center justify-end pt-4 border-t border-base-300",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Content wrapper - for main page content
 */
export function ContentWrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={classNames("space-y-6", className)}>{children}</div>;
}
