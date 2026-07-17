type JobAccent = "blue" | "amber" | "violet" | "emerald";

const stats = [
  {
    label: "Monthly revenue",
    value: "$48,230",
    detail: "+12.4% this month",
    detailClass: "text-emerald-400",
  },
  {
    label: "Jobs this week",
    value: "18",
    detail: "4 scheduled today",
    detailClass: "text-zinc-500",
  },
  {
    label: "Pending quotes",
    value: "7",
    detail: "$34,600 total",
    detailClass: "text-amber-300",
  },
  {
    label: "New leads",
    value: "12",
    detail: "3 need a reply",
    detailClass: "text-blue-300",
  },
];

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
      {
        title: "Garage roof repair",
        customer: "Sarah Thompson",
        value: "$3,200",
      },
      {
        title: "Front steps replacement",
        customer: "David Wilson",
        value: "$4,850",
      },
    ],
  },
  {
    title: "Quote sent",
    count: 4,
    accent: "amber",
    jobs: [
      {
        title: "Driveway resurfacing",
        customer: "Anderson Property",
        value: "$8,450",
      },
      {
        title: "Exterior renovation",
        customer: "Northview Homes",
        value: "$21,600",
      },
    ],
  },
  {
    title: "Scheduled",
    count: 5,
    accent: "violet",
    jobs: [
      {
        title: "Roof replacement",
        customer: "Miller Residence",
        value: "$14,800",
      },
      {
        title: "Concrete patio",
        customer: "James Residence",
        value: "$7,250",
      },
    ],
  },
  {
    title: "Completed",
    count: 6,
    accent: "emerald",
    jobs: [
      {
        title: "Basement development",
        customer: "Wilson Residence",
        value: "$17,250",
      },
      {
        title: "Walkway installation",
        customer: "Clark Property",
        value: "$5,900",
      },
    ],
  },
];

const accentStyles: Record<
  JobAccent,
  {
    column: string;
    title: string;
    dot: string;
    count: string;
    cardStrip: string;
    addButton: string;
  }
> = {
  blue: {
    column: "border-zinc-700 bg-zinc-900/45",
    title: "text-blue-300/90",
    dot: "bg-blue-400/80",
    count: "border-blue-400/20 bg-blue-400/10 text-blue-300/90",
    cardStrip: "bg-blue-400/70",
    addButton:
      "border-blue-400/15 text-blue-300/75 hover:border-blue-400/30 hover:bg-blue-400/[0.05]",
  },
  amber: {
    column: "border-zinc-700 bg-zinc-900/45",
    title: "text-amber-300/90",
    dot: "bg-amber-400/80",
    count: "border-amber-400/20 bg-amber-400/10 text-amber-300/90",
    cardStrip: "bg-amber-400/70",
    addButton:
      "border-amber-400/15 text-amber-300/75 hover:border-amber-400/30 hover:bg-amber-400/[0.05]",
  },
  violet: {
    column: "border-zinc-700 bg-zinc-900/45",
    title: "text-violet-300/90",
    dot: "bg-violet-400/80",
    count:
      "border-violet-400/20 bg-violet-400/10 text-violet-300/90",
    cardStrip: "bg-violet-400/70",
    addButton:
      "border-violet-400/15 text-violet-300/75 hover:border-violet-400/30 hover:bg-violet-400/[0.05]",
  },
  emerald: {
    column: "border-zinc-700 bg-zinc-900/45",
    title: "text-emerald-300/90",
    dot: "bg-emerald-400/80",
    count:
      "border-emerald-400/20 bg-emerald-400/10 text-emerald-300/90",
    cardStrip: "bg-emerald-400/70",
    addButton:
      "border-emerald-400/15 text-emerald-300/75 hover:border-emerald-400/30 hover:bg-emerald-400/[0.05]",
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
            Track revenue, leads, quotes, and every job from one clean
            workspace.
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

          <div className="grid lg:grid-cols-[220px_1fr]">
            <aside className="hidden border-r border-zinc-800 bg-black p-5 lg:block">
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 font-bold text-white">
                  O
                </div>

                <span className="text-lg font-semibold text-white">Opekon</span>
              </div>

              <nav className="space-y-1 text-sm">
                {[
                  "Dashboard",
                  "Jobs",
                  "Customers",
                  "Calendar",
                  "Quotes",
                  "Invoices",
                  "Team",
                  "Analytics",
                ].map((item, index) => (
                  <div
                    key={item}
                    className={`rounded-lg px-3 py-2.5 transition ${
                      index === 0
                        ? "bg-white text-black"
                        : "text-zinc-500 hover:bg-zinc-900 hover:text-white"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </nav>

              <div className="mt-10 border-t border-zinc-900 pt-5 text-sm text-zinc-600">
                Settings
              </div>
            </aside>

            <div className="min-w-0 p-5 sm:p-7 lg:p-8">
              <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm text-zinc-500">Monday, July 15</p>

                  <h3 className="mt-1 text-2xl font-semibold text-white">
                    Good morning, Mike
                  </h3>
                </div>

                <button
                  type="button"
                  className="h-11 rounded-lg bg-white px-5 text-sm font-semibold text-black transition hover:bg-zinc-200"
                >
                  + New job
                </button>
              </header>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-zinc-800 bg-black p-5"
                  >
                    <p className="text-sm text-zinc-500">{stat.label}</p>

                    <p className="mt-3 text-2xl font-semibold text-white">
                      {stat.value}
                    </p>

                    <p className={`mt-2 text-xs ${stat.detailClass}`}>
                      {stat.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-950/80 shadow-xl shadow-black/30">
                <div className="flex flex-col justify-between gap-3 border-b border-zinc-800 px-6 py-5 sm:flex-row sm:items-center">
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      Job board
                    </h4>

                    <p className="mt-1 text-sm text-zinc-400">
                      Move every opportunity from lead to completion
                    </p>
                  </div>

                  <button
                    type="button"
                    className="text-sm font-medium text-zinc-300 transition hover:text-white"
                  >
                    View all jobs
                  </button>
                </div>

                <div className="grid gap-5 overflow-x-auto p-5 md:grid-cols-2 xl:grid-cols-4">
                  {jobColumns.map((column) => {
                    const styles = accentStyles[column.accent];

                    return (
                      <div
                        key={column.title}
                        className={`min-w-[230px] rounded-xl border p-4 shadow-lg shadow-black/20 ${styles.column}`}
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`h-2.5 w-2.5 rounded-full ${styles.dot}`}
                            />

                            <p
                              className={`text-sm font-semibold ${styles.title}`}
                            >
                              {column.title}
                            </p>
                          </div>

                          <span
                            className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${styles.count}`}
                          >
                            {column.count}
                          </span>
                        </div>

                        <div className="space-y-3">
                          {column.jobs.map((job) => (
                            <div
                              key={`${column.title}-${job.title}`}
                              className="relative overflow-hidden rounded-lg border border-zinc-800 bg-black p-4 transition duration-200 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-950"
                            >
                              <div
                                className={`absolute bottom-0 left-0 top-0 w-0.5 ${styles.cardStrip}`}
                              />

                              <p className="text-sm font-medium text-white">
                                {job.title}
                              </p>

                              <p className="mt-1 text-xs text-zinc-500">
                                {job.customer}
                              </p>

                              <div className="mt-5 flex items-center justify-between gap-3">
                                <p className="text-xs text-zinc-600">
                                  Estimated value
                                </p>

                                <p className="text-sm font-semibold text-zinc-200">
                                  {job.value}
                                </p>
                              </div>
                            </div>
                          ))}

                          <button
                            type="button"
                            className={`w-full rounded-lg border border-dashed py-3 text-xs font-medium transition ${styles.addButton}`}
                          >
                            + Add job
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}