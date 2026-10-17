export const dynamic = "force-static";

import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  ClipboardCheck,
  MessageCircle,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import { positioning, serviceCentres } from "@/lib/brand";

const centreIcons = [MessageCircle, Workflow, ClipboardCheck];

export default function AboutPage() {
  return (
    <main>
      <section className="bg-[#101820] px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold text-orange-300">About Duka Intelligence</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold text-white md:text-5xl">
            Every business deserves a capable assistant
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-slate-300">{positioning}</p>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-orange-700">One assistant across the business</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">Start at the Front Desk. Extend to service and operations.</h2>
            <p className="mt-4 text-lg text-slate-700">
              Duka Intelligence connects the places where customers arrive, requests are completed and staff coordinate work. Each service centre can be activated independently around the business&apos;s immediate need.
            </p>
          </div>
          <div className="mt-9 grid border-y border-slate-200 md:grid-cols-3">
            {serviceCentres.map((centre, index) => {
              const CentreIcon = centreIcons[index];

              return (
                <article key={centre.id} className="border-b border-slate-200 px-5 py-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                  <CentreIcon className="h-6 w-6 text-orange-600" />
                  <p className="mt-5 text-sm font-semibold text-emerald-800">{centre.capability}</p>
                  <h3 className="mt-1 text-xl font-semibold text-slate-900">{centre.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{centre.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#f2f5f3] px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {[
            { icon: MessageCircle, title: "Meet people where they are", text: "Use WhatsApp as the familiar front door for discovery, self-service, support and staff operations." },
            { icon: Workflow, title: "Turn conversation into work", text: "Connect intent to approved services, workflows, handoffs, collections and business outcomes." },
            { icon: ShieldCheck, title: "Keep the business in control", text: "Respect tenant ownership, identity, roles, consent, payment accounts and auditable actions." },
            { icon: BarChart3, title: "Make activity understandable", text: "Turn customer journeys and connected operating data into useful reports and decisions." },
          ].map((item) => (
            <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-6">
              <item.icon className="h-6 w-6 text-orange-600" />
              <h2 className="mt-4 text-xl font-semibold text-slate-900">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <Building2 className="mx-auto h-8 w-8 text-emerald-700" />
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">Built by Akili Data for practical business use</h2>
          <p className="mt-4 text-slate-600">Start with one customer or staff journey, prove the value and expand at the pace the business can support.</p>
          <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600">
            Talk to our team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
