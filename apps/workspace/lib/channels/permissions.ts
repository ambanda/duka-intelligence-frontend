const channelAdministratorRoles = new Set([
  "owner",
  "admin",
  "workspace_admin",
  "channel_admin",
]);

export function canManageChannels(roles: string[]): boolean {
  return roles.some((role) => channelAdministratorRoles.has(role));
}
