export const dynamic = "force-static";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  ClipboardCheck,
  MessageCircle,
  ShoppingBag,
} from "lucide-react";

import { dukaWhatsAppChatUrl } from "@/lib/brand";

const tiers = [
  {
    tier: "Tier 1",
    name: "Connect",
    cta: "Discuss Connect",
    price: "$20",
    cadence: "per business each month",
    description: "Give the business a managed WhatsApp entry point and a reliable route to the team.",
    icon: MessageCircle,
    features: [
      "Facebook Embedded Signup for the business WhatsApp account",
      "Managed WhatsApp channel connection",
      "Meta campaigns, including Click-to-WhatsApp ads and approved WhatsApp marketing campaigns",
      "Website, QR and shared-link entry points",
      "Welcome message and approved public information",
      "Frequently asked questions",
      "Human handoff",
    ],
  },
  {
    tier: "Tier 2",
    name: "Connect + Serve",
    cta: "Discuss Serve",
    price: "$50",
    cadence: "per business each month",
    description: "Add guided customer journeys and self-service for up to 100 customers.",
    icon: ShoppingBag,
    features: [
      "Everything in Connect",
      "Customer registration and consent",
      "Appointments and tickets",
      "Catalogs, orders and sector workflows",
      "Customer self-service and support",
      "Up to 100 customers included",
    ],
    overage: "$0.15 for each additional customer above 100",
  },
  {
    tier: "Tier 3",
    name: "Connect + Serve + Operate + Understand",
    cta: "Discuss Operate",
    price: "$20",
    cadence: "per staff seat each month",
    description: "Add authorized staff operations, enterprise knowledge and management reporting.",
    icon: ClipboardCheck,
    features: [
      "Everything in Connect and Serve",
      "Staff roles and controlled access",
      "Schedules, orders, collections and handoffs",
      "Enterprise search over approved knowledge",
      "Operational alerts and approvals",
      "Customer journey and management reporting",
    ],
    overage: "Staff seats are added to the Tier 2 business and customer usage price",
  },
];

const comparison = [
  ["WhatsApp connection and public entry points", true, true, true],
  ["FAQs and human handoff", true, true, true],
  ["Customer self-service", false, true, true],
  ["Appointments, tickets, catalogs and orders", false, true, true],
  ["Staff operations and enterprise search", false, false, true],
  ["Journey and management reporting", false, false, true],
] as const;

export default function PricingPage() {
  return (
    <main>
      <section className="bg-[#101820] px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold text-orange-300">Simple, progressive pricing</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold text-white md:text-5xl">
            Start with WhatsApp. Add service, operations and intelligence when you are ready.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-300">
            Each tier builds on the one before it, so the business can solve one useful problem first and expand without replacing its setup.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <article key={tier.tier} className={`flex h-full flex-col rounded-lg border p-6 ${index === 1 ? "border-orange-400 bg-orange-50/50" : "border-slate-200 bg-white"}`}>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-orange-700">{tier.tier}</span>
                <tier.icon className="h-6 w-6 text-emerald-700" />
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">{tier.name}</h2>
              <div className="mt-5 border-y border-slate-200 py-4">
                <p className="text-4xl font-bold text-slate-900">{tier.price}</p>
                <p className="mt-1 text-sm text-slate-500">{tier.cadence}</p>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-600">{tier.description}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {tier.overage ? (
                <p className="mt-6 border-t border-slate-200 pt-4 text-sm font-semibold text-slate-800">
                  {tier.overage}
                </p>
              ) : null}
              <a href={dukaWhatsAppChatUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#101820] px-5 py-3 font-semibold text-white transition hover:bg-[#17212b]">
                {tier.cta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f2f5f3] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <BarChart3 className="h-7 w-7 text-emerald-700" />
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">Compare the adoption tiers</h2>
            <p className="mt-3 text-slate-600">Move up only when the next capability creates value for the business.</p>
          </div>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-y border-slate-300 text-slate-900">
                  <th className="py-4 pr-4 font-semibold">Capability</th>
                  <th className="px-4 py-4 text-center font-semibold">Connect</th>
                  <th className="px-4 py-4 text-center font-semibold">Serve</th>
                  <th className="pl-4 py-4 text-center font-semibold">Operate + Understand</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([feature, connect, serve, operate]) => (
                  <tr key={feature} className="border-b border-slate-200">
                    <td className="py-4 pr-4 text-slate-700">{feature}</td>
                    {[connect, serve, operate].map((included, index) => (
                      <td key={`${feature}-${index}`} className="px-4 py-4 text-center">
                        {included ? <Check className="mx-auto h-4 w-4 text-emerald-700" aria-label="Included" /> : <span className="text-slate-400">Not included</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-semibold text-slate-900">A clear price, configured around the real journey</h2>
          <p className="mt-4 text-slate-600">
            Meta messaging charges, payment-provider fees, taxes, custom integrations and dedicated infrastructure are separate where applicable. The proposal confirms billing period, customer-count rules and any provider charges before launch.
          </p>
          <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600">
            Talk to our team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
