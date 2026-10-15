export const dynamic = "force-static";

import {
  BadgeCheck,
  Banknote,
  FileSearch,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  MessageCircleWarning,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

import { metaProviderStatement, whatsappReach } from "@/lib/brand";

const controls = [
  { icon: Fingerprint, title: "Tenant isolation", text: "Every channel, customer, workflow, order, payment and report remains scoped to the correct tenant and workspace." },
  { icon: UserCheck, title: "Role-based access", text: "Customers, staff and administrators receive different permissions from verified identities and authoritative role assignments." },
  { icon: BadgeCheck, title: "Approved skills", text: "A workspace runs only published skills, allowlisted tools and validated tenant configuration." },
  { icon: FileSearch, title: "Grounded knowledge", text: "Staff search and AI assistance use approved business knowledge, citations, freshness and source context." },
  { icon: MessageCircleWarning, title: "Consent-aware messaging", text: "Proactive messages respect consent, suppression, approved templates and WhatsApp conversation-window rules." },
  { icon: Banknote, title: "Merchant-owned funds", text: "The merchant owns the connected payment account. Duka initiates and reconciles collections without pooling merchant funds." },
];

export default function TrustPage() {
  return (
    <main>
      <section className="bg-[#101820] px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold text-orange-300">Trust and control</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold text-white md:text-5xl">
            A useful assistant should know what it is allowed to do
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-300">
            Duka separates conversation from authority. A message may express intent, but workspace identity, permissions, business rules and workflow state determine the action.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {controls.map((control) => (
            <article key={control.title} className="rounded-lg border border-slate-200 p-6">
              <control.icon className="h-6 w-6 text-orange-600" />
              <h2 className="mt-4 text-xl font-semibold text-slate-900">{control.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{control.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f2f5f3] px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <article className="border-l-4 border-emerald-600 pl-6">
            <LockKeyhole className="h-7 w-7 text-emerald-700" />
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">AI assists. Workflows decide.</h2>
            <p className="mt-4 text-slate-600">AI can classify a request, retrieve context and explain a result. Deterministic services validate availability, amounts, identities, approvals and state changes.</p>
          </article>
          <article className="border-l-4 border-orange-500 pl-6">
            <KeyRound className="h-7 w-7 text-orange-600" />
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">Secrets stay outside prompts and configuration</h2>
            <p className="mt-4 text-slate-600">Provider credentials are resolved from managed secret storage. Workspace configuration contains stable references and approved business settings, not reusable access tokens.</p>
          </article>
        </div>
      </section>

      <section className="bg-[#12352f] px-6 py-16 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <ShieldCheck className="h-8 w-8 text-emerald-200" />
            <h2 className="mt-4 text-3xl font-semibold text-white">Meta discovery, governed WhatsApp journeys</h2>
            <p className="mt-3 text-emerald-50/80">{metaProviderStatement}</p>
            <p className="mt-3 text-sm leading-6 text-emerald-50/80">
              Duka works with entry points across Meta&apos;s apps and messaging surfaces. Where configured, discovery on Facebook, Instagram, Messenger and Meta ads is channelled into the business&apos;s connected WhatsApp account, where governed customer journeys continue.
            </p>
            <p className="mt-4 text-sm text-emerald-50/80">
              {whatsappReach.text}{" "}
              <a href={whatsappReach.sourceUrl} target="_blank" rel="noreferrer" className="font-semibold text-emerald-100 underline decoration-emerald-300 underline-offset-4">
                Source: {whatsappReach.sourceLabel}
              </a>
            </p>
          </div>
          <span className="rounded-lg border border-white/20 px-4 py-3 text-sm font-semibold text-white">Meta entry points to WhatsApp</span>
        </div>
      </section>
    </main>
  );
}
