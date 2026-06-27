export const dynamic = "force-static";

import {
  Cloud,
  Database,
  FileText,
  FolderOpen,
  Gauge,
  Mail,
  MessageCircle,
  Plug,
  Rocket,
  Share2,
} from "lucide-react";

const integrations = [
  { title: "Business systems", text: "Operational platforms, sector systems, exports, and internal tools.", icon: Database },
  { title: "Documents", text: "PDFs, Word files, spreadsheets, scanned reports, and knowledge files.", icon: FileText },
  { title: "Email", text: "Outlook, Gmail, and mailbox knowledge used by approved teams.", icon: Mail },
  { title: "Shared folders", text: "SharePoint, cloud drives, storage buckets, and organized team folders.", icon: FolderOpen },
  { title: "Chat apps", text: "WhatsApp and team conversations where work and decisions already happen.", icon: MessageCircle },
  { title: "Social channels", text: "Customer-facing channels, inquiries, feedback, and engagement signals.", icon: Share2 },
  { title: "Cloud and data layers", text: "Warehouse, serving-layer, and model outputs where governed knowledge lives.", icon: Cloud },
  { title: "APIs", text: "Internal APIs and controlled endpoints for retrieval, workflow, and task execution.", icon: Plug },
];

const flow = ["Connect", "Process", "Govern", "Teach Skills", "Assist"];

const speedPaths = [
  "Start with files, exports, and documents before deeper system work",
  "Connect cloud folders, email, chat apps, and social channels in phases",
  "Use APIs, databases, or warehouses where structured integrations already exist",
  "Validate citations, access control, and answer quality before expanding scope",
];

export default function IntegrationsPage() {
  return (
    <main className="px-6 py-16 md:py-20">
      <section className="max-w-6xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
          Integrations
        </p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
          Connect the systems, documents, and channels your teams already use
        </h1>
        <p className="mt-6 max-w-4xl text-lg text-gray-600">
          Duka brings business data, files, communications, social channels, and
          internal APIs into one governed knowledge layer for workspace
          assistants.
        </p>
      </section>

      <section className="max-w-6xl mx-auto mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {integrations.map((item) => (
          <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <item.icon className="h-6 w-6 text-orange-600" />
            <h2 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">{item.text}</p>
          </article>
        ))}
      </section>

      <section className="max-w-6xl mx-auto mt-14">
        <h2 className="text-3xl font-semibold text-gray-900">Integration Flow</h2>
        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-5">
          {flow.map((node, index) => (
            <div key={node} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-center shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Step {index + 1}
              </p>
              <p className="mt-2 font-medium text-slate-800">{node}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-14 grid gap-8 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <Gauge className="h-7 w-7 text-orange-600" />
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">
            Designed for speed without forcing a rebuild
          </h2>
          <p className="mt-3 text-slate-600">
            Duka can start with the knowledge sources you already have, then
            expand into deeper integrations as trust, governance, and usage
            patterns become clear.
          </p>
          <div className="mt-5 grid gap-3">
            {speedPaths.map((path) => (
              <div key={path} className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-700">
                {path}
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-7">
          <Rocket className="h-7 w-7 text-emerald-700" />
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">
            Pilot first, then expand safely
          </h2>
          <p className="mt-3 text-slate-700">
            A workspace assistant can begin with one team, one channel, and a
            focused knowledge set. From there, Duka can add more sources,
            skills, users, workspaces, and controlled actions in phases.
          </p>
        </article>
      </section>

      <section className="max-w-6xl mx-auto mt-14 rounded-2xl border border-emerald-200 bg-emerald-50 p-7">
        <h2 className="text-2xl font-semibold text-slate-900">
          Interaction starts where teams already work
        </h2>
        <p className="mt-3 max-w-4xl text-slate-700">
          WhatsApp and chat apps become the point of interaction, while Duka's
          knowledge layer handles retrieval, access control, citations, and safe
          task execution behind the scenes.
        </p>
      </section>
    </main>
  );
}
