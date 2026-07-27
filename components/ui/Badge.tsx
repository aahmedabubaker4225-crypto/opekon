import type { HTMLAttributes } from "react";

type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variants: Record<BadgeVariant, string> = {
  default: "bg-white/10 text-white",
  success: "bg-green-500/15 text-green-400",
  warning: "bg-yellow-500/15 text-yellow-400",
  danger: "bg-red-500/15 text-red-400",
  info: "bg-blue-500/15 text-blue-400",
};

export default function Badge({
  variant = "default",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      {...props}
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}