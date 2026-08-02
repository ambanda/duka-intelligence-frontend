export const dynamic = "force-static";

import Link from "next/link";

const requestTypes = [
  "Book Demo",
  "Request Quote",
  "Discuss Dedicated Instance",
  "Integration Planning",
];

export default function ContactPage() {
  return (
    <main className="px-6 py-20">
      <section className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-700">
          Contact Duka
        </p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900">
          Build your enterprise knowledge AI plan
        </h1>

        <p className="mt-6 text-gray-700">
          Let us discuss your goals, systems, documents, chat channels,
          social media needs, deployment preference, governance requirements,
          and the Duka Agents your employees need.
        </p>
      </section>

      <section className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-4">
        {requestTypes.map((item) => (
          <div key={item} className="rounded-xl border border-slate-200 bg-white p-4 text-center text-sm font-semibold text-slate-800 shadow-sm">
            {item}
          </div>
        ))}
      </section>

      <section className="mx-auto mt-10 max-w-3xl rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-card">
        <p className="text-lg text-slate-800">
          Email: tsah@dukaintelligence.co.ke
          <br />
          WhatsApp: +254 734 686 211
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link href="/pricing" className="rounded-xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-600">
            Request Quote
          </Link>
          <Link href="/platform" className="rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-900 transition hover:bg-slate-50">
            Explore Platform
          </Link>
        </div>
      </section>
    </main>
  );
}