export const dynamic = "force-static";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Database,
  FileCheck2,
  LockKeyhole,
  MessageCircle,
  Quote,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import WorkspaceAssistantVisual from "@/components/WorkspaceAssistantVisual";

const corePlatform = [
  "Connect every enterprise source",
  "Process structured and unstructured data",
  "Create governed knowledge objects",
  "Enforce access controls and permissions",
  "Unify organizational knowledge",
];

const dukaAgents = [
  "Understand employee or client intent",
  "Search and retrieve trusted knowledge",
  "Answer with context and citations",
  "Recommend next steps",
  "Act through approved skills",
];

const platformCapabilities = [
  "Business systems, databases, and internal tools",
  "Documents, spreadsheets, shared folders, and cloud storage",
  "Emails, chats, WhatsApp, social media, websites, and APIs",
  "Relational processing, unstructured text processing, entity extraction, lineage, and freshness checks",
];

const jobDoneFlow = ["Intent", "Find", "Answer", "Recommend", "Act", "Track"];

const trustPoints = [
  "Agents use governed knowledge, not raw operational access.",
  "Permissions, citations, freshness, lineage, and audit logs are built into the workflow.",
  "Approved skills define what an agent can retrieve, draft, route, or execute.",
];

const deploymentOptions = [
  {
    title: "Managed SaaS",
    text: "The fastest path to launch Duka with managed updates, monitoring, connectors, and platform operations.",
    points: ["Fast rollout", "Managed operations", "Standard governance controls"],
  },
  {
    title: "Dedicated Instance",
    text: "For organizations whose policies require stronger isolation, custom controls, or customer-specific deployment boundaries.",
    points: ["Single-tenant boundary", "Private integration paths", "Custom access controls"],
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="bg-[#101820] px-6 py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-300">
              Core Platform + Duka Agents
            </p>
            <h1 className="mt-4 max-w-5xl text-4xl font-bold text-white md:text-6xl">
              From enterprise knowledge to completed work
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
              Duka Intelligence connects your systems, documents,
              communications, and social channels into a governed knowledge
              platform, then powers Duka Agents that understand intent, find
              trusted answers, recommend next steps, and help employees and
              external clients complete tasks through tools like WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600">
                Book a Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/platform" className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15">
                Explore Platform
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium text-slate-200">
              <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1">Enterprise knowledge AI</span>
              <span className="rounded-full border border-orange-300/30 bg-orange-400/10 px-3 py-1">WhatsApp-ready agents</span>
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1">Internal teams + client self-service</span>
            </div>
          </div>

          <WorkspaceAssistantVisual />
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-700">Two Connected Layers</p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 md:text-4xl">
              The platform brings knowledge together. The agents turn it into outcomes.
            </h2>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-card">
              <Database className="h-7 w-7 text-orange-600" />
              <h3 className="mt-4 text-2xl font-semibold text-slate-900">The Core Platform</h3>
              <p className="mt-3 text-slate-600">
                Connects organizational systems, documents, communications,
                social channels, and APIs, then processes them into a centralized,
                permission-aware knowledge layer.
              </p>
              <div className="mt-5 grid gap-3">
                {corePlatform.map((item) => (
                  <div key={item} className="flex gap-3 text-sm font-medium text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-orange-200 bg-orange-50 p-7 shadow-card">
              <Bot className="h-7 w-7 text-orange-600" />
              <h3 className="mt-4 text-2xl font-semibold text-slate-900">Duka Agents</h3>
              <p className="mt-3 text-slate-700">
                AI-powered assistants that operate on governed knowledge to help
                employees and external clients search, retrieve, understand,
                recommend, and act in the tools they already use.
              </p>
              <div className="mt-5 grid gap-3">
                {dukaAgents.map((item) => (
                  <div key={item} className="flex gap-3 text-sm font-medium text-slate-700">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-700">The Core Platform</p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 md:text-4xl">
              Unify enterprise knowledge without flattening security
            </h2>
            <p className="mt-4 text-gray-600">
              Duka handles connectors, ingestion, relational data processing,
              unstructured document processing, conversation processing, entity
              extraction, knowledge object creation, access control, lineage,
              citations, and tenant isolation.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {platformCapabilities.map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-[#fbfaf7] p-4 text-sm font-medium leading-6 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-700">Duka Agents</p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 md:text-4xl">From intent to job done</h2>
            <p className="mt-4 text-gray-600">
              Duka Agents help people move from a question or request to a
              trusted answer, a recommendation, and an approved action.
            </p>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-6">
            {jobDoneFlow.map((step, index) => (
              <div key={step} className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{index + 1}</p>
                <p className="mt-2 font-semibold text-slate-900">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-slate-200 bg-[#101820] p-6 text-white shadow-card">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <MessageCircle className="h-7 w-7 text-emerald-300" />
                <h3 className="mt-4 text-2xl font-semibold text-white">Work happens where people already are</h3>
                <p className="mt-3 text-slate-300">
                  Duka Agents can work through WhatsApp, dashboards, APIs, and
                  embedded workflows, so employees and external clients can get
                  answers or complete approved requests without learning another
                  system first.
                </p>
              </div>
              <div className="rounded-xl bg-white p-4 text-sm text-slate-800">
                <div className="rounded-xl bg-emerald-50 p-4">
                  <p className="font-semibold text-slate-900">Employee or client</p>
                  <p className="mt-1">What needs attention today?</p>
                </div>
                <div className="mt-4 rounded-xl bg-slate-100 p-4">
                  <p className="font-semibold text-slate-900">Duka Agent</p>
                  <p className="mt-1">
                    I found the right context, cited the sources, and prepared an approved next step for review.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-7 shadow-card">
            <LockKeyhole className="h-7 w-7 text-emerald-700" />
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">Safe by design</h2>
            <p className="mt-4 text-slate-700">
              Duka Agents do not roam raw operational systems. They work through
              governed knowledge objects, approved skills, and controlled actions.
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

          <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-card">
            <Quote className="h-7 w-7 text-orange-600" />
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">Pricing built around your needs</h2>
            <p className="mt-4 text-slate-600">
              Get the best pricing with a customized package that meets your
              needs. Our team will understand your goals and provide a proposal
              that works for you.
            </p>
            <Link href="/pricing" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600">
              Request Quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-700">Deployment Options</p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900">Managed SaaS or dedicated instance</h2>
            <p className="mt-4 text-gray-600">
              Deploy Duka as a fully managed SaaS platform for speed, or as a
              dedicated instance when your governance model requires stronger
              isolation, custom controls, or customer-specific infrastructure
              boundaries.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {deploymentOptions.map((option) => (
              <article key={option.title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-card">
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

      <section className="bg-[#101820] px-6 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <FileCheck2 className="mx-auto h-8 w-8 text-orange-300" />
          <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            Turn scattered knowledge into completed work
          </h2>
          <p className="mt-4 text-slate-300">
            The Core Platform unifies and governs enterprise knowledge. Duka
            Agents turn that knowledge into answers, recommendations, and action.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600">Book a Demo</Link>
            <Link href="/pricing" className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15">Request Quote</Link>
          </div>
        </div>
      </section>
    </main>
  );
}