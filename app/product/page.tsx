export const dynamic = "force-static";

import Features from "@/components/Features";

export default function ProductPage() {
  return (
    <main className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <Features />
      </div>

      <section className="max-w-4xl mx-auto pt-6 md:pt-10">
        <h1 className="text-4xl font-bold mb-6">
          Accelerate Retail Intelligence Across Your POS Ecosystem
        </h1>

        <p className="text-gray-700">
          Automate data ingestion, standardize retail metrics, and deliver
          secure APIs, dashboards, and reports without building complex
          infrastructure.
        </p>
      </section>
    </main>
  );
}
