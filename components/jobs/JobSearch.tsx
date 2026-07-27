"use client";

import {
  Input,
  Select,
} from "@/components/ui";

import type { JobStatus } from "./JobTable";

type JobSearchProps = {
  search: string;
  status: "all" | JobStatus;

  onSearchChange: (
    value: string
  ) => void;

  onStatusChange: (
    value: "all" | JobStatus
  ) => void;
};

export default function JobSearch({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: JobSearchProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <Input
        placeholder="Search jobs..."
        value={search}
        onChange={(e) =>
          onSearchChange(e.target.value)
        }
        className="flex-1"
      />

      <Select
        value={status}
        onChange={(e) =>
          onStatusChange(
            e.target.value as
              | "all"
              | JobStatus
          )
        }
        className="w-full md:w-56"
      >
        <option value="all">
          All Statuses
        </option>

        <option value="unscheduled">
          Unscheduled
        </option>

        <option value="scheduled">
          Scheduled
        </option>

        <option value="in_progress">
          In Progress
        </option>

        <option value="completed">
          Completed
        </option>

        <option value="cancelled">
          Cancelled
        </option>
      </Select>
    </div>
  );
}