import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            {eyebrow}
          </p>
        )}

        <h1 className="mt-2 text-4xl font-bold">
          {title}
        </h1>

        {description && (
          <p className="mt-3 max-w-2xl text-sm text-zinc-400">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}
    </div>
  );
}