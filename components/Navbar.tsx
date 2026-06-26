import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3 md:h-36 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex items-center gap-3 bg-white">
          <Image
            src="/logo.jpeg"
            alt="Duka Intelligence"
            width={690}
            height={180}
            className="h-36 w-auto object-contain"
            priority
          />
          <span className="sr-only">Duka Intelligence</span>
        </Link>

        <nav className="flex flex-wrap items-center gap-5 text-sm font-medium text-gray-700">
          <Link href="/platform" className="hover:text-orange-600 transition">
            Platform
          </Link>
          <Link href="/industries" className="hover:text-orange-600 transition">
            Solutions
          </Link>
          <Link href="/trust" className="hover:text-orange-600 transition">
            Trust
          </Link>
          <Link href="/ai-assistant" className="hover:text-orange-600 transition">
            Assistant
          </Link>
          <Link href="/about" className="hover:text-orange-600 transition">
            Company
          </Link>
          <Link
            href="/contact"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Book Demo
          </Link>
        </nav>
      </div>
    </header>
  );
}
