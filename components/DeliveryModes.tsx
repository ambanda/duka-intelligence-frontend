import { Braces, FileText, MessageCircle } from "lucide-react";

export default function DeliveryModes() {
  return (
    <section className="bg-transparent px-6 py-16 md:py-20">
      <h2 className="mb-10 text-center text-3xl font-semibold">
        Delivery Modes
      </h2>

      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <MessageCircle className="h-4 w-4" />
          </span>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            WhatsApp and Chat Apps
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Give employees a familiar point of interaction for trusted answers,
            recommendations, and approved follow-ups.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-600">
            <Braces className="h-4 w-4" />
          </span>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            Knowledge API
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Surface governed enterprise knowledge inside internal apps,
            dashboards, partner systems, and workflow surfaces.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700">
            <FileText className="h-4 w-4" />
          </span>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            Summaries and Workflows
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Create source-backed summaries, task lists, response drafts, and
            workflow handoffs with approval controls.
          </p>
        </div>
      </div>
    </section>
  );
}