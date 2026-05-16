export const dynamic = "force-static";

import { Bot, Building2, Database, ShieldCheck, Workflow } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="px-6 bg-gradient-to-br from-amber-50 via-white to-sky-50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
            About Duka Intelligence
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
            We Build AI Business Intelligence for Operational Platforms
          </h1>
          <p className="mt-6 max-w-4xl mx-auto text-lg text-gray-700">
            Duka Intelligence, operated by Akili Data, helps ERP and POS
            platforms move from static reporting to conversational intelligence
            that supports faster and better business decisions.
          </p>
        </div>
      </section>

      <section className="px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: Workflow,
              title: "Our Mission",
              text: "Make operational intelligence accessible to everyday business users without requiring specialist analytics teams.",
              tone: "from-emerald-50 to-white border-emerald-100",
            },
            {
              icon: Building2,
              title: "Who We Serve",
              text: "ERP providers, POS providers, and multi-branch businesses that need embedded intelligence inside day-to-day workflows.",
              tone: "from-sky-50 to-white border-sky-100",
            },
          ].map((item) => (
            <article key={item.title} className={`rounded-2xl border bg-gradient-to-br ${item.tone} p-6 shadow-sm`}>
              <item.icon className="h-6 w-6 text-orange-600" />
              <h2 className="mt-4 text-2xl font-semibold text-gray-900">{item.title}</h2>
              <p className="mt-3 text-gray-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-900">
            What Makes Us Different
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Bot,
                title: "AI Business Intelligence Analyst",
                text: "Natural-language analysis and explanations directly inside operational workflows.",
                tone: "from-amber-50 to-white border-amber-100",
              },
              {
                icon: Database,
                title: "Operational Intelligence Framework",
                text: "Summary, trends, drivers, signals, and AI context in one decision layer.",
                tone: "from-sky-50 to-white border-sky-100",
              },
              {
                icon: Workflow,
                title: "Lightweight Integration",
                text: "Deploy with APIs, CSV sync, and database connectors without rebuilding analytics infrastructure.",
                tone: "from-emerald-50 to-white border-emerald-100",
              },
              {
                icon: ShieldCheck,
                title: "Security and Control",
                text: "Tenant isolation, encrypted data, role-based access control, and secure APIs.",
                tone: "from-slate-100 to-white border-slate-200",
              },
            ].map((item) => (
              <article key={item.title} className={`rounded-2xl border bg-gradient-to-br ${item.tone} p-6 shadow-sm`}>
                <item.icon className="h-6 w-6 text-orange-600" />
                <h3 className="mt-3 text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-gray-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
