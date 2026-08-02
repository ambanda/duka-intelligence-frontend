export const dynamic = "force-static";

import {
  AlertTriangle,
  BadgeCheck,
  FileSearch,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  Server,
  ShieldCheck,
  TimerReset,
} from "lucide-react";

const controls = [
  { title: "Tenant and workspace isolation", text: "Each workspace is separated so agents only operate inside the environment they are assigned to.", icon: Fingerprint },
  { title: "Role-based access", text: "Users receive answers based on permissions, workspace role, and allowed knowledge objects.", icon: KeyRound },
  { title: "Citation-aware retrieval", text: "Answers can point back to files, records, conversations, or source summaries used as evidence.", icon: FileSearch },
  { title: "Freshness and quality checks", text: "Agents can surface when knowledge is current, stale, incomplete, or not strong enough to answer safely.", icon: TimerReset },
  { title: "Allowed actions", text: "Skills constrain what an agent is approved to retrieve, draft, route, or execute.", icon: BadgeCheck },
  { title: "Audit context", text: "Sensitive retrieval and task execution can retain traceability across users, sources, and workflows.", icon: ShieldCheck },
];

export default function TrustPage() {
  return (
    <main className="px-6 py-16 md:py-20">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-700">
          Trust Layer
        </p>
        <h1 className="mt-4 text-4xl font-bold text-gray-900 md:text-5xl">
          Duka Agents should not roam raw enterprise systems
        </h1>
        <p className="mt-6 max-w-4xl text-lg text-gray-600">
          Duka protects organizations by giving agents access to governed
          knowledge objects instead of raw operational systems, inboxes, folders,
          social accounts, or admin tools.
        </p>
      </section>

      <section className="mx-auto mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-7 max-w-6xl shadow-card">
        <div className="flex items-start gap-4">
          <AlertTriangle className="mt-1 h-7 w-7 shrink-0 text-amber-700" />
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              The safer pattern: expose only the knowledge needed
            </h2>
            <p className="mt-3 text-slate-700">
              Instead of connecting an agent directly to everything, Duka first
              processes information into controlled objects with ownership,
              access rules, citations, lineage, freshness, quality status, and
              allowed actions.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {controls.map((control) => (
          <article key={control.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <control.icon className="h-6 w-6 text-orange-600" />
            <h2 className="mt-4 text-lg font-semibold text-slate-900">{control.title}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">{control.text}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-14 rounded-2xl border border-slate-200 bg-white p-7 max-w-6xl shadow-card">
        <Server className="h-7 w-7 text-orange-600" />
        <h2 className="mt-4 text-2xl font-semibold text-slate-900">
          Deployment choices for different governance models
        </h2>
        <p className="mt-3 max-w-4xl text-slate-600">
          Duka can be delivered as managed SaaS for speed, or as a dedicated
          instance when policy requires stronger isolation, customer-specific
          deployment boundaries, or private integration controls.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            "Least-privilege access",
            "Encryption in transit and at rest",
            "Environment separation",
            "Secrets management",
            "Backup and recovery controls",
            "Monitoring and incident workflows",
          ].map((item) => (
            <div key={item} className="rounded-lg border border-slate-200 bg-[#fbfaf7] p-3 text-sm font-medium text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 grid max-w-6xl gap-8 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-7 shadow-card">
          <LockKeyhole className="h-7 w-7 text-orange-600" />
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">
            No answer without access and evidence
          </h2>
          <p className="mt-3 text-slate-600">
            If a user is not allowed to access a source, the agent should not use
            it. If evidence is missing or stale, the agent can fall back safely
            instead of inventing an answer.
          </p>
        </article>
        <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-7 shadow-card">
          <ShieldCheck className="h-7 w-7 text-emerald-700" />
          <h2 className="mt-4 text-2xl font-semibold text-slate-900">
            Safe skills for real work
          </h2>
          <p className="mt-3 text-slate-700">
            Duka Agents can retrieve, explain, summarize, draft, and route tasks
            only through approved knowledge objects and controlled workflows.
          </p>
        </article>
      </section>
    </main>
  );
}