export default function Hero() {
  return (
    <section className="bg-slate-50 py-16 md:py-20 text-center px-6">
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
        Duka Intelligence
      </h1>

      <p className="mt-5 text-xl text-gray-600 max-w-2xl mx-auto">
        The AI knowledge layer for governed workspace assistants.
      </p>

      <div className="mt-8">
        <a
          href="/contact"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl text-lg font-medium transition"
        >
          Book a Demo
        </a>
      </div>
    </section>
  );
}
