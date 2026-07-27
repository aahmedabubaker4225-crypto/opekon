"use client";

import { useMemo, useState } from "react";
import {
  Button,
  Card,
  Input,
  Select,
  Textarea,
} from "@/components/ui";

import type {
  EstimateStatus,
} from "./EstimateTable";

export type EstimateLineItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
};

export type EstimateFormData = {
  customerId: string;
  jobId: string;
  estimateNumber: string;
  lineItems: EstimateLineItem[];
  taxRate: number;
  notes: string;
  status: EstimateStatus;
};

type CustomerOption = {
  id: string;
  name: string;
};

type JobOption = {
  id: string;
  customerId: string;
  title: string;
};

type EstimateFormProps = {
  customers: CustomerOption[];
  jobs: JobOption[];
  initialValues?: Partial<EstimateFormData>;
  submitLabel?: string;
  onSubmit?: (
    estimate: EstimateFormData
  ) => void | Promise<void>;
};

export default function EstimateForm({
  customers,
  jobs,
  initialValues,
  submitLabel = "Save Estimate",
  onSubmit,
}: EstimateFormProps) {
  const [customerId, setCustomerId] = useState(
    initialValues?.customerId ?? ""
  );

  const [jobId, setJobId] = useState(
    initialValues?.jobId ?? ""
  );

  const [estimateNumber, setEstimateNumber] =
    useState(
      initialValues?.estimateNumber ??
        `EST-${Date.now().toString().slice(-6)}`
    );

  const [lineItems, setLineItems] = useState<
    EstimateLineItem[]
  >(
    initialValues?.lineItems ?? [
      {
        id: crypto.randomUUID(),
        description: "",
        quantity: 1,
        unitPrice: 0,
      },
    ]
  );

  const [taxRate, setTaxRate] = useState(
    initialValues?.taxRate ?? 5
  );

  const [notes, setNotes] = useState(
    initialValues?.notes ?? ""
  );

  const [status, setStatus] =
    useState<EstimateStatus>(
      initialValues?.status ?? "draft"
    );

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const availableJobs = useMemo(() => {
    if (!customerId) {
      return jobs;
    }

    return jobs.filter(
      (job) => job.customerId === customerId
    );
  }, [customerId, jobs]);

  const subtotal = useMemo(() => {
    return lineItems.reduce((total, item) => {
      return (
        total +
        Number(item.quantity || 0) *
          Number(item.unitPrice || 0)
      );
    }, 0);
  }, [lineItems]);

  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  function updateLineItem(
    id: string,
    field: keyof Omit<EstimateLineItem, "id">,
    value: string
  ) {
    setLineItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== id) {
          return item;
        }

        if (field === "description") {
          return {
            ...item,
            description: value,
          };
        }

        return {
          ...item,
          [field]: Number(value),
        };
      })
    );
  }

  function addLineItem() {
    setLineItems((currentItems) => [
      ...currentItems,
      {
        id: crypto.randomUUID(),
        description: "",
        quantity: 1,
        unitPrice: 0,
      },
    ]);
  }

  function removeLineItem(id: string) {
    setLineItems((currentItems) => {
      if (currentItems.length === 1) {
        return currentItems;
      }

      return currentItems.filter(
        (item) => item.id !== id
      );
    });
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (
      !customerId ||
      !jobId ||
      !estimateNumber.trim()
    ) {
      return;
    }

    const validLineItems = lineItems.filter(
      (item) =>
        item.description.trim() &&
        item.quantity > 0
    );

    if (validLineItems.length === 0) {
      return;
    }

    try {
      setIsSubmitting(true);

      await onSubmit?.({
        customerId,
        jobId,
        estimateNumber:
          estimateNumber.trim(),
        lineItems: validLineItems,
        taxRate,
        notes: notes.trim(),
        status,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="max-w-3xl">
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <Select
          label="Customer"
          value={customerId}
          onChange={(event) => {
            setCustomerId(event.target.value);
            setJobId("");
          }}
          required
        >
          <option value="">
            Select a customer
          </option>

          {customers.map((customer) => (
            <option
              key={customer.id}
              value={customer.id}
            >
              {customer.name}
            </option>
          ))}
        </Select>

        <Select
          label="Job"
          value={jobId}
          onChange={(event) =>
            setJobId(event.target.value)
          }
          required
          disabled={!customerId}
        >
          <option value="">
            Select a job
          </option>

          {availableJobs.map((job) => (
            <option
              key={job.id}
              value={job.id}
            >
              {job.title}
            </option>
          ))}
        </Select>

        <Input
          label="Estimate Number"
          value={estimateNumber}
          onChange={(event) =>
            setEstimateNumber(
              event.target.value
            )
          }
          required
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-white">
              Line Items
            </h3>

            <Button
              type="button"
              onClick={addLineItem}
            >
              Add Item
            </Button>
          </div>

          {lineItems.map((item) => (
            <div
              key={item.id}
              className="grid gap-3 rounded-lg border border-zinc-800 p-4 md:grid-cols-[1fr_110px_140px_auto]"
            >
              <Input
                label="Description"
                placeholder="Junk removal service"
                value={item.description}
                onChange={(event) =>
                  updateLineItem(
                    item.id,
                    "description",
                    event.target.value
                  )
                }
                required
              />

              <Input
                label="Quantity"
                type="number"
                min="1"
                step="1"
                value={item.quantity}
                onChange={(event) =>
                  updateLineItem(
                    item.id,
                    "quantity",
                    event.target.value
                  )
                }
                required
              />

              <Input
                label="Unit Price"
                type="number"
                min="0"
                step="0.01"
                value={item.unitPrice}
                onChange={(event) =>
                  updateLineItem(
                    item.id,
                    "unitPrice",
                    event.target.value
                  )
                }
                required
              />

              <div className="flex items-end">
                <Button
                  type="button"
                  onClick={() =>
                    removeLineItem(item.id)
                  }
                  disabled={
                    lineItems.length === 1
                  }
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Input
          label="Tax Rate (%)"
          type="number"
          min="0"
          step="0.01"
          value={taxRate}
          onChange={(event) =>
            setTaxRate(
              Number(event.target.value)
            )
          }
        />

        <Textarea
          label="Notes"
          placeholder="Payment terms, exclusions, or additional details."
          value={notes}
          onChange={(event) =>
            setNotes(event.target.value)
          }
          rows={4}
        />

        <Select
          label="Status"
          value={status}
          onChange={(event) =>
            setStatus(
              event.target
                .value as EstimateStatus
            )
          }
        >
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="viewed">
            Viewed
          </option>
          <option value="accepted">
            Accepted
          </option>
          <option value="declined">
            Declined
          </option>
        </Select>

        <div className="rounded-lg border border-zinc-800 p-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span>
                {subtotal.toLocaleString(
                  "en-CA",
                  {
                    style: "currency",
                    currency: "CAD",
                  }
                )}
              </span>
            </div>

            <div className="flex justify-between text-zinc-400">
              <span>Tax</span>
              <span>
                {tax.toLocaleString("en-CA", {
                  style: "currency",
                  currency: "CAD",
                })}
              </span>
            </div>

            <div className="flex justify-between border-t border-zinc-800 pt-2 text-base font-semibold text-white">
              <span>Total</span>
              <span>
                {total.toLocaleString(
                  "en-CA",
                  {
                    style: "currency",
                    currency: "CAD",
                  }
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={
              isSubmitting ||
              !customerId ||
              !jobId ||
              !estimateNumber.trim()
            }
          >
            {isSubmitting
              ? "Saving..."
              : submitLabel}
          </Button>
        </div>
      </form>
    </Card>
  );
}