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
      <section className="max-w-6xl mx-auto py-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Duka Intelligence
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
          Analytics as a Service for African retail.
        </p>
      </section>

      {/* Who We Are */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto text-center">
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
      <section className="max-w-5xl mx-auto py-20 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">
          Our Mission
        </h2>
        <p className="mt-6 text-lg text-gray-600">
          To make high-quality retail intelligence accessible, affordable,
          and actionable — without forcing businesses to build complex
          data infrastructure.
        </p>
      </section>

      {/* What We Do */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-900">
            What We Do
          </h2>

          <p className="mt-6 text-lg text-gray-600 max-w-4xl mx-auto">
            Duka Intelligence transforms raw POS data into trusted,
            analytics-ready insights that power:
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className="p-8 bg-white rounded-xl shadow-sm"
              >
                <item.icon className="h-10 w-10 mx-auto text-orange-500" />
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
      <section className="max-w-6xl mx-auto py-24">
        <h2 className="text-3xl font-semibold text-center text-gray-900">
          How We’re Different
        </h2>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
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
              className="p-8 border rounded-xl hover:shadow-md transition"
            >
              <item.icon className="h-8 w-8 text-orange-500" />
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {item.title}
              </h3>
              <p className="mt-2 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

            {/* Why It Matters */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-900">
            Why It Matters
          </h2>

          <p className="mt-6 text-lg text-gray-600">
            Retail Intelligence leads to:
          </p>

          <div className="mt-12 space-y-6 text-left max-w-3xl mx-auto">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <p className="text-lg font-medium text-gray-900">
                Smarter pricing and inventory decisions
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm">
              <p className="text-lg font-medium text-gray-900">
                Improved access to credit and financial services
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-sm">
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
        <div className="max-w-4xl mx-auto">
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
