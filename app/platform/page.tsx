export const dynamic = "force-static";

import Link from "next/link";
import {
  Braces,
  Cloud,
  Database,
  Gauge,
  Layers3,
  LockKeyhole,
  MessageCircle,
  SearchCheck,
  Server,
  ShieldCheck,
  Workflow,
} from "lucide-react";

const flow = [
  "Sources",
  "Ingestion",
  "Data layers",
  "Knowledge objects",
  "Retrieval",
  "Knowledge API",
  "Workspace assistant",
];

const objects = [
  "Customer and member knowledge",
  "Operational knowledge",
  "Revenue and performance knowledge",
  "Inventory and service knowledge",
  "Communication and engagement knowledge",
  "Task and workflow knowledge",
];

const platformParts = [
  {
    icon: Database,
    title: "Source connectors",
    text: "Connect business systems, files, folders, email, chat apps, social channels, and internal APIs.",
  },
  {
    icon: Layers3,
    title: "Knowledge Object Processor",
    text: "Clean, extract, normalize, enrich, deduplicate, and organize information into AI-safe objects.",
  },
  {
    icon: ShieldCheck,
    title: "Governance layer",
    text: "Apply tenant isolation, role-based permissions, citations, freshness, quality checks, and lineage.",
  },
  {
    icon: Workflow,
    title: "Workspace skills",
    text: "Teach assistants approved retrieval, explanation, reporting, follow-up, and task execution skills.",
  },
  {
    icon: MessageCircle,
    title: "Chat app access",
    text: "Let approved teams interact through WhatsApp and familiar channels, with every answer permission-aware.",
  },
  {
    icon: Braces,
    title: "APIs and embedded workflows",
    text: "Expose governed knowledge to dashboards, internal apps, workflow surfaces, and partner systems.",
  },
];

const deploymentOptions = [
  {
    icon: Cloud,
    title: "Managed SaaS",
    bestFor: "Teams that want the fastest route from pilot to production with Duka managing the platform operations.",
    points: [
      "Fastest setup and rollout",
      "Managed updates, monitoring, and platform operations",
      "Standard connectors and workspace assistant delivery",
      "Lower infrastructure overhead for the customer team",
    ],
  },
  {
    icon: Server,
    title: "Dedicated Instance",
    bestFor: "Organizations whose policies, regulator, procurement process, or risk model does not allow shared SaaS.",
    points: [
      "Single-tenant deployment boundary",
      "Custom network, access, and integration controls",
      "Customer-specific environment separation",
      "Flexible alignment with internal governance policies",
    ],
  },
];

const integrationPaths = [
  "Files, exports, spreadsheets, PDFs, and document batches",
  "Cloud storage, shared folders, and Microsoft 365-style repositories",
  "Email, WhatsApp, chat channels, social channels, and web inquiries",
  "APIs, databases, warehouses, and internal operational systems",
];

const rolloutSteps = [
  "Start with a focused workspace and high-value knowledge sources",
  "Configure users, roles, permissions, and assistant channel access",
  "Teach initial skills for retrieval, summaries, follow-ups, and handoffs",
  "Validate citations, answer quality, freshness, and safe fallbacks",
  "Expand into deeper integrations, more workspaces, and controlled tasks",
];

export default function PlatformPage() {
  return (
    <main className="px-6 py-16 md:py-20">
      <section className="max-w-6xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
          Platform
        </p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
          The AI knowledge layer for workspace assistants
        </h1>
        <p className="mt-6 max-w-4xl text-lg text-gray-600">
          Duka connects organizational knowledge, processes it into governed
          objects, teaches assistants safe workspace skills, and delivers answers
          through WhatsApp, dashboards, APIs, and embedded workflows.
        </p>
      </section>

      <section className="max-w-6xl mx-auto mt-12">
        <h2 className="text-3xl font-semibold text-gray-900">Platform Flow</h2>
        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-7">
          {flow.map((step, index) => (
            <div key={step} className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {index + 1}
              </p>
              <p className="mt-2 font-medium text-slate-800">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {platformParts.map((part) => (
          <article key={part.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <part.icon className="h-6 w-6 text-orange-600" />
            <h2 className="mt-4 text-xl font-semibold text-slate-900">{part.title}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">{part.text}</p>
          </article>
        ))}
      </section>

      <section className="max-w-6xl mx-auto mt-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
            Governed Objects
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-gray-900">
            Assistants reason over objects, not raw systems
          </h2>
          <p className="mt-4 text-gray-600">
            The processor gives AI agents the context they need without giving
            them broad access to operational databases, inboxes, folders, or
            admin tools.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {objects.map((object) => (
            <div key={object} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">
              {object}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-14">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
            Deployment Options
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-gray-900">
            Deploy for speed or for stricter governance boundaries
          </h2>
          <p className="mt-4 text-gray-600">
            Use Duka as managed SaaS for the fastest rollout, or as a dedicated
            instance when internal policy requires stronger isolation, custom
            controls, or customer-specific infrastructure boundaries.
          </p>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {deploymentOptions.map((option) => (
            <article key={option.title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
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

      <section className="max-w-6xl mx-auto mt-14 grid gap-8 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-slate-50 p-7">
          <Gauge className="h-7 w-7 text-orange-600" />
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">
            Designed to integrate quickly
          </h2>
          <p className="mt-3 text-slate-600">
            Start small, prove trust, then expand. Duka can begin with a focused
            knowledge set before connecting deeper systems and workflow actions.
          </p>
          <div className="mt-5 grid gap-3">
            {integrationPaths.map((path) => (
              <div key={path} className="rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700">
                {path}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-7">
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

      <section className="max-w-6xl mx-auto mt-14 rounded-2xl border border-emerald-200 bg-emerald-50 p-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <LockKeyhole className="h-7 w-7 text-emerald-700" />
            <h2 className="mt-3 text-2xl font-semibold text-slate-900">
              Built for controlled assistant access
            </h2>
            <p className="mt-3 max-w-3xl text-slate-700">
              Every retrieval and action can be constrained by allowed users,
              allowed objects, allowed actions, citations, and audit rules.
            </p>
          </div>
          <Link href="/trust" className="inline-flex rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-slate-800">
            View Trust Layer
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-14 text-center">
        <SearchCheck className="mx-auto h-8 w-8 text-orange-600" />
        <h2 className="mt-3 text-3xl font-semibold text-gray-900">
          Make your organization's knowledge usable through chat
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="inline-flex rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600">
            Book Demo
          </Link>
          <Link href="/ai-assistant" className="inline-flex rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-50">
            See Assistant
          </Link>
        </div>
      </section>
    </main>
  );
}
