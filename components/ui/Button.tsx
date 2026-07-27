import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-black hover:bg-zinc-200",
  secondary:
    "border border-white/10 bg-white/5 text-white hover:bg-white/10",
  danger:
    "bg-red-600 text-white hover:bg-red-700",
};

export default function Button({
  children,
  variant = "primary",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={`rounded-xl px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}