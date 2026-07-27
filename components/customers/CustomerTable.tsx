import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

import CustomerRow from "./CustomerRow";

export type CustomerStatus =
  | "active"
  | "inactive";

export type Customer = {
  id: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  notes?: string | null;
  city?: string | null;
  status?: CustomerStatus;
  createdAt?: string | null;
};

type CustomerTableProps = {
  customers: Customer[];
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
};

export default function CustomerTable({
  customers,
  onEdit,
  onDelete,
}: CustomerTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <Table className="min-w-[850px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[190px]">
              Customer
            </TableHead>

            <TableHead className="w-[280px]">
              Address
            </TableHead>

            <TableHead className="w-[300px]">
              Contact
            </TableHead>

            <TableHead className="w-[130px]">
              Status
            </TableHead>

            <TableHead className="w-[80px] text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {customers.map((customer) => (
            <CustomerRow
              key={customer.id}
              customer={customer}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}