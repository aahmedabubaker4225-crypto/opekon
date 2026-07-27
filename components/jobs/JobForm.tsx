"use client";

import { useState } from "react";
import {
  Button,
  Card,
  Input,
  Select,
  Textarea,
} from "@/components/ui";

import type {
  JobPriority,
  JobStatus,
} from "./JobTable";

export type JobFormData = {
  customerId: string;
  title: string;
  description: string;
  address: string;
  scheduledAt: string;
  price: string;
  priority: JobPriority;
  status: JobStatus;
  notes: string;
};

type CustomerOption = {
  id: string;
  name: string;
};

type JobFormProps = {
  customers: CustomerOption[];
  initialValues?: Partial<JobFormData>;
  submitLabel?: string;
  onSubmit?: (
    job: JobFormData
  ) => void | Promise<void>;
};

export default function JobForm({
  customers,
  initialValues,
  submitLabel = "Save Job",
  onSubmit,
}: JobFormProps) {
  const [customerId, setCustomerId] = useState(
    initialValues?.customerId ?? ""
  );

  const [title, setTitle] = useState(
    initialValues?.title ?? ""
  );

  const [description, setDescription] = useState(
    initialValues?.description ?? ""
  );

  const [address, setAddress] = useState(
    initialValues?.address ?? ""
  );

  const [scheduledAt, setScheduledAt] =
    useState(initialValues?.scheduledAt ?? "");

  const [price, setPrice] = useState(
    initialValues?.price ?? ""
  );

  const [priority, setPriority] =
    useState<JobPriority>(
      initialValues?.priority ?? "normal"
    );

  const [status, setStatus] =
    useState<JobStatus>(
      initialValues?.status ?? "unscheduled"
    );

  const [notes, setNotes] = useState(
    initialValues?.notes ?? ""
  );

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!customerId || !title.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);

      await onSubmit?.({
        customerId,
        title: title.trim(),
        description: description.trim(),
        address: address.trim(),
        scheduledAt,
        price,
        priority,
        status,
        notes: notes.trim(),
      });

      if (!initialValues) {
        setCustomerId("");
        setTitle("");
        setDescription("");
        setAddress("");
        setScheduledAt("");
        setPrice("");
        setPriority("normal");
        setStatus("unscheduled");
        setNotes("");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="max-w-2xl">
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <Select
          label="Customer"
          value={customerId}
          onChange={(e) =>
            setCustomerId(e.target.value)
          }
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

        <Input
          label="Job Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Garage cleanout"
          required
        />

        <Textarea
          label="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
          rows={4}
        />

        <Input
          label="Job Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
          placeholder="123 Main St, Calgary"
        />

        <Input
          label="Scheduled Date"
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) =>
            setScheduledAt(e.target.value)
          }
        />

        <Input
          label="Price (CAD)"
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          placeholder="250"
        />

        <Select
          label="Priority"
          value={priority}
          onChange={(e) =>
            setPriority(
              e.target.value as JobPriority
            )
          }
        >
          <option value="normal">
            Normal
          </option>
          <option value="high">
            High
          </option>
          <option value="urgent">
            Urgent
          </option>
        </Select>

        <Select
          label="Status"
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value as JobStatus
            )
          }
        >
          <option value="unscheduled">
            Unscheduled
          </option>

          <option value="scheduled">
            Scheduled
          </option>

          <option value="in_progress">
            In Progress
          </option>

          <option value="completed">
            Completed
          </option>

          <option value="cancelled">
            Cancelled
          </option>
        </Select>

        <Textarea
          label="Notes"
          value={notes}
          onChange={(e) =>
            setNotes(e.target.value)
          }
          rows={3}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={
              isSubmitting ||
              !customerId ||
              !title.trim()
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