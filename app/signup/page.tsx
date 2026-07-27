"use client";

import { useState } from "react";
import { createClient } from "@/lib/client";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setSuccess(
      "Account created! Check your email to verify your account."
    );

    setTimeout(() => {
      router.push("/login");
    }, 3000);
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-950 p-8">

        <h1 className="text-3xl font-bold text-white">
          Create your account
        </h1>

        <p className="mt-2 text-neutral-400">
          Start using Opekon today.
        </p>

        <form
          onSubmit={handleSignup}
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

          <div>
            <label className="mb-2 block text-sm text-neutral-300">
              Confirm Password
            </label>

            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-white outline-none focus:border-white"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          {success && (
            <p className="text-sm text-green-500">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-white hover:underline"
          >
            Log in
          </a>
        </p>

      </div>
    </main>
  );
}