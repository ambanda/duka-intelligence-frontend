export default function HowItWorks() {
  const steps = [
    { icon: "🔌", label: "Ingest", desc: "Secure POS-agnostic ingestion" },
    { icon: "🧩", label: "Normalize", desc: "ARTS-aligned data model" },
    { icon: "📐", label: "Analyze", desc: "Retail domain metrics" },
    { icon: "🚀", label: "Deliver", desc: "APIs, dashboards, reports" },
  ];

  return (
    <section className="py-24 px-6 bg-gray-50">
      <h2 className="text-3xl font-semibold text-center mb-14">
        Designed for POS ecosystems
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map((step) => (
          <div
            key={step.label}
            className="bg-white p-6 rounded-xl shadow-sm text-center"
          >
            <div className="text-3xl mb-4">{step.icon}</div>
            <h4 className="font-semibold mb-2">{step.label}</h4>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

