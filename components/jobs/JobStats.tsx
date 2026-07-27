"use client";

import { Card } from "@/components/ui";

import type { Job } from "./JobTable";

type JobStatsProps = {
  jobs: Job[];
};

export default function JobStats({
  jobs,
}: JobStatsProps) {
  const totalJobs = jobs.length;

  const unscheduled = jobs.filter(
    (job) => job.status === "unscheduled"
  ).length;

  const scheduled = jobs.filter(
    (job) => job.status === "scheduled"
  ).length;

  const inProgress = jobs.filter(
    (job) => job.status === "in_progress"
  ).length;

  const completed = jobs.filter(
    (job) => job.status === "completed"
  ).length;

  return (
    <div className="grid gap-4 md:grid-cols-5">
      <Card className="p-5">
        <p className="text-sm text-zinc-400">
          Total Jobs
        </p>

        <p className="mt-2 text-3xl font-bold">
          {totalJobs}
        </p>
      </Card>

      <Card className="p-5">
        <p className="text-sm text-zinc-400">
          Unscheduled
        </p>

        <p className="mt-2 text-3xl font-bold">
          {unscheduled}
        </p>
      </Card>

      <Card className="p-5">
        <p className="text-sm text-zinc-400">
          Scheduled
        </p>

        <p className="mt-2 text-3xl font-bold">
          {scheduled}
        </p>
      </Card>

      <Card className="p-5">
        <p className="text-sm text-zinc-400">
          In Progress
        </p>

        <p className="mt-2 text-3xl font-bold">
          {inProgress}
        </p>
      </Card>

      <Card className="p-5">
        <p className="text-sm text-zinc-400">
          Completed
        </p>

        <p className="mt-2 text-3xl font-bold">
          {completed}
        </p>
      </Card>
    </div>
  );
}