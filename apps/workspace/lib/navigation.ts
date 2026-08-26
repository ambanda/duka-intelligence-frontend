import {
  Activity,
  BookOpenText,
  Bot,
  Cable,
  Database,
  KeyRound,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

export const workspaceNavigation = [
  { href: "overview", label: "Overview", icon: LayoutDashboard },
  { href: "knowledge", label: "Knowledge", icon: BookOpenText },
  { href: "skills", label: "Skills", icon: Bot },
  { href: "data-sources", label: "Data sources", icon: Database },
  { href: "channels", label: "Channels", icon: Cable },
  { href: "users", label: "Users", icon: Users },
  { href: "roles", label: "Roles", icon: KeyRound },
  { href: "audit", label: "Audit", icon: Activity },
  { href: "settings", label: "Settings", icon: Settings },
] as const;

export const securityNavigationIcon = ShieldCheck;
