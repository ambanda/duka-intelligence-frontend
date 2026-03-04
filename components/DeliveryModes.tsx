export default function DeliveryModes() {
  return (
    <section className="py-24 px-6">
      <h2 className="text-3xl font-semibold text-center mb-14">
        Delivery Modes
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
          <div className="text-4xl mb-4">🔌</div>
          <h3 className="font-semibold text-lg mb-2">API</h3>
          <p className="text-gray-600">
            Expose analytics directly inside your POS
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="font-semibold text-lg mb-2">Embedded Dashboards</h3>
          <p className="text-gray-600">
            White-label retail intelligence
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
          <div className="text-4xl mb-4">📄</div>
          <h3 className="font-semibold text-lg mb-2">Automated Reports</h3>
          <p className="text-gray-600">
            Email & WhatsApp delivery
          </p>
        </div>
      </div>
    </section>
  );
}
