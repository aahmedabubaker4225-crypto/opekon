"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
  },
  {
    name: "Customers",
    href: "/dashboard/customers",
  },
  {
    name: "Jobs",
    href: "/dashboard/jobs",
  },
  {
    name: "Estimates",
    href: "/dashboard/estimates",
  },
  {
    name: "Invoices",
    href: "/dashboard/invoices",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
  },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-2 px-4 py-6">
      {navigation.map((item) => {
        const isActive =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-white text-black"
                : "text-zinc-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}