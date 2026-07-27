export default function FooterCTA() {
  return (
    <section className="border-t border-zinc-900 bg-black px-6 py-24 text-white sm:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-zinc-500">
          Be first
        </p>

        <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
          Run your business without the clutter.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-zinc-400">
          Join the Opekon waitlist and get notified when early access opens.
        </p>

        <form
          action="https://tally.so/r/QKWJGI"
          method="get"
          className="mx-auto mt-10 flex max-w-xl flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            aria-label="Email address"
            className="h-14 flex-1 rounded-xl border border-zinc-800 bg-zinc-950 px-5 text-white outline-none placeholder:text-zinc-600 focus:border-zinc-500"
          />

          <button
            type="submit"
            className="h-14 rounded-xl bg-white px-8 font-semibold text-black transition hover:bg-zinc-200"
          >
            Join Waitlist
          </button>
        </form>
      </div>
    </section>
  );
}