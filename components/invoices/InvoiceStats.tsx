import { StatCard } from "@/components/ui";

import type { Invoice } from "./InvoiceTable";

type InvoiceStatsProps = {
  invoices: Invoice[];
};

export default function InvoiceStats({
  invoices,
}: InvoiceStatsProps) {
  const totalInvoices = invoices.length;

  const unpaidInvoices = invoices.filter(
    (invoice) =>
      invoice.status !== "paid" &&
      invoice.status !== "cancelled"
  ).length;

  const overdueInvoices = invoices.filter(
    (invoice) => invoice.status === "overdue"
  ).length;

  const outstandingBalance = invoices.reduce(
    (sum, invoice) =>
      invoice.status === "cancelled"
        ? sum
        : sum + invoice.balanceDue,
    0
  );

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <StatCard
        label="Total Invoices"
        value={totalInvoices}
      />

      <StatCard
        label="Unpaid"
        value={unpaidInvoices}
      />

      <StatCard
        label="Overdue"
        value={overdueInvoices}
      />

      <StatCard
        label="Outstanding"
        value={new Intl.NumberFormat("en-CA", {
          style: "currency",
          currency: "CAD",
        }).format(outstandingBalance)}
      />
    </div>
  );
}