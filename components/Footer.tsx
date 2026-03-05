import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white/80">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-gray-500">
          (c) {new Date().getFullYear()} Duka Intelligence. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/terms" className="text-gray-600 hover:text-orange-600 transition">
            Terms & Conditions
          </Link>
          <Link href="/privacy" className="text-gray-600 hover:text-orange-600 transition">
            Privacy Policy
          </Link>
          <Link href="/dpa" className="text-gray-600 hover:text-orange-600 transition">
            Data Processing Agreement
          </Link>
          <Link href="/aup" className="text-gray-600 hover:text-orange-600 transition">
            Acceptable Use Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
