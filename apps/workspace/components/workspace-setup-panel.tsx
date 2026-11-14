"use client";

import { useCallback, useEffect, useState } from "react";
import type { JsonSchema, WhatsAppAsset } from "@duka/api-client";
import { Save, CheckCircle2 } from "lucide-react";
import { SkillSchemaForm } from "./skill-schema-form";
import type { ChannelView } from "@/lib/channels/contracts";
import { useOperations, field, rows, labels, type OperationRow as Row } from "./operations-client";

export function WorkspaceSetupPanel({ workspaceSlug, csrfToken }: { workspaceSlug: string; csrfToken: string }) {
  const api = useOperations(workspaceSlug, csrfToken);
  const [skills, setSkills] = useState<Row[]>([]);
  const [knowledge, setKnowledge] = useState<Row>({});
  const [channels, setChannels] = useState<ChannelView[]>([]);
  const [chosen, setChosen] = useState("");
  const [config, setConfig] = useState<Row>({});
  const [bindings, setBindings] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const base = `/api/bff/workspaces/${encodeURIComponent(workspaceSlug)}`;
  const load = useCallback(async () => {
    setSkills(rows((await api("setup")).skills));
    const response = await fetch(`${base}/knowledge`, { cache: "no-store" });
    if (!response.ok) throw new Error("Knowledge choices unavailable");
    setKnowledge(await response.json());
    const channelResponse = await fetch(`${base}/channels`, { cache: "no-store" });
    if (channelResponse.ok) setChannels((await channelResponse.json()).channels || []);
  }, [api, base]);
  useEffect(() => { void load().catch((e) => setError(String(e))); }, [load]);
  const skill = skills.find((s) => s.skill_id === chosen);
  function choose(row: Row) {
    setChosen(field(row, "skill_id")); setConfig(structuredClone((row.draft_config_json || row.published_config || row.default_config || {}) as Row));
    const defaults: Record<string, string> = {};
    for (const req of rows(row.requirements)) {
      const existing = rows(knowledge.bindings).find((b) => b.skill_id === row.skill_id && b.content_slot === req.slot && ["active", "draft"].includes(field(b, "status")));
      if (existing) defaults[field(req, "slot")] = `${existing.source_kind}:${existing.source_reference}`;
    }
    setBindings(defaults); setNotice(""); setError("");
  }
  async function save(activate: boolean) {
    setBusy(true); setError(""); setNotice("");
    try {
      const result = await api(`setup/skills/${encodeURIComponent(chosen)}`, "PUT", {
        config, expected_version: skill?.config_version || null, activate,
        bindings: Object.entries(bindings).filter(([, value]) => value).map(([slot, value]) => {
          const colon = value.indexOf(":"); return { content_slot: slot, source_kind: value.slice(0, colon), source_reference: value.slice(colon + 1) };
        }),
      });
      const validation = result.validation as Row;
      setNotice(result.activated ? "Skill activated." : validation.valid ? "Saved and ready to activate." : "Saved. Setup needs attention.");
      setError(labels(validation.errors).join("; ")); await load();
    } catch (e) { setError(e instanceof Error ? e.message : String(e)); } finally { setBusy(false); }
  }
  return <section className="operational-section"><h2>Skill setup</h2>{error && <p role="alert" className="error-state">{error}</p>}{notice && <p role="status">{notice}</p>}
    <div className="knowledge-scroll"><table><thead><tr><th>Skill</th><th>Bundle</th><th>Readiness</th><th>Actions</th></tr></thead><tbody>{skills.map((s) => <tr key={field(s, "skill_id")}><td>{field(s, "skill_name")}</td><td>{field(s, "service_centre").replaceAll("_", " ")}</td><td>{field(s, "readiness").replaceAll("_", " ")}</td><td><button className="duka-button duka-button--secondary" disabled={!s.entitled || busy} onClick={() => choose(s)}>Set up</button></td></tr>)}</tbody></table></div>
    {skill && <div className="knowledge-form"><h3>{field(skill, "skill_name")}</h3>
      {rows(skill.requirements).map((req) => <label key={field(req, "slot")}>{field(req, "slot").replaceAll("_", " ")}{req.required ? " *" : ""}<select value={bindings[field(req, "slot")] || ""} onChange={(e) => setBindings({ ...bindings, [field(req, "slot")]: e.target.value })}><option value="">Select content source</option>
        {labels(req.source_kinds).includes("knowledge_collection") && rows(knowledge.collections).filter((c) => c.publication_status === "published").map((c) => <option key={field(c, "collection_key")} value={`knowledge_collection:${field(c, "collection_key")}`}>{field(c, "display_name")} ({field(c, "visibility")})</option>)}
        {labels(req.source_kinds).includes("public_offerings") && <option value="public_offerings:workspace.public_offerings">Business products and services</option>}
        {labels(req.source_kinds).includes("federated_tool") && rows(knowledge.sources).filter((s) => s.source_mode === "federated" && s.status === "active").map((s) => <option key={field(s, "knowledge_source_id")} value={`federated_tool:${field(s, "knowledge_source_id")}`}>{field(s, "display_name")}</option>)}
      </select></label>)}
      <SkillSchemaForm schema={(skill.config_schema_json || {}) as JsonSchema} value={config} onChange={setConfig} disabled={busy} channels={channels} loadAssets={async (channelId): Promise<WhatsAppAsset[]> => { const response = await fetch(`${base}/channels/${encodeURIComponent(channelId)}/whatsapp-assets`); if (!response.ok) throw new Error("Channel assets unavailable"); return (await response.json()).assets || []; }} />
      <div className="knowledge-actions"><button className="duka-button duka-button--secondary" disabled={busy} onClick={() => void save(false)}><Save size={16} />Save and validate</button><button className="duka-button duka-button--primary" disabled={busy} onClick={() => void save(true)}><CheckCircle2 size={16} />Validate and activate</button></div>
    </div>}
  </section>;
}
