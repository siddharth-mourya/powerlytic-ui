import { InputHTMLAttributes } from "react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Checkbox({ label, ...props }: CheckboxProps) {
  return (
    <label className="label cursor-pointer gap-2">
      <input type="checkbox" className="checkbox" {...props} />
      {label && <span className="label-text">{label}</span>}
    </label>
  );
}
