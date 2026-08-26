"use client";

import type { WorkspaceMembership } from "@duka/auth";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export function WorkspaceSwitcher({ current, memberships }: { current: WorkspaceMembership; memberships: WorkspaceMembership[] }) {
  const router = useRouter();
  return (
    <div className="workspace-switcher">
      <label className="workspace-switcher__label" htmlFor="workspace-select">Workspace</label>
      <div>
        <select
          aria-label="Select workspace"
          id="workspace-select"
          onChange={(event) => router.push(`/w/${event.target.value}/overview`)}
          value={current.workspaceSlug}
        >
          {memberships.map((membership) => <option key={membership.workspaceId} value={membership.workspaceSlug}>{membership.displayName}</option>)}
        </select>
        <ChevronDown aria-hidden="true" size={16} />
      </div>
      <small>{current.sectors.join(", ") || "Sector not assigned"}</small>
    </div>
  );
}
