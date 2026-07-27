"use client";

import { useState } from "react";
import { createClient } from "@/lib/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950 p-8">

        <h1 className="text-3xl font-bold text-white">
          Welcome back
        </h1>

        <p className="mt-2 text-neutral-400">
          Log in to your Opekon account.
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-white outline-none focus:border-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-white outline-none focus:border-white"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-400">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-white hover:underline"
          >
            Sign up
          </a>
        </p>

      </div>
    </main>
  );
}