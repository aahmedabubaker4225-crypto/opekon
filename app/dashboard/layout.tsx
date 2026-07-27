import type { ReactNode } from "react";
import Link from "next/link";
import DashboardNav from "@/components/dashboard/DashboardNav";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <aside className="fixed inset-y-0 left-0 hidden w-60 border-r border-white/10 bg-[#080808] lg:flex lg:flex-col">
        <div className="flex h-20 items-center border-b border-white/10 px-6">
          <Link
            href="/dashboard"
            className="text-2xl font-bold tracking-tight"
          >
            Opekon
          </Link>
        </div>

        <DashboardNav />

        <div className="mt-auto border-t border-white/10 p-4">
          <div className="rounded-xl bg-white/5 p-4">
            <p className="text-sm font-semibold">
              Your business
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              Business details will appear here.
            </p>
          </div>
        </div>
      </aside>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-black/90 px-5 backdrop-blur-md sm:px-8">
          <div>
            <p className="text-sm text-zinc-500">
              Opekon Workspace
            </p>

            <p className="font-semibold text-white">
              Business Dashboard
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-semibold">
            A
          </div>
        </header>

        <main className="w-full overflow-x-auto">
          <div className="mx-auto w-full max-w-[1800px] px-5 py-8 sm:px-8 lg:px-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}