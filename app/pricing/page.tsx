export const dynamic = "force-static";

import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageCircle, Server, ShieldCheck, Sparkles } from "lucide-react";

const included = [
  "Managed SaaS or Dedicated Instance planning",
  "Workspace assistant and Duka Agent setup",
  "Connector and integration planning",
  "Knowledge source onboarding",
  "Governance and access configuration",
  "Duka Agent skill configuration",
  "Pilot-to-production rollout support",
  "Quote aligned to your goals, scope, and deployment needs",
];

export default function PricingPage() {
  return (
    <main className="px-6 py-16 md:py-20">
      <section className="mx-auto max-w-6xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-700">
          Pricing
        </p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
          Pricing built around your organization&apos;s needs
        </h1>
        <p className="mt-6 mx-auto max-w-4xl text-lg text-gray-600">
          Get the best pricing with a customized package that meets your goals.
          Our team will understand your use case, deployment preference,
          integrations, and governance needs, then provide a proposal that works
          for you.
        </p>
      </section>

      <section className="mx-auto mt-12 grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <article className="rounded-2xl border border-orange-200 bg-orange-50 p-8 shadow-card">
          <Sparkles className="h-8 w-8 text-orange-600" />
          <h2 className="mt-5 text-3xl font-semibold text-slate-900">
            Custom Package
          </h2>
          <p className="mt-4 text-slate-700">
            A tailored package for your Core Platform, Duka Agents, knowledge
            sources, deployment model, and rollout plan.
          </p>
          <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600">
            Request Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card">
          <h2 className="text-2xl font-semibold text-slate-900">What your proposal can include</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {included.map((item) => (
              <div key={item} className="flex gap-3 rounded-lg bg-[#fbfaf7] p-3 text-sm font-medium text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
        {[
          { icon: MessageCircle, title: "Start with a focused workspace", text: "Pilot one team, one channel, and a high-value knowledge set." },
          { icon: ShieldCheck, title: "Match your governance model", text: "Choose managed SaaS or a dedicated instance based on policy and risk posture." },
          { icon: Server, title: "Scale with integrations", text: "Expand into deeper systems, more agents, and approved workflows in phases." },
        ].map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <item.icon className="h-6 w-6 text-orange-600" />
            <h2 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">{item.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}