import {
  BadgeCheck,
  Building2,
  Database,
  FileText,
  FolderOpen,
  Mail,
  MessageCircle,
  Network,
  ShieldCheck,
  Share2,
} from "lucide-react";

const sources = [
  { label: "Business systems", icon: Database },
  { label: "Documents", icon: FileText },
  { label: "Email", icon: Mail },
  { label: "Shared folders", icon: FolderOpen },
  { label: "Chat apps", icon: MessageCircle },
  { label: "Social channels", icon: Share2 },
];

const objects = [
  "Customers",
  "Operations",
  "Revenue",
  "Inventory",
  "Cases",
  "Deals",
  "Tasks",
  "Engagement",
];

export default function WorkspaceAssistantVisual() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.1fr]">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            <Network className="h-4 w-4 text-orange-600" />
            Connected sources
          </div>
          <div className="grid grid-cols-2 gap-2">
            {sources.map((source) => (
              <div
                key={source.label}
                className="flex min-h-16 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
              >
                <source.icon className="h-4 w-4 shrink-0 text-orange-600" />
                <span className="text-sm font-medium text-slate-700">
                  {source.label}
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-700" />
              <h3 className="font-semibold text-slate-900">
                Knowledge Object Processor
              </h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Cleans, extracts, organizes, and governs business knowledge before
              an assistant can use it.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-950 p-4 text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold">
                D
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Duka Assistant</p>
                <p className="text-xs text-emerald-200">Workspace chat channel</p>
              </div>
            </div>
            <BadgeCheck className="h-5 w-5 text-emerald-300" />
          </div>

          <div className="mt-4 space-y-3">
            <div className="ml-auto max-w-[82%] rounded-xl bg-white px-4 py-3 text-sm text-slate-900">
              What changed in operations this week?
            </div>
            <div className="max-w-[90%] rounded-xl bg-emerald-100 px-4 py-3 text-sm text-slate-800">
              Activity increased in two branches, customer complaints rose on
              chat channels, and inventory risk is concentrated in fast-moving
              items. Sources are attached for review.
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-slate-200">
            <span className="rounded-full border border-white/10 px-2 py-1">RBAC</span>
            <span className="rounded-full border border-white/10 px-2 py-1">Citations</span>
            <span className="rounded-full border border-white/10 px-2 py-1">Audit logs</span>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          <Building2 className="h-4 w-4 text-orange-600" />
          Governed knowledge objects
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {objects.map((object) => (
            <span
              key={object}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700"
            >
              {object}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
