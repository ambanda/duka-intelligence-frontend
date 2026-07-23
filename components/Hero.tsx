export default function Hero() {
  return (
    <section className="bg-[#101820] py-16 px-6 text-center text-white md:py-20">
      <h1 className="text-5xl font-bold text-white md:text-6xl">
        Duka Intelligence
      </h1>

      <p className="mx-auto mt-5 max-w-3xl text-xl text-slate-300">
        The Core Platform unifies enterprise knowledge. Duka Agents turn it into
        trusted answers, recommendations, and completed work.
      </p>

      <div className="mt-8">
        <a
          href="/contact"
          className="inline-block rounded-xl bg-orange-500 px-8 py-4 text-lg font-medium text-white transition hover:bg-orange-600"
        >
          Book a Demo
        </a>
      </div>
    </section>
  );
}