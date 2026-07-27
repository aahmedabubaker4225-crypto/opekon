import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-white"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        {...props}
        className={`w-full rounded-xl border bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 ${
          error
            ? "border-red-500/60 focus:border-red-500"
            : "border-white/10 focus:border-white/30"
        } ${className}`}
      />

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}