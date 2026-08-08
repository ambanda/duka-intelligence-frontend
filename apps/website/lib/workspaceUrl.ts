const DEFAULT_WORKSPACE_URL = "https://app.dukaintelligence.co.ke";

export function workspaceSignInUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_DUKA_WORKSPACE_URL || DEFAULT_WORKSPACE_URL;
  return `${baseUrl.replace(/\/+$/, "")}/sign-in`;
}
