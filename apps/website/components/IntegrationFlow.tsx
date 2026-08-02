const integrationSteps = [
  {
    step: "01",
    title: "Connect",
    description:
      "Connect systems, documents, communications, social channels, and APIs.",
  },
  {
    step: "02",
    title: "Process and Govern",
    description:
      "Turn raw information into governed knowledge objects with permissions, citations, and freshness.",
  },
  {
    step: "03",
    title: "Power Duka Agents",
    description:
      "Help employees find trusted answers, receive recommendations, and complete approved work.",
  },
];

export default function IntegrationFlow() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-700">
        Integration Flow
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {integrationSteps.map((item) => (
          <div key={item.step} className="rounded-xl border border-slate-200 bg-[#fbfaf7] p-5">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
              Step {item.step}
            </span>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}