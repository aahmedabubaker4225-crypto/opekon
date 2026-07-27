"use client";

import { useMemo, useState } from "react";

import {
  Button,
  EmptyState,
  Modal,
  PageHeader,
} from "@/components/ui";

import { createClient } from "@/lib/client";

import JobForm, {
  type JobFormData,
} from "./JobForm";

import JobSearch from "./JobSearch";
import JobStats from "./JobStats";

import JobTable, {
  type Job,
  type JobPriority,
  type JobStatus,
} from "./JobTable";

type CustomerOption = {
  id: string;
  name: string;
};

type JobClientProps = {
  initialJobs: Job[];
  customers: CustomerOption[];
  businessId: string;
};

type SavedJob = {
  id: string;
  customer_id: string | null;
  title: string;
  description: string | null;
  status: string | null;
  priority: string | null;
  scheduled_at: string | null;
  address: string | null;
  price: number | null;
  notes: string | null;
  created_at: string | null;
};

type JobStatusFilter = "all" | JobStatus;

function normalizeStatus(
  status?: string | null
): JobStatus {
  switch (status) {
    case "scheduled":
      return "scheduled";

    case "in_progress":
      return "in_progress";

    case "completed":
      return "completed";

    case "cancelled":
      return "cancelled";

    default:
      return "unscheduled";
  }
}

function normalizePriority(
  priority?: string | null
): JobPriority {
  switch (priority) {
    case "high":
      return "high";

    case "urgent":
      return "urgent";

    default:
      return "normal";
  }
}

function getCustomerName(
  customerId: string | null,
  customers: CustomerOption[]
) {
  if (!customerId) {
    return "Unknown Customer";
  }

  return (
    customers.find(
      (customer) => customer.id === customerId
    )?.name ?? "Unknown Customer"
  );
}

function mapSavedJob(
  savedJob: SavedJob,
  customers: CustomerOption[]
): Job {
  return {
    id: savedJob.id,

    customerId:
      savedJob.customer_id ?? "",

    customerName: getCustomerName(
      savedJob.customer_id,
      customers
    ),

    title: savedJob.title,

    description:
      savedJob.description ?? null,

    address:
      savedJob.address ?? null,

    scheduledAt:
      savedJob.scheduled_at ?? null,

    price:
      savedJob.price ?? null,

    priority: normalizePriority(
      savedJob.priority
    ),

    status: normalizeStatus(
      savedJob.status
    ),

    notes:
      savedJob.notes ?? null,

    createdAt:
      savedJob.created_at ?? null,
  };
}

function toDatabaseDate(
  value: string
): string | null {
  if (!value) {
    return null;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

function toFormDate(
  value?: string | null
): string {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offset =
    date.getTimezoneOffset() * 60_000;

  return new Date(
    date.getTime() - offset
  )
    .toISOString()
    .slice(0, 16);
}

function toDatabasePrice(
  value: string
): number | null {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  const parsedPrice = Number(trimmedValue);

  if (
    Number.isNaN(parsedPrice) ||
    parsedPrice < 0
  ) {
    return null;
  }

  return parsedPrice;
}

export default function JobClient({
  initialJobs,
  customers,
  businessId,
}: JobClientProps) {
  const supabase = createClient();

  const [jobs, setJobs] =
    useState<Job[]>(initialJobs);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<JobStatusFilter>("all");

  const [
    isCreateModalOpen,
    setIsCreateModalOpen,
  ] = useState(false);

  const [editingJob, setEditingJob] =
    useState<Job | null>(null);

  const [deletingJob, setDeletingJob] =
    useState<Job | null>(null);

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const [isDeleting, setIsDeleting] =
    useState(false);

  const displayedJobs = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return jobs.filter((job) => {
      const searchableValues = [
        job.title,
        job.description,
        job.customerName,
        job.address,
        job.status,
        job.priority,
        job.notes,
      ];

      const matchesSearch =
        !query ||
        searchableValues.some((value) =>
          value
            ?.toLowerCase()
            .includes(query)
        );

      const matchesStatus =
        statusFilter === "all" ||
        job.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    jobs,
    search,
    statusFilter,
  ]);

  async function createJob(
    jobData: JobFormData
  ): Promise<void> {
    setErrorMessage(null);

    const {
      data: savedJob,
      error,
    } = await supabase
      .from("jobs")
      .insert({
        business_id: businessId,

        customer_id:
          jobData.customerId,

        title:
          jobData.title,

        description:
          jobData.description || null,

        address:
          jobData.address || null,

        scheduled_at:
          toDatabaseDate(
            jobData.scheduledAt
          ),

        price:
          toDatabasePrice(
            jobData.price
          ),

        priority:
          jobData.priority,

        status:
          jobData.status,

        notes:
          jobData.notes || null,
      })
      .select(
        `
          id,
          customer_id,
          title,
          description,
          status,
          priority,
          scheduled_at,
          address,
          price,
          notes,
          created_at
        `
      )
      .single();

    if (error || !savedJob) {
      console.error(
        "Failed to create job:",
        error
      );

      setErrorMessage(
        error?.message ??
          "The job could not be saved."
      );

      return;
    }

    const newJob = mapSavedJob(
      savedJob as SavedJob,
      customers
    );

    setJobs((currentJobs) => [
      newJob,
      ...currentJobs,
    ]);

    setIsCreateModalOpen(false);

    return;
  }

  async function updateJob(
    jobData: JobFormData
  ): Promise<void> {
    if (!editingJob) {
      return;
    }

    setErrorMessage(null);

    const {
      data: savedJob,
      error,
    } = await supabase
      .from("jobs")
      .update({
        customer_id:
          jobData.customerId,

        title:
          jobData.title,

        description:
          jobData.description || null,

        address:
          jobData.address || null,

        scheduled_at:
          toDatabaseDate(
            jobData.scheduledAt
          ),

        price:
          toDatabasePrice(
            jobData.price
          ),

        priority:
          jobData.priority,

        status:
          jobData.status,

        notes:
          jobData.notes || null,
      })
      .eq("id", editingJob.id)
      .eq(
        "business_id",
        businessId
      )
      .select(
        `
          id,
          customer_id,
          title,
          description,
          status,
          priority,
          scheduled_at,
          address,
          price,
          notes,
          created_at
        `
      )
      .single();

    if (error || !savedJob) {
      console.error(
        "Failed to update job:",
        error
      );

      setErrorMessage(
        error?.message ??
          "The job could not be updated."
      );

      return;
    }

    const updatedJob = mapSavedJob(
      savedJob as SavedJob,
      customers
    );

    setJobs((currentJobs) =>
      currentJobs.map((job) =>
        job.id === updatedJob.id
          ? updatedJob
          : job
      )
    );

    setEditingJob(null);

    return;
  }

  async function deleteJob() {
    if (!deletingJob) {
      return;
    }

    setErrorMessage(null);
    setIsDeleting(true);

    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", deletingJob.id)
      .eq(
        "business_id",
        businessId
      );

    if (error) {
      console.error(
        "Failed to delete job:",
        error
      );

      setErrorMessage(
        error.message ||
          "The job could not be deleted."
      );

      setIsDeleting(false);
      return;
    }

    setJobs((currentJobs) =>
      currentJobs.filter(
        (job) =>
          job.id !== deletingJob.id
      )
    );

    setDeletingJob(null);
    setIsDeleting(false);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Jobs"
        description="Manage scheduled work, active jobs, and completed projects."
        actions={
          <Button
            type="button"
            disabled={
              customers.length === 0
            }
            onClick={() => {
              setErrorMessage(null);
              setIsCreateModalOpen(
                true
              );
            }}
          >
            New Job
          </Button>
        }
      />

      <JobStats jobs={jobs} />

      <div className="space-y-3">
        <JobSearch
          search={search}
          status={statusFilter}
          onSearchChange={setSearch}
          onStatusChange={
            setStatusFilter
          }
        />

        <div className="flex justify-end">
          <p className="text-sm text-zinc-400">
            {displayedJobs.length}{" "}
            {displayedJobs.length === 1
              ? "job"
              : "jobs"}
          </p>
        </div>
      </div>

      {customers.length === 0 ? (
        <EmptyState
          title="Add a customer first"
          description="Every job must belong to a customer. Create a customer before adding your first job."
        />
      ) : displayedJobs.length > 0 ? (
        <JobTable
          jobs={displayedJobs}
          onEdit={(job) => {
            setErrorMessage(null);
            setEditingJob(job);
          }}
          onDelete={(job) => {
            setErrorMessage(null);
            setDeletingJob(job);
          }}
        />
      ) : (
        <EmptyState
          title={
            search ||
            statusFilter !== "all"
              ? "No jobs found"
              : "No jobs yet"
          }
          description={
            search ||
            statusFilter !== "all"
              ? "Try changing your search or status filter."
              : "Create your first job to start tracking work."
          }
          action={
            !search &&
            statusFilter === "all" ? (
              <Button
                type="button"
                onClick={() => {
                  setErrorMessage(null);
                  setIsCreateModalOpen(
                    true
                  );
                }}
              >
                Add Job
              </Button>
            ) : undefined
          }
        />
      )}

      <Modal
        open={isCreateModalOpen}
        onClose={() => {
          setErrorMessage(null);
          setIsCreateModalOpen(false);
        }}
        title="New Job"
      >
        <div className="space-y-4">
          {errorMessage && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {errorMessage}
            </div>
          )}

          <JobForm
            customers={customers}
            onSubmit={createJob}
          />
        </div>
      </Modal>

      <Modal
        open={Boolean(editingJob)}
        onClose={() => {
          setErrorMessage(null);
          setEditingJob(null);
        }}
        title="Edit Job"
      >
        <div className="space-y-4">
          {errorMessage && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {errorMessage}
            </div>
          )}

          {editingJob && (
            <JobForm
              customers={customers}
              submitLabel="Update Job"
              initialValues={{
                customerId:
                  editingJob.customerId,

                title:
                  editingJob.title,

                description:
                  editingJob.description ??
                  "",

                address:
                  editingJob.address ?? "",

                scheduledAt:
                  toFormDate(
                    editingJob.scheduledAt
                  ),

                price:
                  editingJob.price != null
                    ? String(
                        editingJob.price
                      )
                    : "",

                priority:
                  editingJob.priority,

                status:
                  editingJob.status,

                notes:
                  editingJob.notes ?? "",
              }}
              onSubmit={updateJob}
            />
          )}
        </div>
      </Modal>

      <Modal
        open={Boolean(deletingJob)}
        onClose={() => {
          if (!isDeleting) {
            setErrorMessage(null);
            setDeletingJob(null);
          }
        }}
        title="Delete Job"
      >
        <div className="space-y-5">
          {errorMessage && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {errorMessage}
            </div>
          )}

          <div>
            <p className="text-white">
              Are you sure you want to
              delete{" "}
              <span className="font-semibold">
                {deletingJob?.title}
              </span>
              ?
            </p>

            <p className="mt-2 text-sm text-zinc-400">
              This action cannot be
              undone.
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              disabled={isDeleting}
              onClick={() => {
                setErrorMessage(null);
                setDeletingJob(null);
              }}
            >
              Cancel
            </Button>

            <Button
              type="button"
              disabled={isDeleting}
              onClick={deleteJob}
            >
              {isDeleting
                ? "Deleting..."
                : "Delete Job"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}