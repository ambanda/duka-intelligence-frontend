export const dynamic = "force-static";

import Link from "next/link";
import EmbeddedDashboardPreview from "@/components/EmbeddedDashboardPreview";
import Features from "@/components/Features";
import IntegrationFlow from "@/components/IntegrationFlow";

export default function ProductPage() {
  const embedUrl =
    process.env.NEXT_PUBLIC_PRODUCT_EMBED_URL ??
    "https://dashboard.dukaintelligence.co.ke/?provider_id=kapu&sector=supermarket&shop_id=__default_shop__&role=provider_user&bundle_tier=core&request_id=%3Cuuid%3E&request_signature=%3Csig%3E&service=revenue&period=30d";

  return (
    <main className="px-6 py-20">
      <section className="mx-auto max-w-6xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
            Product Experience
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold text-gray-900 md:text-5xl">
            Launch embedded retail intelligence directly inside your platform
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Automate data ingestion, standardize retail metrics, and deliver
            secure dashboards, insights, and reports through a deployment model
            that fits your product roadmap.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-orange-600"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-6xl">
        <EmbeddedDashboardPreview src={embedUrl} />
      </section>

      <div className="mx-auto max-w-6xl">
        <Features />
      </div>

      <section className="mx-auto max-w-6xl">
        <IntegrationFlow />
      </section>

      <section className="mx-auto max-w-4xl pt-6 text-center md:pt-10">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
          Ready To Launch
        </p>
        <h2 className="mt-4 text-4xl font-bold text-slate-900">
          Bring embedded intelligence to your POS ecosystem without building
          the analytics stack from scratch
        </h2>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          We help platform teams move from raw transaction data to a
          customer-facing intelligence experience that can be embedded on this
          website and extended across partner products.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-base font-semibold text-white transition hover:bg-slate-800"
          >
            Book a Demo
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Discuss Integration
          </Link>
        </div>
      </section>
    </main>
  );
}
