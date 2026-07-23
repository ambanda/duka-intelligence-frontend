export const dynamic = "force-static";

import {
  BadgeCheck,
  Bot,
  CheckCircle2,
  ClipboardList,
  KeyRound,
  MessageCircle,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import AiAssistantLivePreview from "@/components/AiAssistantLivePreview";

const capabilities = [
  {
    title: "Understand intent",
    text: "Employees ask in natural language. Duka Agents interpret the request and identify the knowledge or action needed.",
    icon: Sparkles,
  },
  {
    title: "Find trusted answers",
    text: "Agents search governed enterprise knowledge across systems, documents, communications, and channels.",
    icon: SearchCheck,
  },
  {
    title: "Recommend next steps",
    text: "Agents can summarize context, explain what changed, and recommend practical next steps.",
    icon: BadgeCheck,
  },
  {
    title: "Complete approved tasks",
    text: "Agents can draft responses, prepare follow-ups, trigger workflows, and route items for approval.",
    icon: Workflow,
  },
];

const flow = ["Intent", "Trusted Answer", "Recommendation", "Approved Action", "Job Done"];

const skills = [
  "Search organizational knowledge",
  "Retrieve relevant information",
  "Answer with context and citations",
  "Summarize activity",
  "Explain what changed",
  "Prepare follow-up lists",
  "Draft responses",
  "Trigger approved workflows",
  "Escalate for human approval",
];

const guardrails = [
  "Dedicated workspace agent channel",
  "Allowlisted and role-aware users",
  "No answer without permission or evidence",
  "Citations and source context",
  "Audit logs for sensitive actions",
  "Safe fallback when context is missing",
];

export default function AiAssistantPage() {
  return (
    <main className="px-6 py-16 md:py-20">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-700">
          Duka Agents
        </p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
          AI agents that help employees move from intent to job done
        </h1>
        <p className="mt-6 max-w-4xl text-lg text-gray-600">
          Duka Agents understand intent, find trusted answers across governed
          enterprise knowledge, recommend next steps, and help employees complete
          approved tasks in the tools they already use, including WhatsApp.
        </p>
      </section>

      <section className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <item.icon className="h-6 w-6 text-orange-600" />
            <h2 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-14 max-w-6xl">
        <h2 className="text-3xl font-semibold text-gray-900">From search to answer to job done</h2>
        <div className="mt-6 grid gap-3 md:grid-cols-5">
          {flow.map((item, index) => (
            <div key={item} className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{index + 1}</p>
              <p className="mt-2 font-semibold text-slate-900">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <AiAssistantLivePreview />

      <section className="mx-auto mt-14 grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-700">
            Agent Skills
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-gray-900">
            Useful assistance, bounded by approved skills
          </h2>
          <p className="mt-4 text-gray-600">
            Duka Agents do not act freely across raw company systems. They work
            through governed knowledge objects, approved skills, and controlled
            workflows.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <div key={skill} className="rounded-lg border border-slate-200 bg-[#fbfaf7] p-4 text-sm font-medium text-slate-700">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 rounded-2xl border border-emerald-200 bg-emerald-50 p-7 max-w-6xl shadow-card">
        <div className="flex items-start gap-4">
          <KeyRound className="mt-1 h-7 w-7 shrink-0 text-emerald-700" />
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Guardrails come before answers
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {guardrails.map((item) => (
                <div key={item} className="rounded-lg bg-white px-4 py-3 text-sm font-medium text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-14 text-center max-w-6xl">
        <ClipboardList className="mx-auto h-8 w-8 text-orange-600" />
        <h2 className="mt-3 text-3xl font-semibold text-gray-900">
          Give employees an AI agent that can find answers and finish work
        </h2>
      </section>
    </main>
  );
}