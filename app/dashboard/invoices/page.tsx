import InvoiceClient from "@/components/invoices/InvoiceClient";

import type { Invoice } from "@/components/invoices/InvoiceTable";

export default function InvoicesPage() {
  const customers = [
    {
      id: "customer-1",
      name: "John Smith",
    },
    {
      id: "customer-2",
      name: "Sarah Johnson",
    },
  ];

  const jobs = [
    {
      id: "job-1",
      customerId: "customer-1",
      title: "Garage Cleanout",
    },
    {
      id: "job-2",
      customerId: "customer-2",
      title: "Basement Cleanup",
    },
  ];

  const estimates = [
    {
      id: "estimate-1",
      customerId: "customer-1",
      jobId: "job-1",
      estimateNumber: "EST-1001",
      subtotal: 450,
      tax: 22.5,
      total: 472.5,
    },
    {
      id: "estimate-2",
      customerId: "customer-2",
      jobId: "job-2",
      estimateNumber: "EST-1002",
      subtotal: 800,
      tax: 40,
      total: 840,
    },
  ];

  const invoices: Invoice[] = [
    {
      id: "invoice-1",
      invoiceNumber: "INV-1001",
      customerId: "customer-1",
      customerName: "John Smith",
      jobId: "job-1",
      jobTitle: "Garage Cleanout",
      estimateId: "estimate-1",
      subtotal: 450,
      tax: 22.5,
      total: 472.5,
      amountPaid: 0,
      balanceDue: 472.5,
      status: "sent",
      issueDate: "2026-07-20",
      dueDate: "2026-08-03",
      createdAt: "2026-07-20T10:00:00.000Z",
    },
    {
      id: "invoice-2",
      invoiceNumber: "INV-1002",
      customerId: "customer-2",
      customerName: "Sarah Johnson",
      jobId: "job-2",
      jobTitle: "Basement Cleanup",
      estimateId: "estimate-2",
      subtotal: 800,
      tax: 40,
      total: 840,
      amountPaid: 840,
      balanceDue: 0,
      status: "paid",
      issueDate: "2026-07-18",
      dueDate: "2026-08-01",
      createdAt: "2026-07-18T10:00:00.000Z",
    },
  ];

  return (
    <InvoiceClient
      initialInvoices={invoices}
      customers={customers}
      jobs={jobs}
      estimates={estimates}
    />
  );
}