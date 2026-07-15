import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-black px-6 py-8 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="Opekon"
            width={34}
            height={34}
            className="rounded-full"
          />

          <span className="font-semibold">Opekon</span>
        </div>

        <p className="text-sm text-zinc-600">
          © 2026 Opekon. All rights reserved.
        </p>
      </div>
    </footer>
  );
}