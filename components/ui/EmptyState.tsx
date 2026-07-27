import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export default function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-white/10 bg-[#0B0B0B] px-6 py-12 text-center">
      <h2 className="text-xl font-semibold text-white">
        {title}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-400">
        {description}
      </p>

      {action && (
        <div className="mt-6 flex justify-center">
          {action}
        </div>
      )}
    </div>
  );
}