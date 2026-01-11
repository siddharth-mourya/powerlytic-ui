import { InputHTMLAttributes, forwardRef } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div>
        <label className="text-xs text-gray-500">{label}</label>
        <input
          ref={ref}
          {...props}
          className={`input input-bordered w-full ${
            error ? "input-error" : ""
          }`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${props.name}-error` : undefined}
        />
        {error && (
          <p id={`${props.name}-error`} className="text-xs text-error mt-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
