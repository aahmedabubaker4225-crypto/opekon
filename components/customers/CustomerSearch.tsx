"use client";

import { Input, Select } from "@/components/ui";

export type CustomerSortOption =
  | "newest"
  | "oldest";

export type CustomerStatusFilter =
  | "all"
  | "active"
  | "inactive";

type CustomerSearchProps = {
  value: string;
  onChange: (value: string) => void;
  sort: CustomerSortOption;
  onSortChange: (value: CustomerSortOption) => void;
  status: CustomerStatusFilter;
  onStatusChange: (
    value: CustomerStatusFilter
  ) => void;
};

export default function CustomerSearch({
  value,
  onChange,
  sort,
  onSortChange,
  status,
  onStatusChange,
}: CustomerSearchProps) {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-[minmax(260px,1fr)_180px_160px]">
      <Input
        type="search"
        placeholder="Search customers..."
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
      />

      <Select
        value={status}
        onChange={(event) =>
          onStatusChange(
            event.target
              .value as CustomerStatusFilter
          )
        }
      >
        <option value="all">
          All customers
        </option>

        <option value="active">
          Active
        </option>

        <option value="inactive">
          Inactive
        </option>
      </Select>

      <Select
        value={sort}
        onChange={(event) =>
          onSortChange(
            event.target.value as CustomerSortOption
          )
        }
      >
        <option value="newest">
          Newest
        </option>

        <option value="oldest">
          Oldest
        </option>
      </Select>
    </div>
  );
}