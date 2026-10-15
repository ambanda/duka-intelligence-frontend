import Image from "next/image";
import Link from "next/link";
import { LogIn, MessageCircle } from "lucide-react";

import { dukaWhatsAppChatUrl } from "@/lib/brand";
import { workspaceSignInUrl } from "@/lib/workspaceUrl";

export default function Navbar() {
  const signInUrl = workspaceSignInUrl();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#101820]/95 text-white shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-2 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-horizontal-dark.png"
            alt="Duka Intelligence"
            width={420}
            height={156}
            className="h-16 w-auto rounded-md object-contain md:h-20"
            priority
          />
          <span className="sr-only">Duka Intelligence</span>
        </Link>

        <nav className="flex flex-wrap items-center gap-5 text-sm font-medium text-slate-200">
          <Link href="/about" className="transition hover:text-orange-300">
            About
          </Link>
          <Link href="/ai-assistant" className="transition hover:text-orange-300">
            Product
          </Link>
          <Link href="/platform" className="transition hover:text-orange-300">
            How It Works
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
          <a
            href={signInUrl}
            className="inline-flex items-center gap-2 border-l border-white/20 pl-5 font-semibold text-white transition hover:text-orange-300"
          >
            <LogIn aria-hidden="true" size={16} />
            Workspace sign in
          </a>
          <a
            href={dukaWhatsAppChatUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white transition hover:bg-orange-600"
          >
            <MessageCircle aria-hidden="true" size={16} />
            Chat on WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
