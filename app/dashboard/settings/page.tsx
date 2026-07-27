export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <div className="mx-auto max-w-7xl">

        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
            Settings
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Business Settings
          </h1>

          <p className="mt-3 text-zinc-400">
            Manage your business information, account settings, and preferences.
          </p>
        </div>

        <div className="space-y-6">

          <div className="rounded-2xl border border-white/10 bg-[#0B0B0B] p-8">
            <h2 className="text-2xl font-semibold">
              Business Information
            </h2>

            <p className="mt-2 text-zinc-400">
              Update your company name, phone number, address, and trade.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0B0B0B] p-8">
            <h2 className="text-2xl font-semibold">
              Account
            </h2>

            <p className="mt-2 text-zinc-400">
              Manage your email, password, and authentication settings.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0B0B0B] p-8">
            <h2 className="text-2xl font-semibold">
              Preferences
            </h2>

            <p className="mt-2 text-zinc-400">
              Configure taxes, currency, notifications, and future integrations.
            </p>
          </div>

          <button className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700">
            Log Out
          </button>

        </div>

      </div>
    </main>
  );
}