import { InputHTMLAttributes, forwardRef } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  description?: string;
  required?: boolean;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, description, required = false, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-base-content mb-2">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          {...props}
          className={`input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
            error ? "input-error" : ""
          }`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${props.name}-error` : undefined}
        />
        {description && (
          <p className="text-xs text-base-content/60 mt-1.5">{description}</p>
        )}
        {error && (
          <p
            id={`${props.name}-error`}
            className="text-xs text-error mt-1.5 font-medium"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";
