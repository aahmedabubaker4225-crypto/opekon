import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

import JobRow from "./JobRow";

export type JobStatus =
  | "unscheduled"
  | "scheduled"
  | "in_progress"
  | "completed"
  | "cancelled";

export type JobPriority =
  | "normal"
  | "high"
  | "urgent";

export type Job = {
  id: string;

  customerId: string;
  customerName: string;

  title: string;
  description?: string | null;

  address?: string | null;

  scheduledAt?: string | null;

  price?: number | null;

  priority: JobPriority;

  status: JobStatus;

  notes?: string | null;

  createdAt?: string | null;
};

type JobTableProps = {
  jobs: Job[];

  onEdit?: (job: Job) => void;

  onDelete?: (job: Job) => void;
};

export default function JobTable({
  jobs,
  onEdit,
  onDelete,
}: JobTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <Table className="min-w-[1050px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[260px]">
              Job
            </TableHead>

            <TableHead className="w-[180px]">
              Customer
            </TableHead>

            <TableHead className="w-[200px]">
              Scheduled
            </TableHead>

            <TableHead className="w-[140px]">
              Status
            </TableHead>

            <TableHead className="w-[120px]">
              Price
            </TableHead>

            <TableHead className="w-[80px] text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobs.map((job) => (
            <JobRow
              key={job.id}
              job={job}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}