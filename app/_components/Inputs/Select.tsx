import { SelectHTMLAttributes } from "react";

type Option = { value: string; label: string };

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
  error?: string;
  label?: string;
  description?: string;
  required?: boolean;
};

export function Select({
  options,
  error,
  label,
  description,
  required = false,
  ...props
}: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-base-content mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <select
        {...props}
        className={`select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
          error ? "select-error" : ""
        }`}
      >
        <option disabled value="">
          -- Select an option --
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {description && (
        <p className="text-xs text-base-content/60 mt-1.5">{description}</p>
      )}
      {error && (
        <p className="text-xs text-error mt-1.5 font-medium">{error}</p>
      )}
    </div>
  );
}
