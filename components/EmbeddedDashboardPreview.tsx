type EmbeddedDashboardPreviewProps = {
  src?: string;
  fallbackHref?: string;
};

export default function EmbeddedDashboardPreview({
  src,
  fallbackHref = "https://dashboard.dukaintelligence.co.ke/",
}: EmbeddedDashboardPreviewProps) {
  const iframeSrc = src || fallbackHref;
  const showFallbackNotice = !src;

  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_20px_60px_-36px_rgba(15,23,42,0.45)]">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-950 px-5 py-4 text-white">
        <div className="flex items-center">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="ml-2 h-3 w-3 rounded-full bg-amber-400" />
          <span className="ml-2 h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-5 text-sm font-medium text-slate-200">
            Duka Intelligence Dashboard
          </span>
        </div>

        <a
          href={iframeSrc}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-100 transition hover:bg-white/20"
        >
          Open Dashboard
        </a>
      </div>

      {showFallbackNotice && (
        <div className="border-b border-slate-200 bg-amber-50 px-5 py-3 text-sm text-amber-900">
          Showing the live dashboard home as a clickable fallback preview.
        </div>
      )}

      <div className="bg-slate-100">
        <iframe
          src={iframeSrc}
          title="Duka Intelligence dashboard"
          className="h-[720px] w-full border-0"
          loading="lazy"
          allow="fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </section>
  );
}
