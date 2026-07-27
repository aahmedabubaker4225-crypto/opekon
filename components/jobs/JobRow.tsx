"use client";

import { Badge, TableCell, TableRow } from "@/components/ui";

import type {
  Job,
  JobStatus,
} from "./JobTable";

type JobRowProps = {
  job: Job;
  onEdit?: (job: Job) => void;
  onDelete?: (job: Job) => void;
};

function getStatusVariant(
  status: JobStatus
):
  | "default"
  | "success"
  | "warning"
  | "danger" {
  switch (status) {
    case "completed":
      return "success";

    case "scheduled":
    case "in_progress":
      return "warning";

    case "cancelled":
      return "danger";

    default:
      return "default";
  }
}

function formatStatus(status: JobStatus) {
  switch (status) {
    case "unscheduled":
      return "Unscheduled";

    case "in_progress":
      return "In Progress";

    case "completed":
      return "Completed";

    case "scheduled":
      return "Scheduled";

    case "cancelled":
      return "Cancelled";
  }
}

function formatDate(date?: string | null) {
  if (!date) {
    return "Not scheduled";
  }

  return new Date(date).toLocaleDateString(
    "en-CA",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}

function formatPrice(price?: number | null) {
  if (price == null) {
    return "—";
  }

  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(price);
}

export default function JobRow({
  job,
  onEdit,
}: JobRowProps) {
  return (
    <TableRow
      className="cursor-pointer transition hover:bg-white/[0.03]"
      onClick={() => onEdit?.(job)}
    >
      <TableCell className="py-5">
        <div className="space-y-1">
          <p className="font-semibold text-white">
            {job.title}
          </p>

          {job.address && (
            <p className="text-sm text-zinc-400">
              {job.address}
            </p>
          )}
        </div>
      </TableCell>

      <TableCell className="py-5">
        <span className="text-zinc-200">
          {job.customerName}
        </span>
      </TableCell>

      <TableCell className="py-5">
        <span className="text-zinc-300">
          {formatDate(job.scheduledAt)}
        </span>
      </TableCell>

      <TableCell className="py-5">
        <Badge
          className="px-3 py-1 text-xs font-semibold"
          variant={getStatusVariant(job.status)}
        >
          {formatStatus(job.status)}
        </Badge>
      </TableCell>

      <TableCell className="py-5">
        <span className="font-medium text-white">
          {formatPrice(job.price)}
        </span>
      </TableCell>

      <TableCell className="py-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-xl text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
            onClick={(event) => {
              event.stopPropagation();
              onEdit?.(job);
            }}
          >
            ⋮
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}