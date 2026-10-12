import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  // Event pages reached via the QR shirt; keep them out of search results
  robots: { index: false, follow: false },
};

export default function MoonshotLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex-1 bg-[#020617] text-white overflow-x-clip">
      <div
        className="absolute -top-40 -left-40 w-[28rem] h-[28rem] bg-brand-indigo/25 rounded-full blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute top-1/4 -right-40 w-[28rem] h-[28rem] bg-brand-cyan/10 rounded-full blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 left-1/3 w-[28rem] h-[28rem] bg-brand-lime/5 rounded-full blur-[120px]"
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 pb-16">
        <header className="h-20 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden ring-1 ring-white/10 shadow-[0_0_24px_rgba(34,211,238,0.35)]">
              <Image
                src="/monivah-logo.png"
                alt="Monivah logo"
                fill
                sizes="40px"
                priority
                className="object-cover"
              />
            </div>
            <span className="font-bold text-lg sm:text-xl tracking-tight">Monivah</span>
          </Link>

          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-lime" />
            Moonshot 2026 · Lagos
          </span>
        </header>

        {children}
      </div>
    </main>
  );
}
