import type { WorkspaceMembership, WorkspaceSession } from "@duka/auth";
import { CircleUserRound, LogOut } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { WorkspaceNav } from "./workspace-nav";
import { WorkspaceSwitcher } from "./workspace-switcher";

export function WorkspaceShell({
  children,
  membership,
  session,
}: {
  children: ReactNode;
  membership: WorkspaceMembership;
  session: WorkspaceSession;
}) {
  const role = membership.roles[0]?.replaceAll("_", " ") ?? "workspace user";

  return (
    <div className="workspace-shell">
      <aside className="workspace-sidebar">
        <a className="workspace-brand" href="/" aria-label="Duka Workspace home">
          <Image src="/logo-icon-square.png" alt="" width={32} height={32} priority />
          <span>Duka Workspace</span>
        </a>
        <WorkspaceSwitcher current={membership} memberships={session.memberships} />
        <WorkspaceNav workspaceSlug={membership.workspaceSlug} />
        <div className="workspace-user">
          <CircleUserRound aria-hidden="true" size={28} strokeWidth={1.6} />
          <div>
            <strong>{session.principal.displayName ?? session.principal.email ?? "Workspace user"}</strong>
            <span>{role}</span>
          </div>
          <form action="/auth/sign-out" method="post">
            <input name="csrfToken" type="hidden" value={session.csrfToken} />
            <button aria-label="Sign out" className="icon-button" title="Sign out" type="submit"><LogOut size={17} /></button>
          </form>
        </div>
      </aside>
      <div className="workspace-main">
        <header className="workspace-mobile-header">
          <Image src="/logo-icon-square.png" alt="" width={30} height={30} />
          <div>
            <strong>{membership.displayName}</strong>
            <span>Duka Workspace</span>
          </div>
        </header>
        <div className="workspace-mobile-nav"><WorkspaceNav workspaceSlug={membership.workspaceSlug} /></div>
        <div className="environment-bar"><span>{session.authMode === "oidc" ? "Live control plane" : "Development session"}</span><span>Principal-scoped access</span></div>
        <main className="workspace-content">{children}</main>
      </div>
    </div>
  );
}
