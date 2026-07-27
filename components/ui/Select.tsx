import type { ReactNode, SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  children: ReactNode;
};

export default function Select({
  label,
  error,
  id,
  className = "",
  children,
  ...props
}: SelectProps) {
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

      <select
        id={id}
        {...props}
        className={`w-full rounded-xl border bg-black px-4 py-3 text-white outline-none transition ${
          error
            ? "border-red-500/60 focus:border-red-500"
            : "border-white/10 focus:border-white/30"
        } ${className}`}
      >
        {children}
      </select>

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}