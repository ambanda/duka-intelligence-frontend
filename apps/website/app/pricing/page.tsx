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

const plans = [
  {
    tier: "Tier 1",
    name: "Front Desk",
    capability: "Connect",
    cta: "Discuss Front Desk",
    price: "$20",
    cadence: "per business each month",
    description: "Help people discover the business, onboard and reach the right next step.",
    icon: MessageCircle,
    features: [
      "Facebook Embedded Signup and managed WhatsApp connection",
      "Website, QR, social profile and shared-link entry points",
      "Click-to-WhatsApp ads and approved WhatsApp marketing campaigns",
      "Business introduction, services, locations and operating hours",
      "Customer onboarding and consent capture",
      "Frequently asked questions",
      "Enquiry qualification and human handoff",
    ],
  },
  {
    tier: "Tier 2",
    name: "Service Desk",
    capability: "Serve",
    cta: "Discuss Service Desk",
    price: "$50",
    cadence: "per business each month",
    description: "Serve existing customers and newly onboarded customers through guided workflows.",
    icon: ShoppingBag,
    features: [
      "Customer self-service and support workflows",
      "Appointments and tickets",
      "Catalog browsing and enquiries",
      "Orders and confirmations",
      "Sector-specific transactions",
      "Payment collection and confirmation",
      "Up to 100 served customers each month",
    ],
    note: "$0.15 for each additional served customer above 100",
  },
  {
    tier: "Tier 3",
    name: "Back Office",
    capability: "Operate & Understand",
    cta: "Discuss Back Office",
    price: "$28",
    cadence: "per active staff seat each month",
    description: "Give authorized staff the tools, knowledge and reporting needed to run the work.",
    icon: ClipboardCheck,
    features: [
      "Staff identities, roles and controlled access",
      "Schedules, work queues and assignments",
      "Orders, collections, approvals and exceptions",
      "Tracked customer handoffs",
      "Enterprise search over approved knowledge",
      "Operational alerts and audit history",
      "Journey, utilization and management reporting",
    ],
  },
];

const sharedFoundation = [
  "Tenant and workspace isolation",
  "Business-owned WhatsApp channel connection",
  "Secure credential and Meta asset references",
  "Administrator access and channel monitoring",
  "Consent, audit and messaging controls",
];

const comparison = [
  ["Shared technical foundation", true, true, true],
  ["Discovery entry points and Meta campaigns", true, false, false],
  ["Customer onboarding, FAQs and routing", true, false, false],
  ["Appointments, tickets and customer support", false, true, false],
  ["Catalogs, orders and payment collection", false, true, false],
  ["Staff operations and approvals", false, false, true],
  ["Enterprise search and management reporting", false, false, true],
] as const;

const examples = [
  ["Front Desk", "$20/month"],
  ["Service Desk", "$50/month, including 100 served customers"],
  ["Front Desk + Service Desk", "$70/month, plus customer overage"],
  ["Service Desk + 5 Back Office seats", "$190/month, plus customer overage"],
  ["All three centres + 5 seats", "$210/month, plus customer overage"],
] as const;

export default function PricingPage() {
  return (
    <main>
      <section className="bg-[#101820] px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold text-orange-300">Service-centre pricing</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold text-white md:text-5xl">
            Choose the service centres your business needs now.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-300">
            Front Desk, Service Desk and Back Office are independently selectable modules. Combine them when the business needs a connected journey across customer service and internal operations.
          </p>
        </div>
      </section>

      <section className="bg-[#f2f5f3] px-6 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold text-emerald-800">Included with every module</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">A secure shared foundation</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">The foundation makes each module operable. It does not add the business capabilities of another service centre.</p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {sharedFoundation.map((item) => (
              <li key={item} className="flex items-start gap-3 border-b border-slate-300 pb-3 text-sm text-slate-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.tier} className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-sm font-semibold text-orange-700">{plan.tier}</span>
                  <p className="mt-1 text-xs font-semibold text-emerald-800">{plan.capability}</p>
                </div>
                <plan.icon className="h-6 w-6 text-emerald-700" />
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">{plan.name}</h2>
              <div className="mt-5 border-y border-slate-200 py-4">
                <p className="text-4xl font-bold text-slate-900">{plan.price}</p>
                <p className="mt-1 text-sm text-slate-500">{plan.cadence}</p>
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-600">{plan.description}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {plan.note ? (
                <p className="mt-6 border-t border-slate-200 pt-4 text-sm font-semibold text-slate-800">{plan.note}</p>
              ) : null}
              <a href={dukaWhatsAppChatUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#101820] px-5 py-3 font-semibold text-white transition hover:bg-[#17212b]">
                {plan.cta}
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
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">Compare independent service-centre modules</h2>
            <p className="mt-3 text-slate-600">A check means the capability belongs to that module. Selecting a higher-numbered tier does not automatically activate another module.</p>
          </div>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-y border-slate-300 text-slate-900">
                  <th className="py-4 pr-4 font-semibold">Capability</th>
                  <th className="px-4 py-4 text-center font-semibold">Front Desk</th>
                  <th className="px-4 py-4 text-center font-semibold">Service Desk</th>
                  <th className="pl-4 py-4 text-center font-semibold">Back Office</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map(([feature, frontDesk, serviceDesk, backOffice]) => (
                  <tr key={feature} className="border-b border-slate-200">
                    <td className="py-4 pr-4 text-slate-700">{feature}</td>
                    {[frontDesk, serviceDesk, backOffice].map((included, index) => (
                      <td key={`${feature}-${index}`} className="px-4 py-4 text-center">
                        {included ? <Check className="mx-auto h-4 w-4 text-emerald-700" aria-label="Included" /> : <span className="text-slate-400">-</span>}
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
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">How usage is counted</h2>
            <p className="mt-4 text-slate-600"><strong className="text-slate-900">Served customer:</strong> one unique existing customer or newly onboarded Front Desk customer handled by a Service Desk workflow during the billing month. Duplicate messages, delivery retries and staff accounts do not create additional counts.</p>
            <p className="mt-4 text-slate-600"><strong className="text-slate-900">Active staff seat:</strong> one enabled internal user authorized to use Back Office capabilities during the billing period.</p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Example combinations</h2>
            <dl className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
              {examples.map(([label, value]) => (
                <div key={label} className="grid gap-1 py-3 sm:grid-cols-[1fr_auto] sm:gap-6">
                  <dt className="text-sm font-semibold text-slate-900">{label}</dt>
                  <dd className="text-sm text-slate-600">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 pb-16 text-center">
        <div className="mx-auto max-w-4xl border-t border-slate-200 pt-12">
          <h2 className="text-3xl font-semibold text-slate-900">Configure the service centres around your real customer and staff journeys</h2>
          <p className="mt-4 text-slate-600">Meta advertising spend and messaging charges, payment-provider fees, taxes, custom integrations and dedicated infrastructure are separate where applicable.</p>
          <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600">
            Talk to our team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
