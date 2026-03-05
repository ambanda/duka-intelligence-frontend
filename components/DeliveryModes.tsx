import { Plug, LayoutDashboard, FileText } from "lucide-react";

export default function DeliveryModes() {
  return (
    <section className="px-6 py-16 md:py-20 bg-transparent">
      <h2 className="text-3xl font-semibold text-center mb-10">
        Delivery Modes
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white/85 p-6 rounded-xl shadow-sm">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-600">
            <Plug className="h-4 w-4" />
          </span>
          <strong className="ml-3">API</strong>
          <br />
          Expose analytics inside your POS
        </div>

        <div className="bg-white/85 p-6 rounded-xl shadow-sm">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-600">
            <LayoutDashboard className="h-4 w-4" />
          </span>
          <strong className="ml-3">Embedded Dashboards</strong>
          <br />
          White-label retail intelligence
        </div>

        <div className="bg-white/85 p-6 rounded-xl shadow-sm">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-50 text-orange-600">
            <FileText className="h-4 w-4" />
          </span>
          <strong className="ml-3">Automated Reports</strong>
          <br />
          Email, WhatsApp
        </div>
      </div>
    </section>
  );
}
