export const dynamic = "force-static";

import Link from "next/link";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";

import { dukaWhatsAppChatUrl, dukaWhatsAppNumber } from "@/lib/brand";

const startingPoints = [
  "Front Desk: connect WhatsApp, onboard customers and route enquiries",
  "Service Desk: launch customer self-service and transactions",
  "Back Office: help authorized staff operate and understand the work",
];

export default function ContactPage() {
  return (
    <main>
      <section className="bg-[#101820] px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold text-orange-300">See Duka in action</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold text-white md:text-5xl">
            Choose one useful journey to start
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-300">
            Tell us how customers reach the business today, what staff need to manage and which result would make the first Duka workflow valuable.
          </p>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">Good starting points</h2>
            <ol className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
              {startingPoints.map((item, index) => (
                <li key={item} className="grid grid-cols-[44px_1fr] items-center py-4 text-slate-700">
                  <span className="text-sm font-semibold text-orange-700">0{index + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
          <aside className="rounded-lg border border-slate-200 bg-[#f2f5f3] p-6">
            <h2 className="text-2xl font-semibold text-slate-900">Talk to Duka Intelligence</h2>
            <a href="mailto:tsah@dukaintelligence.co.ke" className="mt-6 flex items-center gap-3 font-semibold text-slate-900 hover:text-orange-700">
              <Mail className="h-5 w-5 text-orange-600" />
              tsah@dukaintelligence.co.ke
            </a>
            <a href={dukaWhatsAppChatUrl} target="_blank" rel="noreferrer" className="mt-4 flex items-center gap-3 font-semibold text-slate-900 hover:text-emerald-700">
              <MessageCircle className="h-5 w-5 text-emerald-700" />
              {dukaWhatsAppNumber}
            </a>
            <Link href="/pricing" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-3 font-semibold text-white hover:bg-orange-600">
              View pricing
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
