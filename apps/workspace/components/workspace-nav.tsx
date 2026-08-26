"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { workspaceNavigation } from "@/lib/navigation";

export function WorkspaceNav({ workspaceSlug }: { workspaceSlug: string }) {
  const pathname = usePathname();

  return (
    <nav className="workspace-nav" aria-label="Workspace navigation">
      {workspaceNavigation.map(({ href, icon: Icon, label }) => {
        const target = `/w/${workspaceSlug}/${href}`;
        const active = pathname === target || pathname.startsWith(`${target}/`);
        return (
          <Link aria-current={active ? "page" : undefined} className={active ? "is-active" : undefined} href={target} key={href}>
            <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
