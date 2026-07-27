"use client";

import { useMemo, useState } from "react";

import {
  Button,
  EmptyState,
  Modal,
  PageHeader,
} from "@/components/ui";

import EstimateForm, {
  type EstimateFormData,
} from "./EstimateForm";

import EstimateSearch from "./EstimateSearch";
import EstimateStats from "./EstimateStats";
import EstimateTable, {
  type Estimate,
} from "./EstimateTable";

type CustomerOption = {
  id: string;
  name: string;
};

type JobOption = {
  id: string;
  customerId: string;
  title: string;
};

type EstimateClientProps = {
  initialEstimates: Estimate[];
  customers: CustomerOption[];
  jobs: JobOption[];
};

export default function EstimateClient({
  initialEstimates,
  customers,
  jobs,
}: EstimateClientProps) {
  const [estimates, setEstimates] =
    useState<Estimate[]>(initialEstimates);

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const filteredEstimates = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    if (!normalizedSearch) {
      return estimates;
    }

    return estimates.filter((estimate) => {
      return (
        estimate.estimateNumber
          .toLowerCase()
          .includes(normalizedSearch) ||
        estimate.customerName
          .toLowerCase()
          .includes(normalizedSearch) ||
        estimate.jobTitle
          .toLowerCase()
          .includes(normalizedSearch) ||
        estimate.status
          .toLowerCase()
          .includes(normalizedSearch)
      );
    });
  }, [estimates, search]);

  function handleCreateEstimate(
    formData: EstimateFormData
  ) {
    const customer = customers.find(
      (item) => item.id === formData.customerId
    );

    const job = jobs.find(
      (item) => item.id === formData.jobId
    );

    if (!customer || !job) {
      return;
    }

    const subtotal = formData.lineItems.reduce(
      (sum, item) =>
        sum + item.quantity * item.unitPrice,
      0
    );

    const tax =
      subtotal * (formData.taxRate / 100);

    const total = subtotal + tax;

    const newEstimate: Estimate = {
      id: crypto.randomUUID(),
      customerId: customer.id,
      customerName: customer.name,
      jobId: job.id,
      jobTitle: job.title,
      estimateNumber: formData.estimateNumber,
      subtotal,
      tax,
      total,
      status: formData.status,
      createdAt: new Date().toISOString(),
    };

    setEstimates((current) => [
      newEstimate,
      ...current,
    ]);

    setIsModalOpen(false);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Estimates"
        description="Create, send, and track customer estimates."
        actions={
          <Button
            onClick={() => setIsModalOpen(true)}
          >
            New Estimate
          </Button>
        }
      />

      <EstimateStats estimates={estimates} />

      <EstimateSearch
        value={search}
        onChange={setSearch}
      />

      {filteredEstimates.length > 0 ? (
        <EstimateTable
          estimates={filteredEstimates}
        />
      ) : (
        <EmptyState
          title={
            search
              ? "No estimates found"
              : "No estimates yet"
          }
          description={
            search
              ? "Try changing your search."
              : "Create your first estimate to get started."
          }
          action={
            !search ? (
              <Button
                onClick={() =>
                  setIsModalOpen(true)
                }
              >
                Create Estimate
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
        title="Create Estimate"
      >
        <EstimateForm
          customers={customers}
          jobs={jobs}
          onSubmit={handleCreateEstimate}
        />
      </Modal>
    </div>
  );
}