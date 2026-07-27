import type {
  HTMLAttributes,
  TableHTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
} from "react";

export function Table({
  className = "",
  ...props
}: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table
        {...props}
        className={`w-full border-collapse text-left ${className}`}
      />
    </div>
  );
}

export function TableHeader({
  className = "",
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      {...props}
      className={`border-b border-white/10 bg-white/[0.03] ${className}`}
    />
  );
}

export function TableBody({
  className = "",
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} className={className} />;
}

export function TableRow({
  className = "",
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      {...props}
      className={`border-b border-white/10 last:border-b-0 hover:bg-white/[0.02] ${className}`}
    />
  );
}

export function TableHead({
  className = "",
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      {...props}
      className={`px-5 py-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 ${className}`}
    />
  );
}

export function TableCell({
  className = "",
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      {...props}
      className={`px-5 py-4 text-sm text-zinc-300 ${className}`}
    />
  );
}