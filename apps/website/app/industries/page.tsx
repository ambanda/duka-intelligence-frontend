export const dynamic = "force-static";

import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck2,
  Check,
  CircleDollarSign,
  HeartPulse,
  MessageCircle,
  Scale,
  ShoppingBag,
  UsersRound,
} from "lucide-react";

import { dukaWhatsAppChatUrl } from "@/lib/brand";

const journeys = [
  {
    title: "Clinics and wellness",
    icon: HeartPulse,
    steps: ["Discover available services", "Book or reschedule an appointment", "Pay a required deposit", "Give staff today's schedule", "Report utilization and cancellations"],
  },
  {
    title: "Retail and professional services",
    icon: ShoppingBag,
    steps: ["Browse products or services", "Ask a product or service question", "Confirm an order or booking", "Collect payment into the merchant account", "Track demand and completed journeys"],
  },
  {
    title: "Markets and auctions",
    icon: CircleDollarSign,
    steps: ["Register sellers, buyers and preferences", "Inspect and approve a lot", "Match buyers and open bidding", "Collect a required payment", "Coordinate collection or delivery"],
  },
  {
    title: "SACCOs and member organizations",
    icon: UsersRound,
    steps: ["Explain public products and requirements", "Guide a member to the next step", "Provide verified member self-service", "Search authorized documents", "Review portfolio and operational metrics"],
  },
];

export default function IndustriesPage() {
  return (
    <main>
      <section className="bg-[#101820] px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold text-orange-300">Business journeys</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold text-white md:text-5xl">
            Duka adapts to the work, not just the industry label
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-300">
            Shared capabilities such as discovery, self-service, payments, staff operations and reporting are configured around each business&apos;s services, rules and roles.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {journeys.map((journey) => (
            <article key={journey.title} className="rounded-lg border border-slate-200 p-6">
              <journey.icon className="h-7 w-7 text-orange-600" />
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">{journey.title}</h2>
              <ol className="mt-5 space-y-3">
                {journey.steps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-semibold text-emerald-800">{index + 1}</span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f2f5f3] px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Scale className="h-7 w-7 text-emerald-700" />
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">Shared platform, tenant-specific business</h2>
            <p className="mt-4 text-slate-600">Duka reuses secure platform capabilities while each business keeps its own identity, WhatsApp assets, services, catalogs, staff, payment account and operating configuration.</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {["Business-owned WhatsApp account", "Tenant-specific products and services", "Workspace staff and role assignments", "Published templates and Flows", "Merchant payment connection", "Sector and business reporting"].map((item) => (
              <li key={item} className="flex items-start gap-3 border-b border-slate-300 pb-3 text-sm text-slate-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-6 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <CalendarCheck2 className="mx-auto h-8 w-8 text-orange-600" />
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">Discover your first journey</h2>
          <p className="mt-4 text-slate-600">Start with a journey your customers or staff already perform, then add more when the business is ready.</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/pricing" className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600">
              View pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={dukaWhatsAppChatUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-emerald-700 px-6 py-3 font-semibold text-emerald-800 hover:bg-emerald-50">
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
