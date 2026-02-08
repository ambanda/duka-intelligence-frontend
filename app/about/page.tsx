export const dynamic = "force-static";

import {
  Layers,
  Database,
  Handshake,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-sky-50" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />

        <div className="relative max-w-6xl mx-auto py-28 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
            About Us
          </p>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
            Duka Intelligence
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-3xl mx-auto">
            Analytics as a Service for African retail.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto text-center px-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Retailers generate valuable data every day — sales, inventory,
            pricing, and customer behavior — yet most of this data remains
            unused, fragmented, or locked inside POS systems.
          </p>
          <p className="mt-4 text-lg font-medium text-gray-900">
            We exist to change that.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto text-center px-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-100">
            Our Mission
          </div>
          <div className="mt-8 rounded-3xl bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-100 px-8 py-12 text-emerald-950 shadow-sm ring-1 ring-emerald-100">
            <h2 className="text-3xl font-semibold">Make intelligence accessible</h2>
            <p className="mt-6 text-lg text-emerald-900/80">
              To make high-quality retail intelligence accessible, affordable,
              and actionable — without forcing businesses to build complex
              data infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto text-center px-6">
          <h2 className="text-3xl font-semibold text-gray-900">
            What We Do
          </h2>

          <p className="mt-6 text-lg text-gray-600 max-w-4xl mx-auto">
            Duka Intelligence transforms raw POS data into trusted,
            analytics-ready insights that power:
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: BarChart3,
                title: "Embedded Dashboards",
              },
              {
                icon: Database,
                title: "Automated Reports",
              },
              {
                icon: Layers,
                title: "Secure Data APIs",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-white to-amber-50/40 rounded-2xl border border-amber-100/60 shadow-sm hover:shadow-md transition"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100/70 text-amber-700 group-hover:bg-amber-200/70 transition">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

          <p className="mt-10 text-gray-600">
            All delivered through a <span className="font-medium">single integration</span>.
          </p>
        </div>
      </section>

      {/* How We're Different */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-gray-900">
            How We’re Different
          </h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: Layers,
                title: "POS-Agnostic",
                description:
                  "Works seamlessly across multiple POS providers, sectors, and shop formats.",
              },
              {
                icon: Database,
                title: "Built on Retail Standards",
                description:
                  "Our data model follows globally recognized ARTS-aligned retail principles to ensure consistency, accuracy, and scale.",
              },
              {
                icon: Handshake,
                title: "Designed for Partnerships",
                description:
                  "POS providers unlock new revenue streams without investing in data engineering teams or infrastructure.",
              },
              {
                icon: ShieldCheck,
                title: "Privacy & Ownership First",
                description:
                  "POS providers always retain ownership of their data. Access is permission-based, fully transparent with merchants consent via feature opt-ins",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-8 bg-white rounded-2xl border border-gray-200/70 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-4 text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto text-center px-6">
          <h2 className="text-3xl font-semibold text-gray-900">
            Why It Matters
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Retail Intelligence leads to:
          </p>

          <div className="mt-12 space-y-4 text-left max-w-3xl mx-auto">
            <div className="p-6 bg-gradient-to-br from-sky-50 to-white rounded-2xl border border-sky-100 shadow-sm">
              <p className="text-lg font-medium text-gray-900">
                Smarter pricing and inventory decisions
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-100 shadow-sm">
              <p className="text-lg font-medium text-gray-900">
                Improved access to credit and financial services
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-100 shadow-sm">
              <p className="text-lg font-medium text-gray-900">
                Stronger relationships between retailers, suppliers, and
                financial institutions
              </p>
            </div>
          </div>

          <p className="mt-14 text-xl font-semibold text-gray-900">
            Retail intelligence shouldn’t be a luxury — it should be infrastructure.
          </p>
        </div>
      </section>

      {/* Belief */}
      <section className="bg-gray-900 py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-white">
            Our Belief
          </h2>
          <p className="mt-6 text-lg text-gray-300">
            We believe every retailer — from a single shop to a nationwide
            network — deserves access to the same quality of intelligence
            as large enterprises.
          </p>
        </div>
      </section>
    </main>
  );
}
