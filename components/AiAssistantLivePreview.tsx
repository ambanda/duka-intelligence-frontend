import PublicAssistantChat from "@/components/PublicAssistantChat";

export default function AiAssistantLivePreview() {
  return (
    <section className="mx-auto mt-12 max-w-6xl">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
          Live Website Assistant
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-gray-900">
          Talk to Duka the way your users would
        </h2>
        <p className="mt-3 text-gray-600">
          An agile work AI platform with the depth of enterprise AI, the
          simplicity of a WhatsApp text, and the flexibility to serve both
          internal teams and customers.
        </p>
      </div>

      <div className="mt-6">
        <PublicAssistantChat mode="inline" />
      </div>
    </section>
  );
}
