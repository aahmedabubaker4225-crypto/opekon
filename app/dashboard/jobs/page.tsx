import JobClient from "@/components/jobs/JobClient";
import type { Job } from "@/components/jobs/JobTable";

import { createClient } from "@/lib/server";

export default async function JobsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: business } = await supabase
    .from("businesses")
    .select("id")
    .eq("owner_id", user.id)
    .single();

  if (!business) {
    return null;
  }

  const { data: customers = [] } = await supabase
    .from("customers")
    .select("id, name")
    .eq("business_id", business.id)
    .order("name");

  const { data: jobs = [] } = await supabase
    .from("jobs")
    .select(
      `
      *,
      customers (
        name
      )
    `
    )
    .eq("business_id", business.id)
    .order("created_at", {
      ascending: false,
    });

  const mappedJobs: Job[] = (jobs ?? []).map((job) => ({
    id: job.id,

    customerId: job.customer_id ?? "",

    customerName:
      job.customers?.name ?? "Unknown Customer",

    title: job.title,

    description: job.description,

    address: job.address,

    scheduledAt: job.scheduled_at,

    price: job.price,

    priority: job.priority,

    status: job.status,

    notes: job.notes,

    createdAt: job.created_at,
  }));

  return (
    <JobClient
      initialJobs={mappedJobs}
      customers={customers ?? []}
      businessId={business.id}
    />
  );
}