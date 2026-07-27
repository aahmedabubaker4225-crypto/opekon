import { StatCard } from "@/components/ui";

import type { Estimate } from "./EstimateTable";

type EstimateStatsProps = {
  estimates: Estimate[];
};

export default function EstimateStats({
  estimates,
}: EstimateStatsProps) {
  const total = estimates.length;

  const draft = estimates.filter(
    (estimate) => estimate.status === "draft"
  ).length;

  const sent = estimates.filter(
    (estimate) =>
      estimate.status === "sent" ||
      estimate.status === "viewed"
  ).length;

  const acceptedValue = estimates
    .filter(
      (estimate) =>
        estimate.status === "accepted"
    )
    .reduce(
      (sum, estimate) =>
        sum + estimate.total,
      0
    );

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <StatCard
        label="Total Estimates"
        value={total}
      />

      <StatCard
        label="Draft"
        value={draft}
      />

      <StatCard
        label="Sent"
        value={sent}
      />

      <StatCard
        label="Accepted Value"
        value={new Intl.NumberFormat("en-CA", {
          style: "currency",
          currency: "CAD",
        }).format(acceptedValue)}
      />
    </div>
  );
}