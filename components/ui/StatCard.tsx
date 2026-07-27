import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
};

export default function StatCard({
  label,
  value,
  description,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0B0B0B] p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-400">
            {label}
          </p>

          <h2 className="mt-3 text-4xl font-bold tracking-tight">
            {value}
          </h2>

          {description && (
            <p className="mt-2 text-sm text-zinc-500">
              {description}
            </p>
          )}
        </div>

        {icon && (
          <div className="text-zinc-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}