export default function DeliveryModes() {
  return (
    <section className="px-6 py-20 bg-gray-50">
      <h2 className="text-3xl font-semibold text-center mb-12">
        Delivery Modes
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          🔌 <strong>API</strong>
          <br />
          Expose analytics inside your POS
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          📊 <strong>Embedded Dashboards</strong>
          <br />
          White-label retail intelligence
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          📄 <strong>Automated Reports</strong>
          <br />
          Email, WhatsApp
        </div>
      </div>
    </section>
  );
}
