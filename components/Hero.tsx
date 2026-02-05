export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-28 text-center px-6">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
        Duka Intelligence
      </h1>

      <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
        The intelligence layer for African retail.
      </p>

      <div className="mt-10">
        <a
          href="/contact"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-medium transition"
        >
          Talk to Us
        </a>
      </div>
    </section>
  );
}

