"use client";

import { ReactNode } from "react";

type FormFieldProps = {
  label?: string;
  error?: string;
  description?: string;
  children: ReactNode;
};

export function FormField({
  label,
  error,
  description,
  children,
}: FormFieldProps) {
  return (
    <div className="form-control w-full space-y-1">
      {label && <label className="label font-medium">{label}</label>}
      {children}
      {description && <p className="text-sm text-gray-500">{description}</p>}
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
}
