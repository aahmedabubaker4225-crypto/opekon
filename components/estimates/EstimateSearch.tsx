"use client";

import { Input } from "@/components/ui";

type EstimateSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function EstimateSearch({
  value,
  onChange,
}: EstimateSearchProps) {
  return (
    <Input
      type="search"
      placeholder="Search estimates..."
      value={value}
      onChange={(event) =>
        onChange(event.target.value)
      }
    />
  );
}