export const dynamic = "force-static";

import { Bot, Building2, MessageCircle, ShieldCheck, Workflow } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
            About Duka Intelligence
          </p>
          <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
            We build governed workspace assistants for growing organizations
          </h1>
          <p className="mt-6 max-w-4xl mx-auto text-lg text-gray-700">
            Duka Intelligence, operated by Akili Data, helps organizations turn
            business systems, documents, communications, and social channels into
            trusted AI assistants teams can use through familiar workflows.
          </p>
        </div>
      </section>

      <section className="px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              icon: Workflow,
              title: "Our Mission",
              text: "Make organizational knowledge easier to retrieve, explain, and act on without exposing raw systems to AI agents.",
            },
            {
              icon: Building2,
              title: "Who We Serve",
              text: "Teams and organizations that need secure workspace assistants shaped around their sector, data, documents, and workflows.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <item.icon className="h-6 w-6 text-orange-600" />
              <h2 className="mt-4 text-2xl font-semibold text-gray-900">{item.title}</h2>
              <p className="mt-3 text-gray-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-900">
            What Makes Us Different
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                icon: Bot,
                title: "Workspace AI Assistant",
                text: "One assistant per workspace, available through chat apps, dashboards, APIs, and embedded workflows.",
              },
              {
                icon: MessageCircle,
                title: "Chat-First Interaction",
                text: "Teams can ask questions, retrieve information, and request approved actions through familiar channels like WhatsApp.",
              },
              {
                icon: Workflow,
                title: "Knowledge Object Processor",
                text: "Raw data, files, and communications are transformed into AI-safe knowledge objects before assistants use them.",
              },
              {
                icon: ShieldCheck,
                title: "Governance Before Answers",
                text: "Access control, citations, freshness, lineage, tenant isolation, and audit context are built into the assistant layer.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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
