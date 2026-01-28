import { TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
  label?: string;
  description?: string;
  required?: boolean;
};

export function TextArea({
  error,
  label,
  description,
  required = false,
  ...props
}: TextAreaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-base-content mb-2">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <textarea
        {...props}
        className={`textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all ${
          error ? "textarea-error" : ""
        }`}
      />
      {description && (
        <p className="text-xs text-base-content/60 mt-1.5">{description}</p>
      )}
      {error && (
        <p className="text-xs text-error mt-1.5 font-medium">{error}</p>
      )}
    </div>
  );
}
