import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-900 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <a href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Opekon"
            width={42}
            height={42}
            priority
          />

          <span className="text-2xl font-bold tracking-tight text-white">
            Opekon
          </span>
        </a>

        <a
          href="#waitlist"
          className="rounded-xl border border-zinc-700 px-6 py-3 text-white transition duration-200 hover:bg-white hover:text-black"
        >
          Join Waitlist
        </a>
      </div>
    </nav>
  );
}