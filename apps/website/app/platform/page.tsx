export const dynamic = "force-static";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  Database,
  Fingerprint,
  MessageCircle,
  SearchCheck,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import { serviceCentres } from "@/lib/brand";

const centreIcons = [MessageCircle, Workflow, BarChart3];

const runtime = [
  {
    title: "Connect the business",
    text: "Use Embedded Signup with the business owner's Facebook account, then link services, catalogs, entry points and approved business information.",
  },
  {
    title: "Recognize the context",
    text: "Resolve the receiving business, the customer or staff member, their journey and the access they are allowed.",
  },
  {
    title: "Offer the right skill",
    text: "Present only the discovery, self-service or staff actions enabled for that business and role.",
  },
  {
    title: "Complete governed work",
    text: "Run booking, ordering, payment, approval, handoff or retrieval through a controlled workflow.",
  },
  {
    title: "Record the outcome",
    text: "Keep message, journey, workflow and business outcome history for operations and reporting.",
  },
];

const foundations = [
  { icon: Database, title: "Connected knowledge", text: "Bring together approved operational data, documents, messages and business records without exposing raw systems to every user." },
  { icon: SearchCheck, title: "Enterprise search", text: "Let authorized staff find grounded answers from the knowledge available to their workspace and role." },
  { icon: Workflow, title: "Deterministic workflows", text: "Use explicit business states and validation for bookings, orders, payments, approvals and other consequential work." },
  { icon: Bot, title: "Purposeful AI", text: "Use AI to interpret intent, retrieve context and explain results while governed services remain responsible for actions." },
];

export default function PlatformPage() {
  return (
    <main>
      <section className="bg-[#101820] px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold text-orange-300">How Duka works</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold text-white md:text-5xl">
            One governed path from a WhatsApp message to completed business work
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-300">
            Duka connects the customer conversation, the staff task and the management result without allowing a chat message to decide who has access or what business action is valid.
          </p>
        </div>
      </section>

      <section className="bg-[#f2f5f3] px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold text-emerald-800">Where the assistant works</p>
          <div className="mt-6 grid border-y border-slate-300 md:grid-cols-3">
            {serviceCentres.map((centre, index) => {
              const CentreIcon = centreIcons[index];

              return (
                <article key={centre.id} className="border-b border-slate-300 px-5 py-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                  <CentreIcon className="h-6 w-6 text-orange-600" />
                  <p className="mt-4 text-xs font-semibold text-emerald-800">{centre.capability}</p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-900">{centre.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{centre.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-3xl text-3xl font-semibold text-slate-900">The journey through Duka</h2>
          <ol className="mt-9 border-y border-slate-200">
            {runtime.map((item, index) => (
              <li key={item.title} className="grid gap-3 border-b border-slate-200 py-5 last:border-b-0 md:grid-cols-[80px_240px_1fr] md:items-start">
                <span className="text-sm font-semibold text-orange-700">Step {index + 1}</span>
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[#f2f5f3] px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <article className="border-l-4 border-emerald-600 pl-6">
            <MessageCircle className="h-7 w-7 text-emerald-700" />
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">WhatsApp assistant</h2>
            <p className="mt-4 text-slate-600">
              The business&apos;s customers and staff use a familiar channel. Templates, Flows, catalogs, buttons and free-form conversations guide each approved journey.
            </p>
          </article>
          <article className="border-l-4 border-orange-500 pl-6">
            <Fingerprint className="h-7 w-7 text-orange-600" />
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">Duka Workspace</h2>
            <p className="mt-4 text-slate-600">
              Administrators connect channels, manage assets, enable skills, assign staff access, monitor delivery and control how the assistant operates for their workspace.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-orange-700">Under the assistant</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">A platform built for trusted action</h2>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {foundations.map((item) => (
              <article key={item.title} className="rounded-lg border border-slate-200 p-6">
                <item.icon className="h-6 w-6 text-orange-600" />
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#12352f] px-6 py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <ShieldCheck className="h-8 w-8 text-emerald-200" />
            <h2 className="mt-4 text-3xl font-semibold text-white">Authority comes from the workspace, not the prompt</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Tenant and workspace isolation", "Verified customer and staff identities", "Published skills and allowlisted actions", "Consent and messaging-window controls", "Encrypted credentials and message retention", "Audit and usage attribution"].map((item) => (
              <div key={item} className="flex items-start gap-3 border-b border-white/15 pb-3 text-sm text-emerald-50">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <BarChart3 className="mx-auto h-8 w-8 text-orange-600" />
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">Start with one journey, then reuse the foundation</h2>
          <p className="mt-4 text-slate-600">The same workspace, channel and controls can support additional customer, staff and reporting capabilities when the business is ready.</p>
          <Link href="/pricing" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600">
            Compare service-centre modules
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
