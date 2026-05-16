export const dynamic = "force-static";

export default function IntegrationsPage() {
  return (
    <main className="px-6 py-16 md:py-20">
      <section className="max-w-6xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
          Integrations
        </p>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
          Lightweight Integration for ERP & POS Platforms
        </h1>
      </section>

      <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <article className="rounded-2xl border border-sky-100 bg-gradient-to-br from-sky-50 to-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Connectors</h2>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li>- API</li>
            <li>- CSV</li>
            <li>- Database connectors</li>
          </ul>
        </article>

        <article className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Embedded Delivery</h2>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li>- iframe</li>
            <li>- SDK</li>
            <li>- APIs</li>
          </ul>
        </article>

        <article className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Authentication</h2>
          <ul className="mt-3 space-y-2 text-gray-600">
            <li>- HMAC</li>
            <li>- Signed tokens</li>
            <li>- RBAC</li>
          </ul>
        </article>
      </section>

      <section className="max-w-6xl mx-auto mt-14">
        <h2 className="text-3xl font-semibold text-gray-900">Integration Flow</h2>
        <div className="mt-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            {["Connect Data", "Normalize", "Generate Intelligence", "Embed Delivery"].map((node) => (
              <div key={node} className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4">
                <p className="font-medium text-slate-800">{node}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
