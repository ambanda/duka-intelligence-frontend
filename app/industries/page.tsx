export const dynamic = "force-static";

import {
  BarChart3,
  CheckCircle2,
  MessageCircle,
  SearchCheck,
  Share2,
  UsersRound,
  Workflow,
} from "lucide-react";

const solutions = [
  {
    title: "Operational Knowledge",
    text: "Dashboard-style outcomes for daily managerial outlay: what needs attention, what changed, what is at risk, and which follow-ups matter.",
    icon: BarChart3,
    points: ["Daily summaries", "Operational risks", "Performance movement", "Follow-up lists"],
  },
  {
    title: "Enterprise Search",
    text: "Search across systems, documents, emails, chats, folders, APIs, and governed knowledge objects with permission-aware answers.",
    icon: SearchCheck,
    points: ["Trusted retrieval", "Source citations", "Access-aware answers", "Cross-tool search"],
  },
  {
    title: "Social Media Listening",
    text: "Bring customer-facing channels into the knowledge layer for inquiry retrieval, complaint summaries, engagement themes, and response context.",
    icon: Share2,
    points: ["Complaint summaries", "Campaign feedback", "Lead intelligence", "Response drafting"],
  },
  {
    title: "AI For Action",
    text: "Move beyond answers. Duka Agents recommend next steps, prepare tasks, draft responses, trigger approved workflows, and route approvals.",
    icon: Workflow,
    points: ["Next-step recommendations", "Task preparation", "Workflow triggers", "Outcome tracking"],
  },
  {
    title: "Client Self-Service",
    text: "Serve external clients through WhatsApp and other familiar channels with governed answers, guided support, inquiry retrieval, and approved handoffs.",
    icon: UsersRound,
    points: ["WhatsApp self-service", "Client FAQs", "Guided support", "Human handoff"],
  },
];

export default function IndustriesPage() {
  return (
    <main className="px-6 py-16 md:py-20">
      <section className="mx-auto max-w-6xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-700">
          Solutions
        </p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
          Practical AI solutions for knowledge, operations, and action
        </h1>
        <p className="mt-6 mx-auto max-w-4xl text-lg text-gray-600">
          Duka Intelligence helps organizations unify knowledge, find trusted
          answers, listen across customer channels, serve external clients, and
          use AI to complete work through governed Duka Agents.
        </p>
      </section>

      <section className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
        {solutions.map((solution) => (
          <article key={solution.title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-card">
            <solution.icon className="h-7 w-7 text-orange-600" />
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">{solution.title}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">{solution.text}</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {solution.points.map((point) => (
                <div key={point} className="flex gap-2 rounded-lg bg-[#fbfaf7] px-3 py-2 text-sm font-medium text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-14 rounded-2xl border border-emerald-200 bg-emerald-50 p-7 text-center max-w-6xl shadow-card">
        <MessageCircle className="mx-auto h-8 w-8 text-emerald-700" />
        <h2 className="mt-3 text-2xl font-semibold text-slate-900">
          Delivered through the tools teams already use
        </h2>
        <p className="mt-3 mx-auto max-w-3xl text-slate-700">
          Whether the need is operational visibility, enterprise search, social
          listening, AI-assisted action, or external client self-service, Duka
          Agents can work through familiar channels like WhatsApp, dashboards,
          APIs, and embedded workflows.
        </p>
      </section>
    </main>
  );
}