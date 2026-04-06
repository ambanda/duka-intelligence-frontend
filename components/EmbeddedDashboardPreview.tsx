type EmbeddedDashboardPreviewProps = {
  src?: string;
};

export default function EmbeddedDashboardPreview({
  src,
}: EmbeddedDashboardPreviewProps) {
  const hasEmbed = Boolean(src);

  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_20px_60px_-36px_rgba(15,23,42,0.45)]">
      <div className="flex items-center border-b border-slate-200 bg-slate-950 px-5 py-4 text-white">
        <span className="h-3 w-3 rounded-full bg-rose-400" />
        <span className="ml-2 h-3 w-3 rounded-full bg-amber-400" />
        <span className="ml-2 h-3 w-3 rounded-full bg-emerald-400" />
        <span className="ml-5 text-sm font-medium text-slate-200">
          Duka Intelligence Dashboard
        </span>
      </div>

      {hasEmbed ? (
        <div className="bg-slate-100">
          <iframe
            src={src}
            title="Duka Intelligence dashboard"
            className="h-[720px] w-full border-0"
            loading="lazy"
            allow="fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      ) : (
        <div className="grid min-h-[720px] place-items-center bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.12),transparent_35%),linear-gradient(180deg,#f8fafc_0%,#eef2ff_100%)] px-6 py-16 text-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900">
              Dashboard preview unavailable
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Add a product embed URL to render the live dashboard on this
              page.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
