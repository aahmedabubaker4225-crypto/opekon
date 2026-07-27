import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

import InvoiceRow from "./InvoiceRow";

export type InvoiceStatus =
  | "draft"
  | "sent"
  | "viewed"
  | "paid"
  | "overdue"
  | "cancelled";

export type Invoice = {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  jobId: string;
  jobTitle: string;
  estimateId?: string | null;
  subtotal: number;
  tax: number;
  total: number;
  amountPaid: number;
  balanceDue: number;
  status: InvoiceStatus;
  issueDate?: string;
  dueDate?: string;
  createdAt?: string;
};

type InvoiceTableProps = {
  invoices: Invoice[];
};

export default function InvoiceTable({
  invoices,
}: InvoiceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Job</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Balance Due</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {invoices.map((invoice) => (
          <InvoiceRow
            key={invoice.id}
            invoice={invoice}
          />
        ))}
      </TableBody>
    </Table>
  );
}