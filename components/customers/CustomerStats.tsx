import { StatCard } from "@/components/ui";
import type { Customer } from "./CustomerTable";

type CustomerStatsProps = {
  customers: Customer[];
};

export default function CustomerStats({
  customers,
}: CustomerStatsProps) {
  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status !== "inactive"
  ).length;

  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "inactive"
  ).length;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      <StatCard
        label="Total Customers"
        value={totalCustomers}
      />

      <StatCard
        label="Active Customers"
        value={activeCustomers}
      />

      <StatCard
        label="Inactive Customers"
        value={inactiveCustomers}
      />
    </div>
  );
}