import { Bot, LayoutDashboard, Lightbulb } from "lucide-react";

const features = [
  {
    title: "Intelligence Dashboard",
    description:
      "Track core retail KPIs across stores, categories, and time in one unified view.",
    icon: LayoutDashboard,
    bullets: [
      "Real-time performance monitoring",
      "Cross-branch comparisons",
      "Export-ready reporting",
    ],
    iconBg: "bg-sky-100 text-sky-700",
    cardBg: "from-sky-50 to-white border-sky-100",
  },
  {
    title: "Intelligent Insights",
    description:
      "Turn normalized POS data into clear signals on what changed, why it changed, and where to act.",
    icon: Lightbulb,
    bullets: [
      "Trend and anomaly detection",
      "Category and SKU performance intelligence",
      "Decision-ready recommendations",
    ],
    iconBg: "bg-amber-100 text-amber-700",
    cardBg: "from-amber-50 to-white border-amber-100",
  },
  {
    title: "DukaAI Assistant",
    description:
      "Ask retail questions in plain language and get instant answers grounded in your trusted data model.",
    icon: Bot,
    bullets: [
      "Natural language analytics",
      "Fast root-cause exploration",
      "Guided next-best actions",
    ],
    iconBg: "bg-emerald-100 text-emerald-700",
    cardBg: "from-emerald-50 to-white border-emerald-100",
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
          From Raw POS Data to Actionable Retail Intelligence
        </h2>
        <p className="mt-5 text-gray-600 max-w-3xl mx-auto">
          One integration gives your ecosystem live dashboards, intelligent
          insights, and an AI assistant built on our retail data model.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <article
            key={feature.title}
            className={`rounded-2xl border bg-gradient-to-br ${feature.cardBg} p-7 shadow-sm transition hover:shadow-md`}
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${feature.iconBg}`}
            >
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
