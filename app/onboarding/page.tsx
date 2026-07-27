"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/client";

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();

  const [businessName, setBusinessName] = useState("");
  const [trade, setTrade] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError("You must be signed in to continue.");
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase.from("businesses").insert({
      owner_id: user.id,
      business_name: businessName,
      trade,
      phone: phone || null,
      city: city || null,
    });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 py-12 text-white">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#0B0B0B] p-8 sm:p-10">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          Get started
        </p>

        <h1 className="mt-3 text-3xl font-bold">
          Tell us about your business
        </h1>

        <p className="mt-3 text-zinc-400">
          This information will be used to set up your Opekon workspace.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="businessName"
              className="mb-2 block text-sm font-medium"
            >
              Business name
            </label>

            <input
              id="businessName"
              type="text"
              value={businessName}
              onChange={(event) => setBusinessName(event.target.value)}
              required
              placeholder="Ahmed Contracting"
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none transition placeholder:text-zinc-600 focus:border-white/30"
            />
          </div>

          <div>
            <label htmlFor="trade" className="mb-2 block text-sm font-medium">
              Trade
            </label>

            <select
              id="trade"
              value={trade}
              onChange={(event) => setTrade(event.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none transition focus:border-white/30"
            >
              <option value="">Select your trade</option>
              <option value="General Contractor">General Contractor</option>
              <option value="Roofing">Roofing</option>
              <option value="Concrete">Concrete</option>
              <option value="Landscaping">Landscaping</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="HVAC">HVAC</option>
              <option value="Painting">Painting</option>
              <option value="Junk Removal">Junk Removal</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium">
              Phone number
            </label>

            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="403-555-0123"
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none transition placeholder:text-zinc-600 focus:border-white/30"
            />
          </div>

          <div>
            <label htmlFor="city" className="mb-2 block text-sm font-medium">
              City
            </label>

            <input
              id="city"
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="Calgary"
              className="w-full rounded-xl border border-white/10 bg-black px-4 py-3 outline-none transition placeholder:text-zinc-600 focus:border-white/30"
            />
          </div>

          {error && (
            <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating workspace..." : "Continue to dashboard"}
          </button>
        </form>
      </div>
    </main>
  );
}