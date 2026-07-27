import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

import EstimateRow from "./EstimateRow";

export type EstimateStatus =
  | "draft"
  | "sent"
  | "viewed"
  | "accepted"
  | "declined";

export type Estimate = {
  id: string;
  jobId: string;
  jobTitle: string;
  customerId: string;
  customerName: string;
  estimateNumber: string;
  subtotal: number;
  tax: number;
  total: number;
  status: EstimateStatus;
  createdAt?: string;
};

type EstimateTableProps = {
  estimates: Estimate[];
};

export default function EstimateTable({
  estimates,
}: EstimateTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Estimate</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Job</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {estimates.map((estimate) => (
          <EstimateRow
            key={estimate.id}
            estimate={estimate}
          />
        ))}
      </TableBody>
    </Table>
  );
}