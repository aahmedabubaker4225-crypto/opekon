import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export default function Card({
  children,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      {...props}
      className={`rounded-2xl border border-white/10 bg-[#0B0B0B] p-6 ${className}`}
    >
      {children}
    </div>
  );
}