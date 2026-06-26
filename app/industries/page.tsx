export const dynamic = "force-static";

import {
  BriefcaseBusiness,
  Building2,
  HandCoins,
  MessageCircle,
  Store,
  Utensils,
} from "lucide-react";

const solutions = [
  {
    title: "Financial services workspaces",
    text: "A governed assistant for teams that need trusted answers, portfolio context, follow-ups, and operational summaries.",
    icon: HandCoins,
  },
  {
    title: "Retail and trade workspaces",
    text: "A workspace assistant for store, product, customer, revenue, inventory, and branch operations knowledge.",
    icon: Store,
  },
  {
    title: "Restaurant and service workspaces",
    text: "A chat-accessible assistant for performance, customer feedback, service issues, and daily operating context.",
    icon: Utensils,
  },
  {
    title: "Advisory and professional workspaces",
    text: "A knowledge assistant for client files, deal activity, documents, communications, and team follow-through.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Customer engagement workspaces",
    text: "A safe layer for retrieving conversations, summarizing inquiries, tracking themes, and drafting approved responses.",
    icon: MessageCircle,
  },
  {
    title: "Organization-wide workspaces",
    text: "A broad assistant for leadership, operations, reporting, information retrieval, and internal coordination.",
    icon: Building2,
  },
];

export default function IndustriesPage() {
  return (
    <main className="px-6 py-16 md:py-20">
      <section className="max-w-6xl mx-auto text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
          Solutions
        </p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
          A sector workspace assistant, shaped around how each team works
        </h1>
        <p className="mt-6 max-w-4xl mx-auto text-lg text-gray-600">
          Duka is broad enough for growing organizations, but each assistant is
          configured around the sector, knowledge objects, chat channels, and
          approved skills that matter to the workspace.
        </p>
      </section>

      <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {solutions.map((solution) => (
          <article key={solution.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <solution.icon className="h-6 w-6 text-orange-600" />
            <h2 className="mt-4 text-xl font-semibold text-slate-900">{solution.title}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">{solution.text}</p>
          </article>
        ))}
      </section>

      <section className="max-w-6xl mx-auto mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-7 text-center">
        <h2 className="text-2xl font-semibold text-slate-900">
          Same platform, different workspace skills
        </h2>
        <p className="mt-3 max-w-3xl mx-auto text-slate-600">
          Each sector assistant can retrieve the right information, explain what
          changed, summarize activity, and support follow-up through governed
          knowledge objects and familiar chat apps like WhatsApp.
        </p>
      </section>
    </main>
  );
}
