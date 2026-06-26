export const dynamic = "force-static";

import {
  CheckCircle2,
  ClipboardList,
  KeyRound,
  MessageCircle,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import AiAssistantLivePreview from "@/components/AiAssistantLivePreview";

const capabilities = [
  {
    title: "Ask from governed knowledge",
    text: "Teams can retrieve answers from systems, documents, conversations, and approved knowledge objects.",
  },
  {
    title: "Use familiar chat apps",
    text: "Workspace assistants can operate through WhatsApp and other chat channels people already check daily.",
  },
  {
    title: "Execute controlled tasks",
    text: "Assistants can be taught skills for summaries, follow-ups, retrieval, and workflow handoffs within approved limits.",
  },
  {
    title: "Respect access rules",
    text: "Answers and actions are constrained by role, workspace, source permissions, citations, and audit requirements.",
  },
];

const guardrails = [
  "Dedicated workspace assistant channel",
  "Allowlisted and role-aware users",
  "No answer without permission or evidence",
  "Citations and source context",
  "Audit logs for sensitive actions",
  "Safe fallback when context is missing",
];

export default function AiAssistantPage() {
  return (
    <main className="px-6 py-16 md:py-20">
      <section className="max-w-6xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
          Workspace Assistant
        </p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
          A governed assistant your team can reach through chat
        </h1>
        <p className="mt-6 max-w-4xl text-lg text-gray-600">
          Duka gives every workspace a trusted assistant that can answer
          questions, retrieve information, summarize activity, and execute
          approved tasks through WhatsApp, dashboards, APIs, and embedded
          workflows.
        </p>
      </section>

      <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((item, index) => (
          <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {index === 0 ? <CheckCircle2 className="h-6 w-6 text-orange-600" /> : null}
            {index === 1 ? <MessageCircle className="h-6 w-6 text-orange-600" /> : null}
            {index === 2 ? <Workflow className="h-6 w-6 text-orange-600" /> : null}
            {index === 3 ? <ShieldCheck className="h-6 w-6 text-orange-600" /> : null}
            <h2 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">{item.text}</p>
          </article>
        ))}
      </section>

      <AiAssistantLivePreview />

      <section className="max-w-6xl mx-auto mt-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
            Assistant Skills
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-gray-900">
            Teach assistants how to support real work
          </h2>
          <p className="mt-4 text-gray-600">
            Duka assistants are not loose chatbots. They are taught workspace
            and sector skills that run through governed knowledge objects and
            controlled APIs.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Retrieve information",
              "Summarize activity",
              "Explain changes",
              "Prepare follow-ups",
              "Draft responses",
              "Route tasks for approval",
            ].map((skill) => (
              <div key={skill} className="rounded-lg border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-14 rounded-2xl border border-emerald-200 bg-emerald-50 p-7">
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

      <section className="max-w-6xl mx-auto mt-14 text-center">
        <ClipboardList className="mx-auto h-8 w-8 text-orange-600" />
        <h2 className="mt-3 text-3xl font-semibold text-gray-900">
          Give teams a safer way to work with company knowledge
        </h2>
      </section>
    </main>
  );
}
