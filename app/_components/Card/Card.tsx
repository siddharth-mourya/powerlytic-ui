import classNames from "classnames";
import { ReactNode } from "react";

export const Card = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={classNames(
      "bg-base-100 border border-base-300 rounded-2xl shadow-sm p-4",
      className
    )}
  >
    {children}
  </div>
);

export const CardHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={classNames(
      "mb-3 pb-2 flex items-center justify-between",
      className
    )}
  >
    {children}
  </div>
);

export const CardTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <h2
    className={classNames("text-lg font-semibold text-base-content", className)}
  >
    {children}
  </h2>
);

export const CardContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={classNames("text-sm text-base-content", className)}>
    {children}
  </div>
);
