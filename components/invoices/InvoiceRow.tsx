import {
  Badge,
  TableCell,
  TableRow,
} from "@/components/ui";

import type {
  Invoice,
  InvoiceStatus,
} from "./InvoiceTable";

type InvoiceRowProps = {
  invoice: Invoice;
};

function getStatusVariant(
  status: InvoiceStatus
):
  | "default"
  | "success"
  | "warning"
  | "danger" {
  switch (status) {
    case "paid":
      return "success";

    case "sent":
    case "viewed":
      return "warning";

    case "overdue":
    case "cancelled":
      return "danger";

    default:
      return "default";
  }
}

function formatStatus(status: InvoiceStatus) {
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

export default function InvoiceRow({
  invoice,
}: InvoiceRowProps) {
  return (
    <TableRow>
      <TableCell>
        <p className="font-medium text-white">
          {invoice.invoiceNumber}
        </p>

        {invoice.dueDate && (
          <p className="mt-1 text-sm text-zinc-400">
            Due{" "}
            {new Date(
              invoice.dueDate
            ).toLocaleDateString("en-CA")}
          </p>
        )}
      </TableCell>

      <TableCell>
        {invoice.customerName}
      </TableCell>

      <TableCell>
        {invoice.jobTitle}
      </TableCell>

      <TableCell>
        <span className="font-medium text-white">
          {formatCurrency(invoice.total)}
        </span>
      </TableCell>

      <TableCell>
        <span className="font-medium text-white">
          {formatCurrency(
            invoice.balanceDue
          )}
        </span>
      </TableCell>

      <TableCell>
        <Badge
          variant={getStatusVariant(
            invoice.status
          )}
        >
          {formatStatus(invoice.status)}
        </Badge>
      </TableCell>
    </TableRow>
  );
}