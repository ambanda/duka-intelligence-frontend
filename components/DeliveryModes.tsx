import { Braces, FileText, MessageCircle } from "lucide-react";

export default function DeliveryModes() {
  return (
    <section className="px-6 py-16 md:py-20 bg-transparent">
      <h2 className="text-3xl font-semibold text-center mb-10">
        Delivery Modes
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="p-6 rounded-2xl shadow-sm border border-orange-100 bg-white">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-600">
            <MessageCircle className="h-4 w-4" />
          </span>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            WhatsApp and Chat Apps
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Give teams a familiar point of interaction for answers, summaries,
            retrieval, and approved follow-ups.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow-sm border border-sky-100 bg-white">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-sky-600">
            <Braces className="h-4 w-4" />
          </span>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            Knowledge API
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Surface governed knowledge objects inside internal apps, partner
            systems, dashboards, and embedded workflows.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow-sm border border-emerald-100 bg-white">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
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
