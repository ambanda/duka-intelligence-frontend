export const dynamic = "force-static";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Building2,
  CalendarCheck2,
  CircleDollarSign,
  ClipboardCheck,
  Globe2,
  LockKeyhole,
  MessageCircle,
  ShieldCheck,
  ShoppingBag,
  TicketCheck,
  UserCheck,
  UsersRound,
} from "lucide-react";

import WorkspaceAssistantVisual from "@/components/WorkspaceAssistantVisual";
import {
  dukaWhatsAppChatUrl,
  positioning,
  serviceCentres,
  whatsappReach,
} from "@/lib/brand";

const lifecycle = [
  {
    title: "Discover",
    icon: Globe2,
    text: "Bring people in from websites, QR codes, social profiles, WhatsApp ads, catalogs, campaigns and shared links across WhatsApp and Meta surfaces.",
  },
  {
    title: "Onboard",
    icon: UserCheck,
    text: "Introduce the business, answer approved questions, present relevant offerings, capture details and record the right consent.",
  },
  {
    title: "Self-Serve",
    icon: ShoppingBag,
    text: "Let customers book appointments and tickets, place orders, register lots, set buying preferences, bid, make payments or request help.",
  },
  {
    title: "Operate",
    icon: ClipboardCheck,
    text: "Help authorized staff manage schedules, orders, customer handoffs, collections, enterprise search and daily tasks through WhatsApp.",
  },
  {
    title: "Understand",
    icon: BarChart3,
    text: "Turn customer journeys and connected business data into clear operational, customer and management reports.",
  },
];

const sectors = [
  {
    title: "Clinics and wellness",
    icon: CalendarCheck2,
    text: "Service discovery, appointments, tickets, deposits, reminders, rescheduling and staff schedules.",
  },
  {
    title: "Retail and services",
    icon: ShoppingBag,
    text: "Catalogs, enquiries, orders, merchant collections, customer support and daily operations.",
  },
  {
    title: "Markets and auctions",
    icon: CircleDollarSign,
    text: "Participant registration, inspection, matching, bidding, payment and delivery confirmation.",
  },
  {
    title: "Member organizations",
    icon: UsersRound,
    text: "Product discovery, member self-service, authorized knowledge search and management reporting.",
  },
];

const controls = [
  "Tenant-isolated workspaces and credentials",
  "Role-based customer, staff and administrator access",
  "Consent-aware messages and approved templates",
  "Merchant-owned payment accounts",
  "Auditable workflows and human handoff",
];

export default function HomePage() {
  return (
    <main>
      <section className="bg-[#101820] px-6 pb-12 pt-14 text-white md:pt-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold text-orange-300">
              Built for businesses that run on WhatsApp
            </p>
            <h1 className="mt-4 text-4xl font-bold text-white md:text-6xl">
              Your business assistant on WhatsApp
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {positioning}
            </p>
            <div className="mt-6 inline-flex items-center gap-4 rounded-md border border-white/15 bg-white px-4 py-2.5 text-slate-900 shadow-sm">
              <Image
                src="/meta-tech-provider.png"
                alt="Meta Tech Provider"
                width={980}
                height={553}
                className="h-11 w-auto object-contain"
                priority
              />
              <span className="border-l border-slate-200 pl-4 text-sm font-semibold">
                Approved Meta Tech Provider
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600">
                See Duka in action
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={dukaWhatsAppChatUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-emerald-300/50 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
              <Link href="/platform" className="rounded-lg border border-white/25 px-6 py-3 font-semibold text-white transition hover:bg-white/10">
                How Duka works
              </Link>
            </div>
            <p className="mt-5 text-sm font-medium text-emerald-200">
              Start with one workflow. Add more as your business grows.
            </p>
          </div>

          <div className="mt-12">
            <WorkspaceAssistantVisual />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-orange-700">One business journey</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
              From the first hello to the daily report
            </h2>
            <p className="mt-4 text-slate-600">
              Duka connects how customers find you, what they complete, the work your team performs and the results managers need to see.
            </p>
          </div>

          <ol className="mt-10 grid border-y border-slate-200 md:grid-cols-5">
            {lifecycle.map((item, index) => (
              <li key={item.title} className="border-b border-slate-200 px-4 py-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
                <div className="flex items-center justify-between">
                  <item.icon className="h-6 w-6 text-orange-600" />
                  <span className="text-sm font-semibold text-slate-400">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
              </li>
            ))}
          </ol>

          <p className="mt-6 text-sm text-slate-600">
            {whatsappReach.text}{" "}
            <a href={whatsappReach.sourceUrl} target="_blank" rel="noreferrer" className="font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-4">
              Source: {whatsappReach.sourceLabel}
            </a>
          </p>
        </div>
      </section>

      <section className="bg-[#f2f5f3] px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold text-emerald-800">Adopt at your own pace</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
              Start with the service centre you need now
            </h2>
            <p className="mt-4 text-slate-600">
              Front Desk, Service Desk and Back Office are independently selectable. Activate one useful service centre first, then add another when the business is ready.
            </p>
            <Link href="/pricing" className="mt-6 inline-flex items-center gap-2 font-semibold text-orange-700 hover:text-orange-800">
              Compare service-centre modules
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ol className="divide-y divide-slate-300 border-y border-slate-300">
            {serviceCentres.map((centre, index) => (
              <li key={centre.id} className="grid gap-2 py-5 sm:grid-cols-[80px_150px_1fr] sm:items-start">
                <span className="text-sm font-semibold text-slate-400">Centre {index + 1}</span>
                <span>
                  <strong className="block font-semibold text-slate-900">{centre.name}</strong>
                  <span className="text-xs font-semibold text-orange-700">{centre.capability}</span>
                </span>
                <span className="text-sm leading-6 text-slate-600">{centre.description}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <article className="border-l-4 border-emerald-600 pl-6">
              <MessageCircle className="h-7 w-7 text-emerald-700" />
              <h2 className="mt-4 text-3xl font-semibold text-slate-900">WhatsApp for people</h2>
              <p className="mt-4 text-slate-600">
                Customers discover, register, book, buy, pay and ask for help. Authorized staff receive tasks, search approved business knowledge and manage daily work in a channel they already know.
              </p>
            </article>
            <article className="border-l-4 border-orange-500 pl-6">
              <Building2 className="h-7 w-7 text-orange-600" />
              <h2 className="mt-4 text-3xl font-semibold text-slate-900">Duka Workspace for control</h2>
              <p className="mt-4 text-slate-600">
                Administrators connect WhatsApp accounts, configure services and workflows, manage templates and catalogs, assign staff access, monitor delivery and review business results.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#fbfaf7] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-orange-700">Configured around your work</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900 md:text-4xl">
              One assistant, different business journeys
            </h2>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {sectors.map((sector) => (
              <article key={sector.title} className="rounded-lg border border-slate-200 bg-white p-6">
                <sector.icon className="h-6 w-6 text-orange-600" />
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{sector.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{sector.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-7">
            <Link href="/industries" className="inline-flex items-center gap-2 font-semibold text-orange-700 hover:text-orange-800">
              Explore business journeys
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#12352f] px-6 py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <LockKeyhole className="h-8 w-8 text-emerald-200" />
            <h2 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
              Helpful by design. Controlled by your business.
            </h2>
            <p className="mt-4 text-emerald-50/80">
              Duka works through approved information, roles, skills and workflows. AI helps understand requests and retrieve trusted context; governed services remain responsible for consequential actions.
            </p>
          </div>
          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {controls.map((control) => (
                <li key={control} className="flex items-start gap-3 border-b border-white/15 pb-3 text-sm text-emerald-50">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200" />
                  <span>{control}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <TicketCheck className="mx-auto h-8 w-8 text-orange-600" />
          <h2 className="mt-4 text-3xl font-semibold text-slate-900 md:text-4xl">
            Give your business an assistant that can welcome customers, help your team and explain what happened.
          </h2>
          <p className="mt-4 text-slate-600">Start with one job on WhatsApp, then grow at your own pace.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600">
              See Duka in action
            </Link>
            <Link href="/pricing" className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-50">
              View pricing
            </Link>
            <a href={dukaWhatsAppChatUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-emerald-700 px-6 py-3 font-semibold text-emerald-800 transition hover:bg-emerald-50">
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
