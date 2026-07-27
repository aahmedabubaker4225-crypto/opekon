"use client";

import { useMemo, useState } from "react";

import {
  Button,
  Card,
  Input,
  Select,
  Textarea,
} from "@/components/ui";

import type { InvoiceStatus } from "./InvoiceTable";

export type InvoiceLineItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
};

export type InvoiceFormData = {
  customerId: string;
  jobId: string;
  estimateId: string;
  invoiceNumber: string;
  lineItems: InvoiceLineItem[];
  taxRate: number;
  amountPaid: number;
  issueDate: string;
  dueDate: string;
  notes: string;
  status: InvoiceStatus;
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

type EstimateOption = {
  id: string;
  customerId: string;
  jobId: string;
  estimateNumber: string;
  subtotal: number;
  tax: number;
  total: number;
};

type InvoiceFormProps = {
  customers: CustomerOption[];
  jobs: JobOption[];
  estimates: EstimateOption[];
  initialValues?: Partial<InvoiceFormData>;
  submitLabel?: string;
  onSubmit?: (
    invoice: InvoiceFormData
  ) => void | Promise<void>;
};

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

function getDefaultDueDate() {
  const date = new Date();
  date.setDate(date.getDate() + 14);

  return date.toISOString().split("T")[0];
}

export default function InvoiceForm({
  customers,
  jobs,
  estimates,
  initialValues,
  submitLabel = "Save Invoice",
  onSubmit,
}: InvoiceFormProps) {
  const [customerId, setCustomerId] = useState(
    initialValues?.customerId ?? ""
  );

  const [jobId, setJobId] = useState(
    initialValues?.jobId ?? ""
  );

  const [estimateId, setEstimateId] = useState(
    initialValues?.estimateId ?? ""
  );

  const [invoiceNumber, setInvoiceNumber] =
    useState(
      initialValues?.invoiceNumber ??
        `INV-${Date.now().toString().slice(-6)}`
    );

  const [lineItems, setLineItems] = useState<
    InvoiceLineItem[]
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

  const [amountPaid, setAmountPaid] = useState(
    initialValues?.amountPaid ?? 0
  );

  const [issueDate, setIssueDate] = useState(
    initialValues?.issueDate ?? getTodayDate()
  );

  const [dueDate, setDueDate] = useState(
    initialValues?.dueDate ??
      getDefaultDueDate()
  );

  const [notes, setNotes] = useState(
    initialValues?.notes ?? ""
  );

  const [status, setStatus] =
    useState<InvoiceStatus>(
      initialValues?.status ?? "draft"
    );

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const availableJobs = useMemo(() => {
    if (!customerId) {
      return [];
    }

    return jobs.filter(
      (job) => job.customerId === customerId
    );
  }, [customerId, jobs]);

  const availableEstimates = useMemo(() => {
    return estimates.filter((estimate) => {
      if (
        customerId &&
        estimate.customerId !== customerId
      ) {
        return false;
      }

      if (
        jobId &&
        estimate.jobId !== jobId
      ) {
        return false;
      }

      return true;
    });
  }, [customerId, jobId, estimates]);

  const subtotal = useMemo(() => {
    return lineItems.reduce((sum, item) => {
      return (
        sum +
        Number(item.quantity || 0) *
          Number(item.unitPrice || 0)
      );
    }, 0);
  }, [lineItems]);

  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;
  const balanceDue = Math.max(
    total - amountPaid,
    0
  );

  function updateLineItem(
    id: string,
    field: keyof Omit<InvoiceLineItem, "id">,
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

  function handleEstimateChange(
    selectedEstimateId: string
  ) {
    setEstimateId(selectedEstimateId);

    const selectedEstimate = estimates.find(
      (estimate) =>
        estimate.id === selectedEstimateId
    );

    if (!selectedEstimate) {
      return;
    }

    setCustomerId(selectedEstimate.customerId);
    setJobId(selectedEstimate.jobId);

    const estimatedTaxRate =
      selectedEstimate.subtotal > 0
        ? (selectedEstimate.tax /
            selectedEstimate.subtotal) *
          100
        : 0;

    setTaxRate(estimatedTaxRate);

    setLineItems([
      {
        id: crypto.randomUUID(),
        description: `Estimate ${selectedEstimate.estimateNumber}`,
        quantity: 1,
        unitPrice: selectedEstimate.subtotal,
      },
    ]);
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (
      !customerId ||
      !jobId ||
      !invoiceNumber.trim() ||
      !issueDate ||
      !dueDate
    ) {
      return;
    }

    const validLineItems = lineItems.filter(
      (item) =>
        item.description.trim() &&
        item.quantity > 0 &&
        item.unitPrice >= 0
    );

    if (validLineItems.length === 0) {
      return;
    }

    try {
      setIsSubmitting(true);

      await onSubmit?.({
        customerId,
        jobId,
        estimateId,
        invoiceNumber:
          invoiceNumber.trim(),
        lineItems: validLineItems,
        taxRate,
        amountPaid,
        issueDate,
        dueDate,
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
            setEstimateId("");
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
          onChange={(event) => {
            setJobId(event.target.value);
            setEstimateId("");
          }}
          disabled={!customerId}
          required
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

        <Select
          label="Accepted Estimate"
          value={estimateId}
          onChange={(event) =>
            handleEstimateChange(
              event.target.value
            )
          }
          disabled={!customerId || !jobId}
        >
          <option value="">
            No linked estimate
          </option>

          {availableEstimates.map(
            (estimate) => (
              <option
                key={estimate.id}
                value={estimate.id}
              >
                {estimate.estimateNumber} —{" "}
                {new Intl.NumberFormat("en-CA", {
                  style: "currency",
                  currency: "CAD",
                }).format(estimate.total)}
              </option>
            )
          )}
        </Select>

        <Input
          label="Invoice Number"
          value={invoiceNumber}
          onChange={(event) =>
            setInvoiceNumber(
              event.target.value
            )
          }
          required
        />

        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Issue Date"
            type="date"
            value={issueDate}
            onChange={(event) =>
              setIssueDate(event.target.value)
            }
            required
          />

          <Input
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(event) =>
              setDueDate(event.target.value)
            }
            required
          />
        </div>

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

        <div className="grid gap-4 md:grid-cols-2">
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

          <Input
            label="Amount Paid"
            type="number"
            min="0"
            step="0.01"
            value={amountPaid}
            onChange={(event) =>
              setAmountPaid(
                Number(event.target.value)
              )
            }
          />
        </div>

        <Textarea
          label="Notes"
          placeholder="Payment terms or additional details."
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
                .value as InvoiceStatus
            )
          }
        >
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="viewed">
            Viewed
          </option>
          <option value="paid">Paid</option>
          <option value="overdue">
            Overdue
          </option>
          <option value="cancelled">
            Cancelled
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

            <div className="flex justify-between text-zinc-400">
              <span>Amount Paid</span>
              <span>
                {amountPaid.toLocaleString(
                  "en-CA",
                  {
                    style: "currency",
                    currency: "CAD",
                  }
                )}
              </span>
            </div>

            <div className="flex justify-between border-t border-zinc-800 pt-2 text-base font-semibold text-white">
              <span>Balance Due</span>
              <span>
                {balanceDue.toLocaleString(
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
              !invoiceNumber.trim()
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