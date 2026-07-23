export const dynamic = "force-static";

import Link from "next/link";
import {
  Braces,
  Cloud,
  Database,
  FileText,
  Gauge,
  Layers3,
  LockKeyhole,
  Mail,
  MessageCircle,
  SearchCheck,
  Server,
  Share2,
  ShieldCheck,
  Workflow,
} from "lucide-react";

const sources = [
  { title: "Business systems", text: "Operational systems, databases, sector platforms, and internal tools.", icon: Database },
  { title: "Documents", text: "PDFs, spreadsheets, reports, knowledge files, and shared folders.", icon: FileText },
  { title: "Communications", text: "Email, chats, WhatsApp, team conversations, and collaboration channels.", icon: Mail },
  { title: "Social and web", text: "Social media, web inquiries, websites, customer messages, and external feeds.", icon: Share2 },
  { title: "APIs", text: "Internal APIs, warehouses, cloud data layers, and controlled workflow endpoints.", icon: Braces },
];

const processing = [
  "Connectors and ingestion",
  "Relational data processing",
  "Unstructured document and text processing",
  "Communication and conversation processing",
  "Entity extraction and relationship mapping",
  "Knowledge object creation",
  "Data normalization and enrichment",
  "Access control, lineage, citations, freshness, and audit context",
];

const deploymentOptions = [
  {
    icon: Cloud,
    title: "Managed SaaS",
    bestFor: "Teams that want the fastest route from pilot to production with Duka managing platform operations.",
    points: [
      "Fast setup and rollout",
      "Managed updates and monitoring",
      "Standard connectors and agent delivery",
      "Lower infrastructure overhead",
    ],
  },
  {
    icon: Server,
    title: "Dedicated Instance",
    bestFor: "Organizations whose policies, regulator, procurement process, or risk model does not allow shared SaaS.",
    points: [
      "Single-tenant deployment boundary",
      "Custom network and access controls",
      "Private integration paths",
      "Alignment with internal governance policies",
    ],
  },
];

const rolloutSteps = [
  "Start with a focused workspace and high-value knowledge sources",
  "Configure users, roles, permissions, and assistant channel access",
  "Validate citations, answer quality, freshness, and safe fallbacks",
  "Teach initial Duka Agent skills for retrieval, summaries, and handoffs",
  "Expand into deeper integrations, more workspaces, and controlled actions",
];

export default function PlatformPage() {
  return (
    <main className="px-6 py-16 md:py-20">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-700">
          The Core Platform
        </p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
          Unify and govern enterprise knowledge for AI use
        </h1>
        <p className="mt-6 max-w-4xl text-lg text-gray-600">
          The Core Platform connects organizational systems, documents,
          communications, social channels, and APIs, then processes structured
          and unstructured information into governed knowledge objects that Duka
          Agents can safely use.
        </p>
      </section>

      <section className="mx-auto mt-12 max-w-6xl grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {sources.map((source) => (
          <article key={source.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
            <source.icon className="h-6 w-6 text-orange-600" />
            <h2 className="mt-4 text-lg font-semibold text-slate-900">{source.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{source.text}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-14 grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-700">
            State of the Art Processing
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-gray-900">
            From raw enterprise data to governed knowledge objects
          </h2>
          <p className="mt-4 text-gray-600">
            Duka processes relational data, documents, messages, conversations,
            and social content into a centralized knowledge layer while preserving
            access controls, ownership, lineage, and freshness context.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {processing.map((item) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium leading-6 text-slate-700 shadow-sm">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 rounded-2xl border border-emerald-200 bg-emerald-50 p-7 shadow-card max-w-6xl">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <LockKeyhole className="h-7 w-7 text-emerald-700" />
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">
              A safe knowledge layer for Duka Agents
            </h2>
            <p className="mt-3 max-w-3xl text-slate-700">
              Agents do not need broad access to raw databases, inboxes, folders,
              or admin tools. They work through governed objects with allowed
              users, allowed actions, citations, freshness, and audit context.
            </p>
          </div>
          <Link href="/trust" className="inline-flex rounded-xl bg-[#101820] px-5 py-3 font-semibold text-white transition hover:bg-[#17212b]">
            View Trust Layer
          </Link>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-700">
            Deployment Options
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-gray-900">
            Deploy for speed or stricter governance boundaries
          </h2>
          <p className="mt-4 text-gray-600">
            Use Duka as managed SaaS for the fastest rollout, or as a dedicated
            instance when internal policy requires stronger isolation and
            customer-specific infrastructure boundaries.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {deploymentOptions.map((option) => (
            <article key={option.title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-card">
              <option.icon className="h-7 w-7 text-orange-600" />
              <h3 className="mt-4 text-2xl font-semibold text-slate-900">{option.title}</h3>
              <p className="mt-3 text-slate-600">{option.bestFor}</p>
              <ul className="mt-5 space-y-3">
                {option.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-slate-700">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 grid max-w-6xl gap-8 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-card">
          <Gauge className="h-7 w-7 text-orange-600" />
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">
            Designed to integrate quickly
          </h2>
          <p className="mt-3 text-slate-600">
            Start with files, exports, folders, chat channels, or existing APIs,
            then expand into deeper integrations as trust and usage grow.
          </p>
        </article>

        <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-7 shadow-card">
          <Workflow className="h-7 w-7 text-emerald-700" />
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">
            Pilot to production without rebuilding your stack
          </h2>
          <ol className="mt-5 space-y-3">
            {rolloutSteps.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm text-slate-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-semibold text-emerald-700">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className="mx-auto mt-14 text-center max-w-6xl">
        <SearchCheck className="mx-auto h-8 w-8 text-orange-600" />
        <h2 className="mt-3 text-3xl font-semibold text-gray-900">
          Give Duka Agents trusted enterprise knowledge to work with
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="inline-flex rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600">
            Book Demo
          </Link>
          <Link href="/ai-assistant" className="inline-flex rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-50">
            See Duka Agents
          </Link>
        </div>
      </section>
    </main>
  );
}