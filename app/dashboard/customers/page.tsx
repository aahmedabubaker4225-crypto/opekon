import CustomersClient from "@/components/customers/CustomersClient";
import type { Customer } from "@/components/customers/CustomerTable";
import { createClient } from "@/lib/server";

export default async function CustomersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: business, error: businessError } =
    await supabase
      .from("businesses")
      .select("id")
      .eq("owner_id", user.id)
      .single();

  if (businessError || !business) {
    return (
      <div className="p-8 text-white">
        Your business could not be found.
      </div>
    );
  }

  const {
    data: customerRows,
    error: customersError,
  } = await supabase
    .from("customers")
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
    .eq("business_id", business.id)
    .order("created_at", {
      ascending: false,
    });

  if (customersError) {
    console.error(
      "Failed to load customers:",
      customersError
    );

    return (
      <div className="p-8 text-white">
        Customers could not be loaded.
      </div>
    );
  }

  const customers: Customer[] = (
    customerRows ?? []
  ).map((customer) => ({
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
    notes: customer.notes,
    city: customer.city,
    status:
      customer.status?.toLowerCase() ===
      "inactive"
        ? "inactive"
        : "active",
    createdAt: customer.created_at,
  }));

  return (
    <CustomersClient
      initialCustomers={customers}
      businessId={business.id}
    />
  );
}