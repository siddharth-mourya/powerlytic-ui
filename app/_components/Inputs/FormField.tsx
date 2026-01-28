"use client";

import { ReactNode } from "react";

type FormFieldProps = {
  label?: string;
  error?: string;
  description?: string;
  required?: boolean;
  children: ReactNode;
};

export function FormField({
  label,
  error,
  description,
  required = false,
  children,
}: FormFieldProps) {
  return (
    <div className="form-control w-full">
      {label && (
        <label className="label pb-2">
          <span className="label-text font-semibold text-base-content">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
      )}
      <div className="form-field-content">{children}</div>
      {description && (
        <p className="label text-xs text-base-content/60 pt-1">{description}</p>
      )}
      {error && (
        <p className="label text-xs text-error pt-1 font-medium">{error}</p>
      )}
    </div>
  );
}
