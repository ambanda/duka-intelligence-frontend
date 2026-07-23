import { Bot, Database, LockKeyhole, MessageCircle, SearchCheck, Workflow } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    { icon: Database, title: "Unify", description: "Connect enterprise systems, documents, communications, social channels, and APIs." },
    { icon: LockKeyhole, title: "Govern", description: "Create permission-aware knowledge objects with citations, lineage, and freshness." },
    { icon: Bot, title: "Understand", description: "Duka Agents interpret employee intent and identify the right knowledge or action." },
    { icon: SearchCheck, title: "Answer", description: "Retrieve trusted answers with context and source evidence." },
    { icon: Workflow, title: "Act", description: "Recommend next steps and complete approved workflow actions." },
    { icon: MessageCircle, title: "Deliver", description: "Work through WhatsApp, dashboards, APIs, and embedded workflows." },
  ];

  return (
    <section className="bg-[#fbfaf7] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-semibold text-gray-900">
          From intent to completed work
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
          A governed path from enterprise knowledge to trusted answers,
          recommendations, and approved actions.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Step {index + 1}
              </span>
              <step.icon className="mt-5 h-6 w-6 text-orange-600" />
              <h3 className="mt-3 text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-3 text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}