"use client";

import { useMemo, useState } from "react";

import {
  Button,
  EmptyState,
  Modal,
  PageHeader,
} from "@/components/ui";

import { createClient } from "@/lib/client";

import CustomerForm, {
  type CustomerFormData,
} from "./CustomerForm";

import CustomerSearch, {
  type CustomerSortOption,
  type CustomerStatusFilter,
} from "./CustomerSearch";

import CustomerStats from "./CustomerStats";

import CustomerTable, {
  type Customer,
} from "./CustomerTable";

type CustomersClientProps = {
  initialCustomers: Customer[];
  businessId: string;
};

type SavedCustomer = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  notes: string | null;
  city: string | null;
  status: string | null;
  created_at: string | null;
};

function normalizeStatus(
  status?: string | null
): "active" | "inactive" {
  return status?.toLowerCase() === "inactive"
    ? "inactive"
    : "active";
}

function mapSavedCustomer(
  savedCustomer: SavedCustomer
): Customer {
  return {
    id: savedCustomer.id,
    name: savedCustomer.name,
    email: savedCustomer.email,
    phone: savedCustomer.phone,
    address: savedCustomer.address,
    notes: savedCustomer.notes,
    city: savedCustomer.city,
    status: normalizeStatus(savedCustomer.status),
    createdAt: savedCustomer.created_at,
  };
}

export default function CustomersClient({
  initialCustomers,
  businessId,
}: CustomersClientProps) {
  const supabase = createClient();

  const [customers, setCustomers] =
    useState<Customer[]>(initialCustomers);

  const [search, setSearch] = useState("");

  const [sort, setSort] =
    useState<CustomerSortOption>("newest");

  const [statusFilter, setStatusFilter] =
    useState<CustomerStatusFilter>("all");

  const [isCreateModalOpen, setIsCreateModalOpen] =
    useState(false);

  const [editingCustomer, setEditingCustomer] =
    useState<Customer | null>(null);

  const [deletingCustomer, setDeletingCustomer] =
    useState<Customer | null>(null);

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  const [isDeleting, setIsDeleting] =
    useState(false);

  const displayedCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filteredCustomers = customers.filter(
      (customer) => {
        const searchableValues = [
          customer.name,
          customer.phone,
          customer.email,
          customer.address,
          customer.notes,
          customer.city,
        ];

        const matchesSearch =
          !query ||
          searchableValues.some((value) =>
            value?.toLowerCase().includes(query)
          );

        const matchesStatus =
          statusFilter === "all" ||
          customer.status === statusFilter;

        return matchesSearch && matchesStatus;
      }
    );

    return [...filteredCustomers].sort((a, b) => {
      const aTime = a.createdAt
        ? new Date(a.createdAt).getTime()
        : 0;

      const bTime = b.createdAt
        ? new Date(b.createdAt).getTime()
        : 0;

      if (sort === "oldest") {
        return aTime - bTime;
      }

      return bTime - aTime;
    });
  }, [
    customers,
    search,
    sort,
    statusFilter,
  ]);

  async function createCustomer(
    customerData: CustomerFormData
  ): Promise<boolean> {
    setErrorMessage(null);

    const {
      data: savedCustomer,
      error,
    } = await supabase
      .from("customers")
      .insert({
        business_id: businessId,
        name: customerData.name,
        email: customerData.email || null,
        phone: customerData.phone || null,
        address: customerData.address || null,
        notes: customerData.notes || null,
        city: customerData.city || null,
        status: customerData.status,
      })
      .select(
        `
          id,
          name,
          email,
          phone,
          address,
          notes,
          city,
          status,
          created_at
        `
      )
      .single();

    if (error || !savedCustomer) {
      console.error(
        "Failed to create customer:",
        error
      );

      setErrorMessage(
        error?.message ??
          "The customer could not be saved."
      );

      return false;
    }

    const newCustomer = mapSavedCustomer(
      savedCustomer as SavedCustomer
    );

    setCustomers((currentCustomers) => [
      newCustomer,
      ...currentCustomers,
    ]);

    setIsCreateModalOpen(false);

    return true;
  }

  async function updateCustomer(
    customerData: CustomerFormData
  ): Promise<boolean> {
    if (!editingCustomer) {
      return false;
    }

    setErrorMessage(null);

    const {
      data: savedCustomer,
      error,
    } = await supabase
      .from("customers")
      .update({
        name: customerData.name,
        email: customerData.email || null,
        phone: customerData.phone || null,
        address: customerData.address || null,
        notes: customerData.notes || null,
        city: customerData.city || null,
        status: customerData.status,
      })
      .eq("id", editingCustomer.id)
      .eq("business_id", businessId)
      .select(
        `
          id,
          name,
          email,
          phone,
          address,
          notes,
          city,
          status,
          created_at
        `
      )
      .single();

    if (error || !savedCustomer) {
      console.error(
        "Failed to update customer:",
        error
      );

      setErrorMessage(
        error?.message ??
          "The customer could not be updated."
      );

      return false;
    }

    const updatedCustomer = mapSavedCustomer(
      savedCustomer as SavedCustomer
    );

    setCustomers((currentCustomers) =>
      currentCustomers.map((customer) =>
        customer.id === updatedCustomer.id
          ? updatedCustomer
          : customer
      )
    );

    setEditingCustomer(null);

    return true;
  }

  async function deleteCustomer() {
    if (!deletingCustomer) {
      return;
    }

    setErrorMessage(null);
    setIsDeleting(true);

    const { error } = await supabase
      .from("customers")
      .delete()
      .eq("id", deletingCustomer.id)
      .eq("business_id", businessId);

    if (error) {
      console.error(
        "Failed to delete customer:",
        error
      );

      setErrorMessage(
        error.message ||
          "The customer could not be deleted."
      );

      setIsDeleting(false);
      return;
    }

    setCustomers((currentCustomers) =>
      currentCustomers.filter(
        (customer) =>
          customer.id !== deletingCustomer.id
      )
    );

    setDeletingCustomer(null);
    setIsDeleting(false);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Customers"
        description="Manage your customer information and contact details."
        actions={
          <Button
            type="button"
            onClick={() => {
              setErrorMessage(null);
              setIsCreateModalOpen(true);
            }}
          >
            New Customer
          </Button>
        }
      />

      <CustomerStats customers={customers} />

      <div className="space-y-3">
        <CustomerSearch
          value={search}
          onChange={setSearch}
          sort={sort}
          onSortChange={setSort}
          status={statusFilter}
          onStatusChange={setStatusFilter}
        />

        <div className="flex justify-end">
          <p className="text-sm text-zinc-400">
            {displayedCustomers.length}{" "}
            {displayedCustomers.length === 1
              ? "customer"
              : "customers"}
          </p>
        </div>
      </div>

      {displayedCustomers.length > 0 ? (
        <CustomerTable
          customers={displayedCustomers}
          onEdit={(customer) => {
            setErrorMessage(null);
            setEditingCustomer(customer);
          }}
          onDelete={(customer) => {
            setErrorMessage(null);
            setDeletingCustomer(customer);
          }}
        />
      ) : (
        <EmptyState
          title={
            search || statusFilter !== "all"
              ? "No customers found"
              : "No customers yet"
          }
          description={
            search || statusFilter !== "all"
              ? "Try changing your search or filters."
              : "Add your first customer to start creating jobs, estimates, and invoices."
          }
          action={
            !search && statusFilter === "all" ? (
              <Button
                type="button"
                onClick={() => {
                  setErrorMessage(null);
                  setIsCreateModalOpen(true);
                }}
              >
                Add Customer
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
        title="New Customer"
      >
        <div className="space-y-4">
          {errorMessage && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {errorMessage}
            </div>
          )}

          <CustomerForm
            onSubmit={createCustomer}
          />
        </div>
      </Modal>

      <Modal
        open={Boolean(editingCustomer)}
        onClose={() => {
          setErrorMessage(null);
          setEditingCustomer(null);
        }}
        title="Edit Customer"
      >
        <div className="space-y-4">
          {errorMessage && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {errorMessage}
            </div>
          )}

          {editingCustomer && (
            <CustomerForm
              submitLabel="Update Customer"
              initialValues={{
                name: editingCustomer.name,
                phone:
                  editingCustomer.phone ?? "",
                email:
                  editingCustomer.email ?? "",
                address:
                  editingCustomer.address ?? "",
                notes:
                  editingCustomer.notes ?? "",
                city:
                  editingCustomer.city ?? "",
                status:
                  editingCustomer.status ??
                  "active",
              }}
              onSubmit={updateCustomer}
            />
          )}
        </div>
      </Modal>

      <Modal
        open={Boolean(deletingCustomer)}
        onClose={() => {
          if (!isDeleting) {
            setErrorMessage(null);
            setDeletingCustomer(null);
          }
        }}
        title="Delete Customer"
      >
        <div className="space-y-5">
          {errorMessage && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {errorMessage}
            </div>
          )}

          <div>
            <p className="text-white">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {deletingCustomer?.name}
              </span>
              ?
            </p>

            <p className="mt-2 text-sm text-zinc-400">
              This action cannot be undone.
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              disabled={isDeleting}
              onClick={() => {
                setErrorMessage(null);
                setDeletingCustomer(null);
              }}
            >
              Cancel
            </Button>

            <Button
              type="button"
              disabled={isDeleting}
              onClick={deleteCustomer}
            >
              {isDeleting
                ? "Deleting..."
                : "Delete Customer"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}