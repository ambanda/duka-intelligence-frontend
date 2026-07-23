import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#101820]/95 text-white shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-3 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="rounded-xl bg-white px-3 py-2">
            <Image
              src="/logo.jpeg"
              alt="Duka Intelligence"
              width={230}
              height={60}
              className="h-12 w-auto object-contain md:h-14"
              priority
            />
          </span>
          <span className="sr-only">Duka Intelligence</span>
        </Link>

        <nav className="flex flex-wrap items-center gap-5 text-sm font-medium text-slate-200">
          <Link href="/platform" className="transition hover:text-orange-300">
            Platform
          </Link>
          <Link href="/ai-assistant" className="transition hover:text-orange-300">
            Duka Agents
          </Link>
          <Link href="/industries" className="transition hover:text-orange-300">
            Solutions
          </Link>
          <Link href="/trust" className="transition hover:text-orange-300">
            Trust
          </Link>
          <Link href="/pricing" className="transition hover:text-orange-300">
            Pricing
          </Link>
          <Link href="/about" className="transition hover:text-orange-300">
            Company
          </Link>
          <Link
            href="/contact"
            className="rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white transition hover:bg-orange-600"
          >
            Book Demo
          </Link>
        </nav>
      </div>
    </header>
  );
}