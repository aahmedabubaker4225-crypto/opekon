type JobAccent = "blue" | "amber" | "violet" | "emerald";

const jobColumns: {
  title: string;
  count: number;
  accent: JobAccent;
  jobs: {
    title: string;
    customer: string;
    value: string;
  }[];
}[] = [
  {
    title: "New leads",
    count: 3,
    accent: "blue",
    jobs: [
      { title: "Garage roof repair", customer: "Sarah Thompson", value: "$3,200" },
      { title: "Front steps replacement", customer: "David Wilson", value: "$4,850" },
    ],
  },
  {
    title: "Quote sent",
    count: 4,
    accent: "amber",
    jobs: [
      { title: "Driveway resurfacing", customer: "Anderson Property", value: "$8,450" },
      { title: "Exterior renovation", customer: "Northview Homes", value: "$21,600" },
    ],
  },
  {
    title: "Scheduled",
    count: 5,
    accent: "violet",
    jobs: [
      { title: "Roof replacement", customer: "Miller Residence", value: "$14,800" },
      { title: "Concrete patio", customer: "James Residence", value: "$7,250" },
    ],
  },
  {
    title: "Completed",
    count: 6,
    accent: "emerald",
    jobs: [
      { title: "Basement development", customer: "Wilson Residence", value: "$17,250" },
      { title: "Walkway installation", customer: "Clark Property", value: "$5,900" },
    ],
  },
];

const accentStyles: Record<
  JobAccent,
  { column: string; title: string; dot: string; count: string; cardStrip: string }
> = {
  blue: {
    column: "border-blue-400/15 bg-blue-400/[0.025]",
    title: "text-blue-300",
    dot: "bg-blue-400",
    count: "border-blue-400/20 bg-blue-400/10 text-blue-300",
    cardStrip: "bg-blue-400",
  },
  amber: {
    column: "border-amber-400/15 bg-amber-400/[0.025]",
    title: "text-amber-300",
    dot: "bg-amber-400",
    count: "border-amber-400/20 bg-amber-400/10 text-amber-300",
    cardStrip: "bg-amber-400",
  },
  violet: {
    column: "border-violet-400/15 bg-violet-400/[0.025]",
    title: "text-violet-300",
    dot: "bg-violet-400",
    count: "border-violet-400/20 bg-violet-400/10 text-violet-300",
    cardStrip: "bg-violet-400",
  },
  emerald: {
    column: "border-emerald-400/15 bg-emerald-400/[0.025]",
    title: "text-emerald-300",
    dot: "bg-emerald-400",
    count: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    cardStrip: "bg-emerald-400",
  },
};

export default function DashboardPreview() {
  return (
    <section className="relative border-t border-zinc-900 bg-black px-4 py-24 sm:px-6 lg:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-72 max-w-4xl bg-white/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">
            Everything under control
          </p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            See your entire business at a glance.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
            Know how your business is doing, what needs you today, and where every job stands.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black">
          <div className="flex h-12 items-center border-b border-zinc-800 px-4">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-zinc-700" />
              <span className="h-3 w-3 rounded-full bg-zinc-700" />
              <span className="h-3 w-3 rounded-full bg-zinc-700" />
            </div>
            <div className="mx-auto rounded-md border border-zinc-800 bg-black px-8 py-1.5 text-xs text-zinc-600">
              app.opekon.com
            </div>
            <div className="w-14" />
          </div>

          <div className="grid lg:grid-cols-[190px_1fr]">
            <aside className="hidden border-r border-zinc-800 bg-black p-5 lg:block">
              <div className="mb-9 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 font-bold text-white">O</div>
                <span className="text-lg font-semibold text-white">Opekon</span>
              </div>

              <nav className="space-y-2 text-sm">
                <div className="rounded-lg bg-white px-3 py-2.5 font-medium text-black">Dashboard</div>
                {['Jobs', 'Customers'].map((item) => (
                  <div key={item} className="rounded-lg px-3 py-2.5 text-zinc-600">{item}</div>
                ))}
                <div className="px-3 py-2 text-zinc-800">•••</div>
              </nav>

              <div className="mt-10 border-t border-zinc-900 pt-5 text-sm text-zinc-700">Settings</div>
            </aside>

            <main className="min-w-0 p-5 sm:p-7 lg:p-8">
              <section aria-labelledby="business-heading" className="rounded-2xl border border-zinc-800 bg-black">
                <div className="border-b border-zinc-800 px-6 py-5 sm:px-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Section 01</p>
                  <h3 id="business-heading" className="mt-2 text-xl font-semibold text-white">Your business</h3>
                </div>
                <div className="px-6 py-8 sm:px-8 sm:py-10">
                  <p className="text-sm font-medium text-zinc-400">Monthly revenue</p>
                  <p className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">$48,230</p>
                  <p className="mt-3 text-sm font-medium text-emerald-400">↑ 12.4% this month</p>
                </div>
              </section>

              <section aria-labelledby="today-heading" className="mt-6 rounded-2xl border border-zinc-800 bg-black">
                <div className="border-b border-zinc-800 px-6 py-5 sm:px-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Section 02</p>
                  <h3 id="today-heading" className="mt-2 text-xl font-semibold text-white">Today</h3>
                </div>

                <div className="grid divide-y divide-zinc-800 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                  <div className="px-6 py-8 sm:px-8">
                    <p className="text-sm font-medium text-zinc-400">Jobs today</p>
                    <p className="mt-3 text-4xl font-bold tracking-tight text-white">4</p>
                    <p className="mt-2 text-sm text-zinc-600">Scheduled</p>
                  </div>

                  <div className="relative overflow-hidden px-6 py-8 sm:px-8">
                    <div className="absolute inset-y-0 left-0 w-1 bg-amber-400" />
                    <p className="text-sm font-medium text-amber-300">Needs attention</p>
                    <p className="mt-3 text-4xl font-bold tracking-tight text-white">3</p>
                    <p className="mt-2 text-sm text-zinc-400">Leads waiting for a reply</p>
                  </div>
                </div>
              </section>

              <section aria-labelledby="jobs-heading" className="mt-6 overflow-hidden rounded-2xl border border-zinc-800 bg-black">
                <div className="border-b border-zinc-800 px-6 py-5 sm:px-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Section 03</p>
                  <h3 id="jobs-heading" className="mt-2 text-xl font-semibold text-white">Job board</h3>
                </div>

                <div className="grid gap-4 overflow-x-auto p-5 md:grid-cols-2 xl:grid-cols-4">
                  {jobColumns.map((column) => {
                    const styles = accentStyles[column.accent];
                    return (
                      <div key={column.title} className={`min-w-[225px] rounded-xl border p-4 ${styles.column}`}>
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className={`h-2.5 w-2.5 rounded-full ${styles.dot}`} />
                            <p className={`text-sm font-semibold ${styles.title}`}>{column.title}</p>
                          </div>
                          <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${styles.count}`}>{column.count}</span>
                        </div>

                        <div className="space-y-3">
                          {column.jobs.map((job) => (
                            <article key={`${column.title}-${job.title}`} className="relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                              <div className={`absolute inset-y-0 left-0 w-0.5 ${styles.cardStrip}`} />
                              <p className="text-sm font-medium text-white">{job.title}</p>
                              <p className="mt-1 text-xs text-zinc-500">{job.customer}</p>
                              <div className="mt-5 flex items-end justify-between gap-3">
                                <p className="text-xs text-zinc-600">Value</p>
                                <p className="text-sm font-semibold text-zinc-200">{job.value}</p>
                              </div>
                            </article>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}
