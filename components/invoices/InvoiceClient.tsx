"use client";

import { useMemo, useState } from "react";

import {
  Button,
  EmptyState,
  Modal,
  PageHeader,
} from "@/components/ui";

import InvoiceForm, {
  type InvoiceFormData,
} from "./InvoiceForm";

import InvoiceSearch from "./InvoiceSearch";
import InvoiceStats from "./InvoiceStats";
import InvoiceTable, {
  type Invoice,
} from "./InvoiceTable";

type CustomerOption = {
  id: string;
  name: string;
};

type JobOption = {
  id: string;
  customerId: string;
  title: string;
};

type EstimateOption = {
  id: string;
  customerId: string;
  jobId: string;
  estimateNumber: string;
  subtotal: number;
  tax: number;
  total: number;
};

type InvoiceClientProps = {
  initialInvoices: Invoice[];
  customers: CustomerOption[];
  jobs: JobOption[];
  estimates: EstimateOption[];
};

export default function InvoiceClient({
  initialInvoices,
  customers,
  jobs,
  estimates,
}: InvoiceClientProps) {
  const [invoices, setInvoices] =
    useState<Invoice[]>(initialInvoices);

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const filteredInvoices = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return invoices;
    }

    return invoices.filter((invoice) => {
      return (
        invoice.invoiceNumber
          .toLowerCase()
          .includes(query) ||
        invoice.customerName
          .toLowerCase()
          .includes(query) ||
        invoice.jobTitle
          .toLowerCase()
          .includes(query) ||
        invoice.status
          .toLowerCase()
          .includes(query)
      );
    });
  }, [invoices, search]);

  function handleCreateInvoice(
    formData: InvoiceFormData
  ) {
    const customer = customers.find(
      (customer) =>
        customer.id === formData.customerId
    );

    const job = jobs.find(
      (job) => job.id === formData.jobId
    );

    if (!customer || !job) {
      return;
    }

    const subtotal =
      formData.lineItems.reduce(
        (
          sum: number,
          item: InvoiceFormData["lineItems"][number]
        ) => {
          return (
            sum +
            item.quantity * item.unitPrice
          );
        },
        0
      );

    const tax =
      subtotal * (formData.taxRate / 100);

    const total = subtotal + tax;

    const balanceDue = Math.max(
      total - formData.amountPaid,
      0
    );

    const newInvoice: Invoice = {
      id: crypto.randomUUID(),
      invoiceNumber:
        formData.invoiceNumber,
      customerId: customer.id,
      customerName: customer.name,
      jobId: job.id,
      jobTitle: job.title,
      estimateId:
        formData.estimateId || null,
      subtotal,
      tax,
      total,
      amountPaid:
        formData.amountPaid,
      balanceDue,
      status: formData.status,
      issueDate: formData.issueDate,
      dueDate: formData.dueDate,
      createdAt:
        new Date().toISOString(),
    };

    setInvoices((currentInvoices) => [
      newInvoice,
      ...currentInvoices,
    ]);

    setIsModalOpen(false);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Invoices"
        description="Create and manage invoices."
        actions={
          <Button
            onClick={() =>
              setIsModalOpen(true)
            }
          >
            New Invoice
          </Button>
        }
      />

      <InvoiceStats invoices={invoices} />

      <InvoiceSearch
        value={search}
        onChange={setSearch}
      />

      {filteredInvoices.length > 0 ? (
        <InvoiceTable
          invoices={filteredInvoices}
        />
      ) : (
        <EmptyState
          title={
            search
              ? "No invoices found"
              : "No invoices yet"
          }
          description={
            search
              ? "Try changing your search."
              : "Create your first invoice to get started."
          }
          action={
            !search ? (
              <Button
                onClick={() =>
                  setIsModalOpen(true)
                }
              >
                Create Invoice
              </Button>
            ) : undefined
          }
        />
      )}

      <Modal
        open={isModalOpen}
        onClose={() =>
          setIsModalOpen(false)
        }
        title="Create Invoice"
      >
        <InvoiceForm
          customers={customers}
          jobs={jobs}
          estimates={estimates}
          onSubmit={handleCreateInvoice}
        />
      </Modal>
    </div>
  );
}