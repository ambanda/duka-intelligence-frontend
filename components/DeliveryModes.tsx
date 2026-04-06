import { Plug, LayoutDashboard, FileText } from "lucide-react";

export default function DeliveryModes() {
  return (
    <section className="px-6 py-16 md:py-20 bg-transparent">
      <h2 className="text-3xl font-semibold text-center mb-10">
        Delivery Modes
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="p-6 rounded-2xl shadow-sm border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-amber-50">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-600">
            <Plug className="h-4 w-4" />
          </span>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            Analytics API
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Surface trusted retail metrics and insights directly in your POS or
            partner workflows through secure API delivery.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow-sm border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-blue-50">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-sky-600">
            <LayoutDashboard className="h-4 w-4" />
          </span>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            Embedded Intelligence Dashboard
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Bring a secure, white-label intelligence dashboard into your
            product with flexible iframe or SDK delivery.
          </p>
        </div>

        <div className="p-6 rounded-2xl shadow-sm border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <FileText className="h-4 w-4" />
          </span>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">
            Automated Reports
          </h3>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Distribute scheduled performance reports through email and WhatsApp
            to keep teams aligned without manual follow-up.
          </p>
        </div>
      </div>
    </section>
  );
}
