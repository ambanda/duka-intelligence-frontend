export const dynamic = "force-static";

import Link from "next/link";

export default function PlatformPage() {
  const framework = [
    { title: "Summary", text: "Business health overview across locations, products, and operations." },
    { title: "Trends", text: "Performance over time with clear directional context." },
    { title: "Drivers", text: "Factors that influence outcomes and explain performance shifts." },
    { title: "Signals", text: "Risk and opportunity indicators for proactive intervention." },
    { title: "AI Context", text: "Natural-language interpretation and recommendations for decision-makers." },
  ];

  return (
    <main className="px-6 py-16 md:py-20">
      <section className="max-w-6xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
          Platform
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
          Operational Intelligence Platform for ERP & POS Ecosystems
        </h1>
        <p className="mt-6 max-w-4xl text-lg text-gray-600">
          Connect, process, analyze, explain, and decide through one embedded
          intelligence platform built for business users and platform teams.
        </p>
      </section>

      <section className="max-w-6xl mx-auto mt-12">
        <h2 className="text-3xl font-semibold text-gray-900">Platform Overview</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-3">
          {["Connect", "Process", "Analyze", "Explain", "Decide"].map((step) => (
            <div key={step} className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
              <p className="font-medium text-slate-800">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-14">
        <h2 className="text-3xl font-semibold text-gray-900">Intelligence Framework</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {framework.map((item) => (
            <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-3 text-sm text-gray-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-14">
        <h2 className="text-3xl font-semibold text-gray-900">Architecture</h2>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            {["Connectors", "Intelligence Engine", "AI Layer", "Embedded Delivery"].map((node) => (
              <div key={node} className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="font-medium text-slate-800">{node}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-14 text-center">
        <Link href="/contact" className="inline-flex rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 transition">
          Book Demo
        </Link>
      </section>
    </main>
  );
}
