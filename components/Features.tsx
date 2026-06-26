import { Bot, MessageCircle, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Governed Knowledge Objects",
    description:
      "Transform systems, files, messages, and social channels into AI-safe objects with access rules, citations, freshness, and lineage.",
    icon: ShieldCheck,
    bullets: [
      "Access-controlled retrieval",
      "Source-aware answers",
      "Freshness and quality context",
    ],
  },
  {
    title: "Chat App Interaction",
    description:
      "Let teams ask questions, retrieve information, and request approved follow-ups through WhatsApp and familiar chat apps.",
    icon: MessageCircle,
    bullets: [
      "Workspace assistant channel",
      "Allowlisted users",
      "Role-aware answers",
    ],
  },
  {
    title: "Workspace Skills",
    description:
      "Teach assistants safe skills for summaries, explanations, response drafts, task routing, and workflow handoffs.",
    icon: Bot,
    bullets: [
      "Approved task execution",
      "Controlled APIs",
      "Audit-ready activity",
    ],
  },
];

export default function Features() {
  return (
    <section className="py-16 md:py-20">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
          Product Features
        </p>
        <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
          From Raw Information to a Trusted Workspace Assistant
        </h2>
        <p className="mt-5 text-gray-600 max-w-3xl mx-auto">
          Duka creates a governed knowledge layer first, then gives each
          workspace assistant safe ways to retrieve, explain, and act.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <feature.icon className="h-6 w-6" />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-gray-900">
              {feature.title}
            </h3>
            <p className="mt-3 text-gray-600">{feature.description}</p>

            <ul className="mt-6 space-y-2">
              {feature.bullets.map((point) => (
                <li key={point} className="flex items-start gap-2 text-gray-700">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
