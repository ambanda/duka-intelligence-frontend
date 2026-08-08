"use client";

import { StatusBadge } from "@duka/ui";
import { AlertTriangle, Bot, RefreshCw, Search } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { OperationalEmptyState } from "./operational-empty-state";
import type { SkillsView } from "@/lib/skills/contracts";
import { bindingLabel, bindingTone, humanize, riskTone } from "@/lib/skills/display";

function loadError(status: number): string {
  if (status === 401) return "Your session expired. Sign in again to view workspace skills.";
  if (status === 403) return "You do not have permission to view skills in this workspace.";
  return "The skill catalog could not be loaded from the Duka control plane.";
}

export function SkillsPanel({ canManage, workspaceSlug }: { canManage: boolean; workspaceSlug: string }) {
  const [data, setData] = useState<SkillsView | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ status: number; message: string } | null>(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [profile, setProfile] = useState("all");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/bff/workspaces/${encodeURIComponent(workspaceSlug)}/skills`, { cache: "no-store" });
      if (!response.ok) throw { status: response.status };
      setData(await response.json());
    } catch (reason) {
      const responseStatus = typeof reason === "object" && reason && "status" in reason ? Number(reason.status) : 0;
      setError({ status: responseStatus, message: loadError(responseStatus) });
    } finally {
      setLoading(false);
    }
  }, [workspaceSlug]);

  useEffect(() => { void load(); }, [load]);

  const profiles = useMemo(
    () => [...new Set(data?.skills.map((skill) => skill.interaction_profile) ?? [])].sort(),
    [data],
  );
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return (data?.skills ?? []).filter((skill) => {
      const matchesQuery = !needle || `${skill.skill_name} ${skill.description} ${skill.sector}`.toLowerCase().includes(needle);
      return matchesQuery && (status === "all" || skill.binding_status === status) && (profile === "all" || skill.interaction_profile === profile);
    });
  }, [data, profile, query, status]);

  if (loading) return <div className="loading-state" aria-live="polite"><RefreshCw className="spin" size={18} />Loading sector skills...</div>;
  if (error) return <div className="error-state"><AlertTriangle size={20} /><div><strong>Skills unavailable</strong><p>{error.message}</p><button className="duka-button duka-button--secondary" onClick={load}>Retry</button></div></div>;
  if (!data?.skills.length) return <OperationalEmptyState description="No reviewed skills are available for this workspace sector yet." icon={Bot} title="No sector skills available" />;

  return (
    <>
      <div className="skill-filter-bar">
        <label className="skill-search"><Search aria-hidden="true" size={16} /><span className="sr-only">Search skills</span><input onChange={(event) => setQuery(event.target.value)} placeholder="Search skills" type="search" value={query} /></label>
        <div className="skill-filters">
          <label><span>Status</span><select onChange={(event) => setStatus(event.target.value)} value={status}><option value="all">All statuses</option><option value="active">Active</option><option value="draft">Draft</option><option value="disabled">Disabled</option><option value="not_configured">Not configured</option></select></label>
          <label><span>Use</span><select onChange={(event) => setProfile(event.target.value)} value={profile}><option value="all">All uses</option>{profiles.map((value) => <option key={value} value={value}>{humanize(value)}</option>)}</select></label>
        </div>
      </div>
      <div className="skills-table" role="table" aria-label="Workspace skills">
        <div className="skills-table__header" role="row"><span>Skill</span><span>Use</span><span>Risk</span><span>Status</span><span>Channels</span><span /></div>
        {visible.map((skill) => (
          <div className="skills-table__row" key={skill.skill_id} role="row">
            <div className="skills-table__identity"><strong>{skill.skill_name}</strong><span>{skill.description}</span><small>{humanize(skill.sector)}</small></div>
            <span>{humanize(skill.interaction_profile)}</span>
            <StatusBadge tone={riskTone(skill.risk_level)}>{humanize(skill.risk_level)}</StatusBadge>
            <StatusBadge tone={bindingTone(skill.binding_status)}>{bindingLabel(skill.binding_status)}</StatusBadge>
            <span>{skill.supported_channels.map(humanize).join(", ") || "None"}</span>
            <Link className="text-link skills-table__action" href={`/w/${workspaceSlug}/skills/${encodeURIComponent(skill.skill_id)}`}>{canManage ? "Configure" : "View"}</Link>
          </div>
        ))}
        {!visible.length && <div className="skills-table__empty">No skills match the current filters.</div>}
      </div>
    </>
  );
}
