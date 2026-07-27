"use client";

import { Input } from "@/components/ui";

type InvoiceSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function InvoiceSearch({
  value,
  onChange,
}: InvoiceSearchProps) {
  return (
    <Input
      type="search"
      placeholder="Search invoices..."
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
    />
  );
}