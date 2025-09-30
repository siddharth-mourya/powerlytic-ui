import { InputHTMLAttributes } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export function TextInput({ error, ...props }: TextInputProps) {
  return (
    <input
      {...props}
      className={`input input-bordered w-full ${error ? "input-error" : ""}`}
    />
  );
}
