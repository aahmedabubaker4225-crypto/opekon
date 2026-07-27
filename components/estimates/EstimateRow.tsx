import {
  Badge,
  TableCell,
  TableRow,
} from "@/components/ui";

import type {
  Estimate,
  EstimateStatus,
} from "./EstimateTable";

type EstimateRowProps = {
  estimate: Estimate;
};

function getStatusVariant(
  status: EstimateStatus
):
  | "default"
  | "success"
  | "warning"
  | "danger" {
  switch (status) {
    case "accepted":
      return "success";

    case "sent":
    case "viewed":
      return "warning";

    case "declined":
      return "danger";

    default:
      return "default";
  }
}

function formatStatus(status: EstimateStatus) {
  return status
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  }).format(value);
}

export default function EstimateRow({
  estimate,
}: EstimateRowProps) {
  return (
    <TableRow>
      <TableCell>
        <p className="font-medium text-white">
          {estimate.estimateNumber}
        </p>

        {estimate.createdAt && (
          <p className="mt-1 text-sm text-zinc-400">
            {new Date(
              estimate.createdAt
            ).toLocaleDateString("en-CA")}
          </p>
        )}
      </TableCell>

      <TableCell>
        {estimate.customerName}
      </TableCell>

      <TableCell>
        {estimate.jobTitle}
      </TableCell>

      <TableCell>
        <span className="font-medium text-white">
          {formatCurrency(estimate.total)}
        </span>
      </TableCell>

      <TableCell>
        <Badge
          variant={getStatusVariant(
            estimate.status
          )}
        >
          {formatStatus(estimate.status)}
        </Badge>
      </TableCell>
    </TableRow>
  );
}