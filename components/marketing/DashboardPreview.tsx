const navigation = [
  "Overview",
  "Customers",
  "Jobs",
  "Estimates",
  "Invoices",
  "Settings",
];

export default function DashboardPreview() {
  return (
    <section className="relative overflow-hidden border-t border-zinc-900 bg-black px-4 py-20 sm:px-6 lg:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-72 max-w-5xl bg-white/[0.04] blur-[130px]" />

      <div className="relative mx-auto max-w-[1600px]">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">
            Your business, clearly organized
          </p>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            See exactly what your business looks like every morning.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-400">
            Revenue, scheduled work, and important updates brought together in
            one simple dashboard.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-black shadow-2xl shadow-black/60">
          <div className="relative flex h-11 items-center border-b border-zinc-800 bg-zinc-950 px-4">
            <div className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
              <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 rounded-md border border-zinc-700 bg-zinc-900 px-7 py-1 text-[11px] text-zinc-500">
              app.opekon.com
            </div>

            <span className="ml-auto hidden rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.16em] text-zinc-500 sm:inline-flex">
              Product preview
            </span>
          </div>

          <div className="grid min-h-[680px] lg:grid-cols-[210px_1fr]">
            <aside className="hidden border-r border-zinc-800 bg-zinc-950 lg:flex lg:flex-col">
              <div className="border-b border-zinc-800 px-5 py-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-black text-sm font-semibold text-white">
                    O
                  </div>

                  <span className="text-lg font-semibold text-white">
                    Opekon
                  </span>
                </div>
              </div>

              <nav className="flex-1 space-y-1.5 px-3 py-4">
                {navigation.map((item, index) => (
                  <div
                    key={item}
                    className={`rounded-lg px-4 py-3 text-sm font-medium ${
                      index === 0
                        ? "bg-white text-black"
                        : "text-zinc-400"
                    }`}
                  >
                    {item}
                  </div>
                ))}
              </nav>

              <div className="border-t border-zinc-800 p-3">
                <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
                  <p className="text-sm font-semibold text-white">
                    Your business
                  </p>

                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    Business details appear here.
                  </p>
                </div>
              </div>
            </aside>

            <div className="min-w-0 bg-black">
              <header className="flex items-center justify-between border-b border-zinc-800 px-5 py-4 sm:px-7 lg:px-8">
                <div>
                  <p className="text-xs text-zinc-600">Opekon Workspace</p>

                  <p className="mt-1 text-sm font-semibold text-white">
                    Business Dashboard
                  </p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-xs font-semibold text-white">
                  A
                </div>
              </header>

              <main className="p-5 sm:p-7 lg:p-8">
                <div className="mx-auto max-w-6xl">
                  <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-600">
                    Business overview
                  </p>

                  <section className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
                    <p className="text-sm text-zinc-400">Monthly revenue</p>

                    <p className="mt-3 text-5xl font-bold tracking-tight text-white sm:text-6xl">
                      $48,230
                    </p>

                    <p className="mt-3 text-sm text-zinc-500">
                      Revenue this month
                    </p>
                  </section>

                  <section className="mt-5 grid gap-5 md:grid-cols-2">
                    <article className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
                      <p className="text-sm font-semibold text-white">
                        Today&apos;s Work
                      </p>

                      <p className="mt-4 text-4xl font-bold tracking-tight text-white">
                        4
                      </p>

                      <p className="mt-2 text-sm text-zinc-500">
                        Jobs scheduled for today
                      </p>

                      <div className="mt-6 space-y-3">
                        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black p-4">
                          <div>
                            <p className="text-sm font-medium text-white">
                              Roof replacement
                            </p>

                            <p className="mt-1 text-xs text-zinc-500">
                              Example Residence
                            </p>
                          </div>

                          <span className="text-xs text-zinc-400">9:00 AM</span>
                        </div>

                        <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-black p-4">
                          <div>
                            <p className="text-sm font-medium text-white">
                              Driveway resurfacing
                            </p>

                            <p className="mt-1 text-xs text-zinc-500">
                              Example Property
                            </p>
                          </div>

                          <span className="text-xs text-zinc-400">1:30 PM</span>
                        </div>
                      </div>
                    </article>

                    <article className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
                      <p className="text-sm font-semibold text-white">
                        Action Required
                      </p>

                      <p className="mt-4 text-4xl font-bold tracking-tight text-white">
                        3
                      </p>

                      <p className="mt-2 text-sm text-zinc-500">
                        Items that need your attention
                      </p>

                      <div className="mt-6 space-y-3">
                        <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.04] p-4">
                          <p className="text-sm font-medium text-white">
                            Estimates awaiting follow-up
                          </p>

                          <p className="mt-1 text-xs text-zinc-500">
                            Oldest estimate sent 5 days ago
                          </p>
                        </div>

                        <div className="rounded-xl border border-zinc-800 bg-black p-4">
                          <p className="text-sm font-medium text-white">
                            Invoices awaiting payment
                          </p>

                          <p className="mt-1 text-xs text-zinc-500">
                            $12,480 outstanding
                          </p>
                        </div>
                      </div>
                    </article>
                  </section>
                </div>
              </main>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>

        <p className="mt-5 text-center text-xs text-zinc-600">
          Illustrative product preview. Sample data shown for demonstration.
        </p>
      </div>
    </section>
  );
}