import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#101820] text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-300">
          (c) {new Date().getFullYear()} Duka Intelligence. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/pricing" className="text-slate-300 transition hover:text-orange-300">
            Pricing
          </Link>
          <Link href="/terms" className="text-slate-300 transition hover:text-orange-300">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="text-slate-300 transition hover:text-orange-300">
            Privacy Policy
          </Link>
          <Link href="/dpa" className="text-slate-300 transition hover:text-orange-300">
            Data Processing Agreement
          </Link>
          <Link href="/aup" className="text-slate-300 transition hover:text-orange-300">
            Acceptable Use Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}