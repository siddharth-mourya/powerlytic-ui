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
      "bg-base-100 border border-base-300 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200",
      className,
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
      "mb-4 pb-4 flex items-center justify-between border-b border-base-300",
      className,
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
  <h2 className={classNames("text-xl font-bold text-base-content", className)}>
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
