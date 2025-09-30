import { TextareaHTMLAttributes } from "react";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

export function TextArea({ error, ...props }: TextAreaProps) {
  return (
    <textarea
      {...props}
      className={`textarea textarea-bordered w-full ${
        error ? "textarea-error" : ""
      }`}
    />
  );
}
