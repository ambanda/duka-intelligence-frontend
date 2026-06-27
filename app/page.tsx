export const dynamic = "force-static";

import Link from "next/link";
import {
  Bot,
  CheckCircle2,
  Database,
  FileCheck2,
  Layers3,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import WorkspaceAssistantVisual from "@/components/WorkspaceAssistantVisual";

const sources = [
  "Business systems and internal tools",
  "Documents, PDFs, spreadsheets, and reports",
  "Email, shared folders, and cloud storage",
  "WhatsApp, chat apps, and team conversations",
  "Social media channels and web inquiries",
  "Sector platforms, exports, and APIs",
];

const layers = [
  {
    icon: Database,
    title: "Connect",
    text: "Bring structured and unstructured knowledge together from the places where work already happens.",
  },
  {
    icon: Layers3,
    title: "Process",
    text: "Convert raw records, messages, and files into governed knowledge objects designed for AI use.",
  },
  {
    icon: ShieldCheck,
    title: "Govern",
    text: "Apply tenant isolation, permissions, citations, freshness checks, lineage, and audit trails.",
  },
  {
    icon: Sparkles,
    title: "Teach Skills",
    text: "Give each workspace assistant approved skills for retrieval, explanation, follow-up, and task execution.",
  },
  {
    icon: MessageCircle,
    title: "Assist",
    text: "Let teams ask questions and take action through WhatsApp, dashboards, APIs, and embedded workflows.",
  },
];

const trustPoints = [
  "Agents do not query raw operational systems directly.",
  "Assistants use only the knowledge objects they are allowed to access.",
  "Every answer can carry citations, freshness, lineage, and audit context.",
];

const sectorAssistants = [
  "Financial services workspace assistant",
  "Retail and trade workspace assistant",
  "Restaurant and branch operations assistant",
  "Advisory and professional services assistant",
  "Customer engagement workspace assistant",
  "Management and executive workspace assistant",
];

const deploymentOptions = [
  {
    title: "Managed SaaS",
    text: "The fastest path to a live workspace assistant. Duka manages the platform, updates, monitoring, connectors, and assistant delivery.",
    points: ["Fastest rollout", "Managed operations", "Standard security controls"],
  },
  {
    title: "Dedicated Instance",
    text: "For organizations whose policy, regulator, or procurement rules require stronger isolation and customer-specific deployment boundaries.",
    points: ["Single-tenant boundary", "Custom access controls", "Private integration paths"],
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="px-6 py-16 md:py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
              Workspace AI Assistant
            </p>
            <h1 className="mt-4 max-w-5xl text-4xl font-bold text-gray-900 md:text-5xl">
              Your Organization's AI Workspace Assistant
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-gray-600">
              Duka connects to your business systems, documents, emails,
              chats, shared folders, and social media channels, then turns
              them into governed knowledge objects your teams can query and
              act on through WhatsApp, dashboards, and APIs.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                Book a Demo
              </Link>
              <Link
                href="/platform"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Explore Platform
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium text-slate-700">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1">
                WhatsApp-first access
              </span>
              <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1">
                Governed knowledge objects
              </span>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1">
                Skills with safe boundaries
              </span>
            </div>
          </div>

          <WorkspaceAssistantVisual />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
              Connect Every Source
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900">
              Bring together the knowledge your teams already use
            </h2>
            <p className="mt-4 text-gray-600">
              Duka connects operational data and communication history so teams
              can retrieve information, understand context, and manage work
              from one trusted assistant.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sources.map((source) => (
              <article
                key={source}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <CheckCircle2 className="h-5 w-5 text-orange-600" />
                <p className="mt-3 font-medium text-slate-800">{source}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
              Knowledge Object Processor
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900">
              From raw data to AI-safe knowledge objects
            </h2>
            <p className="mt-4 text-gray-600">
              Duka cleans, extracts, normalizes, enriches, and organizes
              business information into controlled knowledge objects. Assistants
              interact with those objects instead of roaming through databases,
              inboxes, folders, or admin tools.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-3 md:grid-cols-2">
              {[
                "Facts and metrics",
                "Entities and relationships",
                "Citations and source lineage",
                "Access rules and ownership",
                "Freshness and quality status",
                "Allowed actions and task limits",
              ].map((item) => (
                <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
              How Duka Works
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900">
              A governed path from information to action
            </h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-5">
            {layers.map((layer, index) => (
              <article
                key={layer.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Layer {index + 1}
                </p>
                <layer.icon className="mt-4 h-6 w-6 text-orange-600" />
                <h3 className="mt-3 font-semibold text-slate-900">{layer.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{layer.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-slate-950">
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-300">
              Chat App Interaction
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Ask and act through WhatsApp and familiar chat apps
            </h2>
            <p className="mt-4 text-slate-300">
              Each workspace can have a dedicated assistant channel. Approved
              users ask questions, retrieve information, request summaries, and
              trigger allowed follow-ups without leaving the tools they already
              use every day.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white p-5 shadow-sm">
            <div className="rounded-xl bg-emerald-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Team member</p>
              <p className="mt-1">Summarize what needs attention today.</p>
            </div>
            <div className="mt-4 rounded-xl bg-slate-100 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">Duka Assistant</p>
              <p className="mt-1">
                Three items need review: customer follow-ups, a delayed document,
                and a revenue movement in one location. I can show the sources or
                prepare the approved follow-up list.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                <span className="rounded-full bg-white px-2 py-1">Allowed user</span>
                <span className="rounded-full bg-white px-2 py-1">Citations ready</span>
                <span className="rounded-full bg-white px-2 py-1">Task boundary checked</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-7">
            <LockKeyhole className="h-7 w-7 text-emerald-700" />
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">
              AI agents should not roam your systems
            </h2>
            <p className="mt-4 text-slate-700">
              Duka protects your organization by giving assistants access only
              to governed knowledge objects, not raw operational systems. Each
              answer and action is constrained by permissions, citations,
              freshness, and workspace rules.
            </p>
            <ul className="mt-5 space-y-3">
              {trustPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-slate-700">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <Bot className="h-7 w-7 text-orange-600" />
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">
              A workspace assistant for each sector
            </h2>
            <p className="mt-4 text-slate-600">
              Duka is broad enough for many organizations, but each assistant is
              shaped around the sector, workspace, and responsibilities it serves.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {sectorAssistants.map((assistant) => (
                <div key={assistant} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700">
                  {assistant}
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
              Deployment Options
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900">
              Managed SaaS or dedicated instance
            </h2>
            <p className="mt-4 text-gray-600">
              Deploy Duka as a fully managed SaaS platform for speed, or as a
              dedicated instance when your governance model requires stronger
              isolation, custom controls, or customer-specific infrastructure
              boundaries.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {deploymentOptions.map((option) => (
              <article key={option.title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <h3 className="text-2xl font-semibold text-slate-900">{option.title}</h3>
                <p className="mt-3 text-slate-600">{option.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {option.points.map((point) => (
                    <span key={point} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-medium text-slate-700">
                      {point}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 py-16 text-center bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <FileCheck2 className="mx-auto h-8 w-8 text-orange-600" />
          <h2 className="mt-4 text-3xl font-semibold text-gray-900 md:text-4xl">
            Build a governed assistant from your business knowledge
          </h2>
          <p className="mt-4 text-gray-600">
            One assistant per workspace, built from your systems, documents,
            communications, and workflows.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Book a Demo
            </Link>
            <Link
              href="/ai-assistant"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              See Assistant
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}


