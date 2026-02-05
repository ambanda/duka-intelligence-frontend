export default function HowItWorks() {
  const steps = [
    "Ingest – Secure POS-agnostic ingestion",
    "Normalize – ARTS-aligned data model",
    "Analyze – Retail domain metrics",
    "Deliver – APIs, dashboards, reports",
  ];

  return (
    <section className="px-6 py-20">
      <h2 className="text-3xl font-semibold text-center mb-12">
        Designed for POS ecosystems
      </h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-6 text-center">
        {steps.map((step) => (
          <div
            key={step}
            className="p-6 border rounded-lg bg-white"
          >
            {step}
          </div>
        ))}
      </div>
    </section>
  );
}
