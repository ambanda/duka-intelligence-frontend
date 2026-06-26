import { Download, LockKeyhole, MessageCircle, Shuffle, Sparkles } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Download,
      title: "Connect",
      description: "Bring in systems, documents, email, chat, social channels, and APIs.",
    },
    {
      icon: Shuffle,
      title: "Process",
      description: "Convert raw information into governed knowledge objects.",
    },
    {
      icon: LockKeyhole,
      title: "Govern",
      description: "Apply access control, citations, freshness, lineage, and audit rules.",
    },
    {
      icon: Sparkles,
      title: "Teach",
      description: "Add approved skills for retrieval, summaries, follow-ups, and task handoffs.",
    },
    {
      icon: MessageCircle,
      title: "Assist",
      description: "Deliver answers and actions through WhatsApp, APIs, dashboards, and workflows.",
    },
  ];

  return (
    <section className="px-6 py-16 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-900">
          Designed for governed workspace assistance
        </h2>
        <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
          A controlled path from organizational knowledge to chat-accessible
          answers and approved actions.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Step {index + 1}
              </span>
              <step.icon className="mt-5 h-6 w-6 text-orange-600" />
              <h3 className="mt-3 text-lg font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
