export const dynamic = "force-static";

export default function AiAssistantPage() {
  return (
    <main className="px-6 py-16 md:py-20">
      <section className="max-w-6xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
          AI Assistant
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
          Your Embedded AI Business Intelligence Analyst
        </h1>
        <p className="mt-6 max-w-4xl text-lg text-gray-600">
          Business users should not require BI analyst intermediation for every
          operational question. Duka Intelligence enables natural-language
          exploration of business performance directly within operational workflows.
        </p>
      </section>

      <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Explain Trends", text: "Understand business changes with context-aware explanations." },
          { title: "Detect Signals", text: "Identify risks, anomalies, and emerging patterns early." },
          { title: "Recommend Actions", text: "Get AI-assisted decision support aligned to operational realities." },
          { title: "Conversational Analysis", text: "Ask questions naturally and explore data in real time." },
        ].map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-3 text-sm text-gray-600">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="max-w-6xl mx-auto mt-14">
        <h2 className="text-3xl font-semibold text-gray-900">AI Flow</h2>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            {["Operational Data", "Intelligence Models", "AI Context", "Business Decisions"].map((node) => (
              <div key={node} className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="font-medium text-slate-800">{node}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
