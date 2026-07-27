import type { TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export default function Textarea({
  label,
  error,
  id,
  className = "",
  ...props
}: TextareaProps) {
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

      <textarea
        id={id}
        {...props}
        className={`min-h-[120px] w-full resize-y rounded-xl border bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 ${
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