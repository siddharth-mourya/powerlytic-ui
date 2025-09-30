import { SelectHTMLAttributes } from "react";

type Option = { value: string; label: string };

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
  error?: string;
};

export function Select({ options, error, ...props }: SelectProps) {
  return (
    <select
      {...props}
      className={`select select-bordered w-full ${error ? "select-error" : ""}`}
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
  );
}
