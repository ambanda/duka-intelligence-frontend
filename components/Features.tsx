import { Bot, Database, SearchCheck } from "lucide-react";

const features = [
  {
    title: "The Core Platform",
    description:
      "Connect systems, documents, communications, social channels, and APIs into a governed enterprise knowledge layer.",
    icon: Database,
    bullets: ["Structured and unstructured processing", "Knowledge objects", "Access control and lineage"],
  },
  {
    title: "Enterprise Search",
    description:
      "Find trusted answers across organizational knowledge with citations, permissions, freshness, and source context.",
    icon: SearchCheck,
    bullets: ["Cross-tool retrieval", "Source citations", "Permission-aware answers"],
  },
  {
    title: "Duka Agents",
    description:
      "Understand intent, recommend next steps, and complete approved tasks through WhatsApp and existing workflows.",
    icon: Bot,
    bullets: ["Intent understanding", "Recommendations", "Approved actions"],
  },
];

export default function Features() {
  return (
    <section className="py-16 md:py-20">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">
          Product Features
        </p>
        <h2 className="mt-4 text-3xl font-bold text-gray-900 md:text-4xl">
          From Enterprise Knowledge to Job-Done AI
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-gray-600">
          Duka combines a governed knowledge platform with AI agents that help
          employees search, answer, recommend, and act.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <article
            key={feature.title}
            className="rounded-2xl border border-slate-200 bg-white p-7 shadow-card transition hover:shadow-md"
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
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-600" />
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