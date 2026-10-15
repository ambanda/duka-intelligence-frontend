export const dynamic = "force-static";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CalendarCheck2,
  ClipboardCheck,
  Headphones,
  MessageCircle,
  SearchCheck,
  ShoppingBag,
  UserCheck,
} from "lucide-react";

const customerJobs = [
  { icon: UserCheck, title: "Register", text: "Provide the information required to start an approved business journey." },
  { icon: CalendarCheck2, title: "Book", text: "Choose a service, ticket, provider, date or time from what the business currently offers." },
  { icon: ShoppingBag, title: "Buy and pay", text: "Review products or services, confirm an order and pay into the merchant's connected account." },
  { icon: Headphones, title: "Get support", text: "Use self-service where possible and move into a tracked human handoff when needed." },
];

const staffJobs = [
  "Ask for today's schedule or work queue",
  "Manage orders, appointments and customer handoffs",
  "Search approved enterprise knowledge",
  "Receive inspection, approval and collection tasks",
  "Review utilization, journey and performance summaries",
];

export default function ProductPage() {
  return (
    <main>
      <section className="bg-[#101820] px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold text-orange-300">The Duka assistant</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold text-white md:text-5xl">
            One assistant for customers, staff and managers
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-300">
            Customers get a guided route to the business. Staff get authorized tools and knowledge. Managers get a connected view of work and outcomes.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center gap-3">
            <MessageCircle className="h-7 w-7 text-emerald-700" />
            <h2 className="text-3xl font-semibold text-slate-900">Customer self-service on WhatsApp</h2>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {customerJobs.map((job) => (
              <article key={job.title} className="rounded-lg border border-slate-200 p-5">
                <job.icon className="h-6 w-6 text-orange-600" />
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{job.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{job.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f2f5f3] px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <ClipboardCheck className="h-7 w-7 text-orange-600" />
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">Staff operations through WhatsApp</h2>
            <p className="mt-4 text-slate-600">
              A staff member sees only the business knowledge and actions allowed by their tenant, workspace, shop and role.
            </p>
          </div>
          <ul className="divide-y divide-slate-300 border-y border-slate-300">
            {staffJobs.map((job) => (
              <li key={job} className="flex items-start gap-3 py-4 text-sm text-slate-700">
                <SearchCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                {job}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <article className="border-l-4 border-orange-500 pl-6">
            <Bot className="h-7 w-7 text-orange-600" />
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">AI where interpretation helps</h2>
            <p className="mt-4 text-slate-600">Duka can understand natural-language intent, find approved context, summarize evidence and explain the next step.</p>
          </article>
          <article className="border-l-4 border-emerald-600 pl-6">
            <BarChart3 className="h-7 w-7 text-emerald-700" />
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">Workflows where correctness matters</h2>
            <p className="mt-4 text-slate-600">Business services validate identity, availability, prices, payment evidence, approvals and state changes before an action completes.</p>
          </article>
        </div>
      </section>

      <section className="bg-[#12352f] px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-semibold text-white">Choose the first job your Duka assistant should complete</h2>
          <p className="mt-4 text-emerald-50/80">Begin with discovery, booking, ordering, staff search or another focused journey.</p>
          <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600">
            See Duka in action
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
