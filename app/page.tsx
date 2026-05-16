export const dynamic = "force-static";

import Link from "next/link";
import {
  Bot,
  ChartLine,
  Database,
  GraduationCap,
  HandCoins,
  MessagesSquare,
  MonitorCog,
  ShieldCheck,
  Sparkles,
  Store,
  Workflow,
} from "lucide-react";

export default function HomePage() {
  const transformation = [
    "Operational Systems",
    "Intelligence Engine",
    "AI Assistant",
    "Faster Business Decisions",
  ];

  const traditional = [
    "Predefined dashboards",
    "Static reporting",
    "Delayed insights",
    "Analyst dependency",
    "Limited business exploration",
  ];

  const dukaApproach = [
    "Natural-language analysis",
    "AI-assisted reasoning",
    "Dynamic business exploration",
    "Embedded operational insights",
    "Decision support in real time",
  ];

  return (
    <main>
      <section className="px-6 py-16 md:py-20 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
            AI Business Intelligence
          </p>
          <h1 className="mt-4 max-w-5xl text-4xl md:text-5xl font-bold text-gray-900">
            AI-Powered Business Intelligence for ERP & POS Platforms
          </h1>
          <p className="mt-6 max-w-4xl text-lg leading-8 text-gray-600">
            Enable business users to analyze data directly, understand
            operational performance, and make faster decisions through
            AI-powered conversational intelligence embedded inside ERP and POS
            workflows.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/platform" className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 transition">
              Explore Platform
            </Link>
            <Link href="/contact" className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-50 transition">
              Book Demo
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-4">
            {transformation.map((item, index) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
                <p className="text-sm font-medium text-slate-700">{item}</p>
                {index < transformation.length - 1 ? (
                  <p className="mt-2 text-xs uppercase tracking-widest text-orange-500">Next</p>
                ) : (
                  <p className="mt-2 text-xs uppercase tracking-widest text-emerald-600">Outcome</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-900">
            From Static Reports to Conversational Intelligence
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Report-Centric Analytics</h3>
              <ul className="mt-4 space-y-2 text-gray-600">
                {traditional.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-7 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">AI-Powered Decision Intelligence</h3>
              <ul className="mt-4 space-y-2 text-gray-700">
                {dukaApproach.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-900">Core Value</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Bot,
                title: "AI Business Intelligence Analyst",
                text: "Ask business questions naturally and receive contextual insights, explanations, and recommendations instantly.",
              },
              {
                icon: ChartLine,
                title: "Operational Intelligence",
                text: "Monitor revenue, products, inventory, operational efficiency, and demand patterns across business workflows.",
              },
              {
                icon: MonitorCog,
                title: "Embedded Inside Workflows",
                text: "Deliver intelligence directly within ERP and POS systems using iframe, SDK, or APIs.",
              },
              {
                icon: Workflow,
                title: "Easy Integration",
                text: "Connect using APIs, CSV sync, or database connectors without building separate analytics infrastructure.",
              },
            ].map((card) => (
              <article key={card.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <card.icon className="h-6 w-6 text-orange-600" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-3 text-sm text-gray-600">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">
              Business Intelligence That Understands Context
            </h2>
            <ul className="mt-6 space-y-3 text-gray-700">
              <li>Why did sales decline this week?</li>
              <li>Which products are driving profitability?</li>
              <li>What operational risks should I monitor?</li>
              <li>What branches are underperforming?</li>
            </ul>
            <p className="mt-6 text-gray-600">
              Data science capabilities once reserved for specialists are now
              embedded directly into the workflows of everyday business users.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              AI Assistant Preview
            </p>
            <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-medium">You:</p>
              <p>Why did sales decline this week?</p>
            </div>
            <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-slate-700">
              <p className="font-medium">Duka AI:</p>
              <p>
                Sales declined 8.4% week-over-week, mainly from lower beverage
                volume in 3 branches. Stock-out events and reduced weekend footfall
                are the top drivers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-900">
            Built for Operational Industries
          </h2>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Store,
                title: "Retail Intelligence",
                covers: "Supermarkets, pharmacies, restaurants, hardware, appliance stores, wholesalers, distributors",
                areas: "Sales performance, inventory movement, product intelligence, operational efficiency, demand forecasting",
              },
              {
                icon: HandCoins,
                title: "Lending Intelligence",
                covers: "SACCOs, microfinance institutions, digital lenders",
                areas: "Portfolio monitoring, repayment trends, branch performance, delinquency signals, operational risk indicators",
              },
              {
                icon: GraduationCap,
                title: "Education Intelligence",
                covers: "Schools, colleges, training institutions",
                areas: "Fee collection trends, enrollment patterns, operational monitoring, financial performance, institutional analytics",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <item.icon className="h-6 w-6 text-orange-600" />
                <h3 className="mt-3 text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm text-gray-600"><strong>Covers:</strong> {item.covers}</p>
                <p className="mt-3 text-sm text-gray-600"><strong>Intelligence Areas:</strong> {item.areas}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-900">How It Works</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Database, title: "Connect", text: "APIs, CSV sync, database connectors." },
              { icon: Sparkles, title: "Generate Intelligence", text: "AI-powered operational analysis." },
              { icon: MessagesSquare, title: "Deliver Insights", text: "Embedded dashboards and conversational AI assistant." },
            ].map((step, index) => (
              <article key={step.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Step {index + 1}</p>
                <step.icon className="mt-3 h-6 w-6 text-orange-600" />
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-900">
            Enable AI Intelligence Without Building Analytics Infrastructure
          </h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "New Revenue Streams",
                text: "Launch intelligence subscriptions and premium analytics offerings.",
              },
              {
                title: "Merchant Retention",
                text: "Increase customer engagement through embedded intelligence.",
              },
              {
                title: "Fast Integration",
                text: "Deploy using lightweight connectors and embedded delivery.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="max-w-6xl mx-auto rounded-2xl border border-slate-200 bg-white p-6 flex flex-wrap items-center justify-center gap-5 text-sm font-semibold text-slate-700">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Tenant Isolation</span>
          <span>Encrypted Data</span>
          <span>Role-Based Access</span>
          <span>Secure APIs</span>
        </div>
      </section>

      <section className="px-6 py-16 text-center bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            Bring AI-Powered Intelligence Into Your Business Platform
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 transition">
              Book Demo
            </Link>
            <Link href="/contact" className="rounded-xl border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10 transition">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
