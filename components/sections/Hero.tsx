"use client";

import { FormEvent, useState } from "react";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Something went wrong. Please try again.");
        return;
      }

      setIsSuccess(true);
      setMessage("You're on the waitlist!");
      setEmail("");
    } catch {
      setMessage("Unable to connect. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="waitlist"
      className="flex min-h-screen items-center bg-black px-6 pb-20 pt-32 text-white"
    >
      <div className="mx-auto w-full max-w-5xl text-center">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-zinc-500 sm:text-sm">
          The operating system for contractors
        </p>

        <h1 className="mx-auto max-w-5xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
          Stop juggling 10 tools.
          <span className="block text-zinc-400">
            Run your business from one platform.
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-zinc-400">
          Manage leads, jobs, scheduling, customers, quotes, invoices, and your
          team—all from one place.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            disabled={isSubmitting}
            placeholder="Enter your email"
            aria-label="Email address"
            className="h-14 flex-1 rounded-xl border border-zinc-800 bg-zinc-950 px-5 text-base text-white outline-none transition placeholder:text-zinc-600 focus:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-60"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="h-14 rounded-xl bg-white px-8 font-semibold text-black transition duration-200 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Joining..." : "Join Waitlist"}
          </button>
        </form>

        {message ? (
          <p
            className={`mt-5 text-sm ${
              isSuccess ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        ) : (
          <p className="mt-5 text-sm text-zinc-500">
            Launching soon. Join the waitlist.
          </p>
        )}
      </div>
    </section>
  );
}