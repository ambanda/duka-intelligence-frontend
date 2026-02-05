import {
  Download,
  Shuffle,
  BarChart3,
  Rocket,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Download,
      title: "Ingest",
      description: "Secure POS-agnostic ingestion",
      accent: "from-orange-500/15 to-transparent",
    },
    {
      icon: Shuffle,
      title: "Normalize",
      description: "ARTS-aligned data model",
      accent: "from-emerald-500/15 to-transparent",
    },
    {
      icon: BarChart3,
      title: "Analyze",
      description: "Retail domain metrics",
      accent: "from-blue-500/15 to-transparent",
    },
    {
      icon: Rocket,
      title: "Deliver",
      description: "APIs, dashboards, reports",
      accent: "from-amber-500/15 to-transparent",
    },
  ];

  return (
    <section className="px-6 py-16 md:py-20 bg-gradient-to-b from-transparent to-sky-50/60">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-900">
          Designed for POS ecosystems
        </h2>
        <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
          A clean, four-step pipeline that turns raw POS data into
          decision-ready intelligence.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative overflow-hidden rounded-2xl border bg-white/85 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${step.accent}`}
                aria-hidden="true"
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-orange-600">
                    Step {index + 1}
                  </span>
                  <span className="text-xs uppercase tracking-widest text-gray-400">
                    {step.title}
                  </span>
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-orange-600 shadow-sm"
                    aria-hidden="true"
                  >
                    <step.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  {step.description}
                </p>
                <div className="mt-6 h-1 w-12 rounded-full bg-orange-500/80" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
