export const dynamic = "force-static";

import Link from "next/link";
import Features from "@/components/Features";
import ProductEmbedExperience from "@/components/ProductEmbedExperience";

export default function ProductPage() {
  const embedBaseUrl =
    process.env.NEXT_PUBLIC_PRODUCT_EMBED_BASE_URL ??
    "https://dashboard.dukaintelligence.co.ke/";

  return (
    <main className="px-6 py-20">
      <section className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
              Product Experience
            </p>
            <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Launch embedded retail intelligence directly inside your platform
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              Automate data ingestion, standardize retail metrics, and deliver
              secure dashboards, insights, and reports through a deployment
              model that fits your product roadmap.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-orange-600"
              >
                Request a Demo
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Talk to Us About Embedding
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.35)]">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-sky-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">
                  Delivery
                </p>
                <p className="mt-3 text-base font-semibold text-slate-900">
                  iframe today, SDK next
                </p>
              </div>
              <div className="rounded-2xl bg-amber-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
                  Experience
                </p>
                <p className="mt-3 text-base font-semibold text-slate-900">
                  White-label dashboard inside your product
                </p>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-5 sm:col-span-2">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Outcome
                </p>
                <p className="mt-3 text-base font-semibold text-slate-900">
                  Faster launch for analytics, insights, and AI grounded in
                  trusted retail data
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-8 max-w-6xl">
        <ProductEmbedExperience baseUrl={embedBaseUrl} />
      </section>

      <div className="mx-auto max-w-6xl">
        <Features />
      </div>

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
