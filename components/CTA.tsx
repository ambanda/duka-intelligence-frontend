export default function CTA() {
  return (
    <section className="bg-[#101820] py-24 text-center px-6 text-white">
      <h2 className="mb-6 text-4xl font-semibold">
        Turn scattered knowledge into completed work
      </h2>

      <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-300">
        Duka Intelligence uses AI to understand intent, find trusted answers
        across enterprise knowledge, and help employees complete tasks in the
        tools they already use.
      </p>

      <a
        href="/contact"
        className="inline-block rounded-xl bg-orange-500 px-10 py-4 text-lg font-semibold text-white transition hover:bg-orange-600"
      >
        Book a Demo
      </a>
    </section>
  );
}