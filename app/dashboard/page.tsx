import { redirect } from "next/navigation";
import { createClient } from "@/lib/server";
import {
  Card,
  EmptyState,
  PageHeader,
  StatCard,
} from "@/components/ui";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: businesses, error } = await supabase
    .from("businesses")
    .select("business_name, trade, city")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    throw new Error("Unable to load your business.");
  }

  const business = businesses?.[0];

  if (!business) {
    redirect("/onboarding");
  }

  return (
    <main className="min-h-screen bg-black p-6 text-white sm:p-10">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          eyebrow="Overview"
          title="Welcome back"
          description="Here’s what’s happening with your business."
        />

        <Card className="mb-8 p-8">
          <p className="text-sm text-zinc-500">Your workspace</p>

          <h2 className="mt-2 text-2xl font-semibold">
            {business.business_name}
          </h2>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-zinc-400">
            <span>{business.trade}</span>

            {business.city && <span>{business.city}</span>}
          </div>
        </Card>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label="Monthly Revenue"
            value="$0"
            description="Revenue this month"
          />

          <StatCard
            label="Jobs Today"
            value={0}
            description="Scheduled for today"
          />

          <StatCard
            label="Customers"
            value={0}
            description="Total customers"
          />

          <StatCard
            label="Outstanding Invoices"
            value="$0"
            description="Awaiting payment"
          />
        </section>

        <section className="mt-8 grid gap-5 xl:grid-cols-2">
          <Card>
            <h2 className="text-xl font-semibold">Today&apos;s Jobs</h2>

            <p className="mt-2 text-sm text-zinc-400">
              Your scheduled jobs will appear here.
            </p>

            <div className="mt-6">
              <EmptyState
                title="No jobs scheduled"
                description="Your jobs for today will appear here once they are created."
              />
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold">Needs Attention</h2>

            <p className="mt-2 text-sm text-zinc-400">
              Important business updates will appear here.
            </p>

            <div className="mt-6">
              <EmptyState
                title="Nothing needs your attention"
                description="Overdue invoices, pending estimates, and important updates will appear here."
              />
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}