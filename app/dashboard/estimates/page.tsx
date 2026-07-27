import EstimateClient from "@/components/estimates/EstimateClient";

import type { Estimate } from "@/components/estimates/EstimateTable";

export default function EstimatesPage() {
  const customers = [
    {
      id: "customer-1",
      name: "John Smith",
    },
    {
      id: "customer-2",
      name: "Sarah Johnson",
    },
  ];

  const jobs = [
    {
      id: "job-1",
      customerId: "customer-1",
      title: "Garage Cleanout",
    },
    {
      id: "job-2",
      customerId: "customer-2",
      title: "Basement Cleanup",
    },
  ];

  const estimates: Estimate[] = [
    {
      id: "estimate-1",
      customerId: "customer-1",
      customerName: "John Smith",
      jobId: "job-1",
      jobTitle: "Garage Cleanout",
      estimateNumber: "EST-1001",
      subtotal: 450,
      tax: 22.5,
      total: 472.5,
      status: "sent",
      createdAt: "2026-07-22T10:00:00.000Z",
    },
    {
      id: "estimate-2",
      customerId: "customer-2",
      customerName: "Sarah Johnson",
      jobId: "job-2",
      jobTitle: "Basement Cleanup",
      estimateNumber: "EST-1002",
      subtotal: 800,
      tax: 40,
      total: 840,
      status: "accepted",
      createdAt: "2026-07-21T10:00:00.000Z",
    },
  ];

  return (
    <EstimateClient
      initialEstimates={estimates}
      customers={customers}
      jobs={jobs}
    />
  );
}