import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-36 flex items-center justify-between">
        {/* Brand */}
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

        {/* Navigation */}
        <nav className="flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link href="/about" className="hover:text-orange-600 transition">
            About
          </Link>
          <Link href="/product" className="hover:text-orange-600 transition">
            Product
          </Link>
          <Link
            href="/contact"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
