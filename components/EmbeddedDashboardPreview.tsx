type EmbeddedDashboardPreviewProps = {
  src?: string;
};

const integrationSteps = [
  {
    step: "01",
    title: "Connect Data",
    description:
      "Ingest POS data into the Duka Intelligence model to power trusted retail analytics.",
  },
  {
    step: "02",
    title: "Configure Experience",
    description:
      "Apply branding, access controls, and tenant settings for your product environment.",
  },
  {
    step: "03",
    title: "Launch Embedded Intelligence",
    description:
      "Deliver the dashboard through iframe embedding today and extend with SDK workflows as needed.",
  },
];

const deliveryOptions = [
  {
    title: "Embed with iframe",
    description:
      "Launch a production-ready intelligence surface quickly inside your existing application shell.",
  },
  {
    title: "Integrate with SDK",
    description:
      "Use SDK-based delivery when you need tighter product control and deeper UI integration.",
  },
  {
    title: "Extend with API",
    description:
      "Expose analytics, insights, and downstream actions to adjacent systems and partner workflows.",
  },
];

export default function EmbeddedDashboardPreview({
  src,
}: EmbeddedDashboardPreviewProps) {
  const hasEmbed = Boolean(src);

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-sky-50 p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)] md:p-8">
      <div className="flex flex-col gap-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
              Live Product Preview
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
              See the embedded intelligence dashboard inside a real product
              experience
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
              The same intelligence layer can be delivered directly inside your
              platform, giving customers dashboards, insights, and guided
              actions without sending them to a separate tool.
            </p>
          </div>

          <div className="grid gap-3 rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-2 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                Embedded via iframe or SDK
              </span>
            </div>
            <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                Secure white-label deployment
              </div>
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                Designed for POS ecosystems
              </div>
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                Dashboards, insights, and AI
              </div>
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                Production-ready integration path
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_20px_60px_-36px_rgba(15,23,42,0.45)]">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-950 px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="ml-3 text-sm font-medium text-slate-200">
                Duka Intelligence Embedded Dashboard
              </span>
            </div>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-200">
              Live Preview
            </span>
          </div>

          {hasEmbed ? (
            <div className="bg-slate-100">
              <iframe
                src={src}
                title="Duka Intelligence embedded dashboard preview"
                className="h-[720px] w-full border-0"
                loading="lazy"
                allow="fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          ) : (
            <div className="grid min-h-[720px] place-items-center bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),transparent_35%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] px-6 py-16 text-center">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
                  Embed Source Needed
                </p>
                <h3 className="mt-4 text-3xl font-bold text-slate-900">
                  Configure the iframe URL to render the live dashboard on this
                  page
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  Set <code>NEXT_PUBLIC_PRODUCT_EMBED_URL</code> in your
                  environment to load the real embedded dashboard here. Until
                  then, this section is ready for the live integration but shows
                  a polished placeholder state.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
              Integration Flow
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {integrationSteps.map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Step {item.step}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
              Delivery Options
            </p>
            <div className="mt-6 space-y-4">
              {deliveryOptions.map((option) => (
                <div
                  key={option.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <h3 className="text-lg font-semibold">{option.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {option.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
