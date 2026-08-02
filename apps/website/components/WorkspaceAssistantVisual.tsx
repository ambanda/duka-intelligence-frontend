import {
  BadgeCheck,
  Bot,
  Braces,
  Database,
  FileText,
  FolderOpen,
  Mail,
  MessageCircle,
  SearchCheck,
  ShieldCheck,
  Share2,
  Sparkles,
  Workflow,
} from "lucide-react";

const sources = [
  { label: "Systems", icon: Database },
  { label: "Documents", icon: FileText },
  { label: "Email", icon: Mail },
  { label: "Chats", icon: MessageCircle },
  { label: "Social", icon: Share2 },
  { label: "APIs", icon: Braces },
];

const platform = ["Connectors", "Data processing", "Knowledge objects", "Access controls"];
const agents = ["Understand intent", "Find answers", "Recommend", "Act safely"];
const outputs = ["WhatsApp", "Dashboards", "APIs", "Workflows"];

export default function WorkspaceAssistantVisual() {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#17212b] p-4 text-white shadow-glow md:p-5">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
            Duka Intelligence
          </p>
          <h3 className="mt-1 text-xl font-semibold text-white">
            Enterprise knowledge to job done
          </h3>
        </div>
        <BadgeCheck className="h-6 w-6 text-emerald-300" />
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[0.85fr_1.1fr_0.95fr]">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
            <FolderOpen className="h-4 w-4 text-orange-300" />
            Sources
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {sources.map((source) => (
              <div key={source.label} className="flex min-h-12 items-center gap-2 rounded-lg bg-white/10 px-3 py-2">
                <source.icon className="h-4 w-4 shrink-0 text-orange-300" />
                <span className="text-sm font-medium text-slate-100">{source.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-emerald-300/30 bg-emerald-400/10 p-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-300" />
            <h3 className="font-semibold text-white">The Core Platform</h3>
          </div>
          <p className="mt-2 text-sm leading-6 text-emerald-50">
            Unifies structured and unstructured enterprise knowledge into a
            governed layer that AI can safely use.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {platform.map((item) => (
              <span key={item} className="rounded-lg border border-emerald-200/20 bg-white/10 px-3 py-2 text-sm font-medium text-emerald-50">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-orange-300/30 bg-orange-400/10 p-4">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-orange-300" />
            <h3 className="font-semibold text-white">Duka Agents</h3>
          </div>
          <div className="mt-4 space-y-2">
            {agents.map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-orange-50">
                <Sparkles className="h-4 w-4 text-orange-300" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-slate-950 p-4">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">
          {["Intent", "Trusted answer", "Recommendation", "Approved action", "Job done"].map((step, index) => (
            <div key={step} className="contents">
              <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-center text-sm font-semibold text-slate-100">
                {step}
              </div>
              {index < 4 ? <span className="hidden text-center text-orange-300 md:block">→</span> : null}
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {outputs.map((output) => (
            <span key={output} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
              {output}
            </span>
          ))}
          <span className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-100">
            Permissions + citations + audit logs
          </span>
        </div>
      </div>
    </div>
  );
}