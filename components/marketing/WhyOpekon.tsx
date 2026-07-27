export default function Hero() {
  return (
    <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-8 pt-36 pb-24">

      {/* Eyebrow */}
      <p className="mb-8 text-sm uppercase tracking-[0.45em] text-zinc-500">
        Built for Contractors
      </p>

      {/* Headline */}
      <h1 className="max-w-5xl text-7xl font-bold leading-[0.95] tracking-tight">
        The Operating System
        <br />
        for Contractors.
      </h1>

      {/* Description */}
      <p className="mt-10 max-w-2xl text-2xl leading-relaxed text-zinc-400">
        One place to manage every customer,
        every job and every dollar.
      </p>

      {/* Buttons */}
      <div className="mt-14 flex gap-5">

        <button className="rounded-2xl bg-white px-8 py-4 font-semibold text-black transition hover:scale-[1.02]">
          Join Waitlist
        </button>

        <button className="rounded-2xl border border-zinc-700 px-8 py-4 font-semibold text-white transition hover:bg-zinc-900">
          See It In Action
        </button>

      </div>

    </section>
  );
}