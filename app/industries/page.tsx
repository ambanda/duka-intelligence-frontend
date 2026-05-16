export const dynamic = "force-static";

export default function IndustriesPage() {
  return (
    <main className="px-6 py-16 md:py-20">
      <section className="max-w-6xl mx-auto text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
          Industries
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
          Built for Operational Industries
        </h1>
      </section>

      <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Retail Intelligence</h2>
          <p className="mt-3 text-gray-600">
            Broad commerce ecosystem coverage from supermarkets and pharmacies to
            restaurants, wholesalers, and distributors.
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Lending Intelligence</h2>
          <p className="mt-3 text-gray-600">
            Financial operational intelligence for SACCOs, microfinance institutions,
            and digital lenders.
          </p>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">Education Intelligence</h2>
          <p className="mt-3 text-gray-600">
            Institutional operational analytics for schools, colleges, and training institutions.
          </p>
        </article>
      </section>
    </main>
  );
}
