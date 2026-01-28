import { InputHTMLAttributes } from "react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  description?: string;
};

export function Checkbox({ label, description, ...props }: CheckboxProps) {
  return (
    <div className="flex items-start gap-3">
      <label className="label cursor-pointer gap-2 p-0">
        <input
          type="checkbox"
          className="checkbox checkbox-primary transition-all focus:ring-2 focus:ring-primary/30"
          {...props}
        />
        {label && <span className="label-text font-medium">{label}</span>}
      </label>
      {description && (
        <p className="text-xs text-base-content/60 mt-0.5">{description}</p>
      )}
    </div>
  );
}
