export const dynamic = "force-static";

import { Bot, Building2, Database, MessageCircle, ShieldCheck, Workflow } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="bg-[#101820] px-6 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">
            About Duka Intelligence
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">
            We help organizations turn enterprise knowledge into completed work
          </h1>
          <p className="mt-6 mx-auto max-w-4xl text-lg text-slate-300">
            Duka Intelligence, operated by Akili Data, builds the Core Platform
            that unifies enterprise knowledge and powers Duka Agents that help
            employees find trusted answers and complete tasks in familiar tools.
          </p>
        </div>
      </section>

      <section className="px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              icon: Workflow,
              title: "Our Mission",
              text: "Make enterprise knowledge easier to find, trust, and act on without exposing raw systems directly to AI agents.",
            },
            {
              icon: Building2,
              title: "Who We Serve",
              text: "Organizations that need governed AI for internal teams, external client self-service, operations, enterprise search, social listening, and approved action in daily workflows.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <item.icon className="h-6 w-6 text-orange-600" />
              <h2 className="mt-4 text-2xl font-semibold text-gray-900">{item.title}</h2>
              <p className="mt-3 text-gray-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-semibold text-gray-900">
            What Makes Us Different
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                icon: Database,
                title: "The Core Platform",
                text: "Systems, documents, communications, social channels, and APIs are unified into governed enterprise knowledge.",
              },
              {
                icon: Bot,
                title: "Duka Agents",
                text: "AI agents understand intent, find trusted answers, recommend next steps, and help complete approved tasks.",
              },
              {
                icon: MessageCircle,
                title: "Agents Where People Already Are",
                text: "Duka Agents can be accessed through familiar channels like WhatsApp, so employees and external clients can get help without learning a new system first.",
              },
              {
                icon: ShieldCheck,
                title: "Governance Before Action",
                text: "Access control, citations, freshness, lineage, tenant isolation, and audit context are built into the agent layer.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
                <item.icon className="h-6 w-6 text-orange-600" />
                <h3 className="mt-3 text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}