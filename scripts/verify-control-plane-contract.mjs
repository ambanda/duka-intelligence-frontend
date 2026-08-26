const baseUrl = (process.env.DUKA_API_BASE_URL || "http://localhost:8000").replace(/\/$/, "");
const response = await fetch(`${baseUrl}/openapi.json`, { signal: AbortSignal.timeout(10_000) });
if (!response.ok) throw new Error(`Could not read Duka OpenAPI: ${response.status}`);
const document = await response.json();

const required = {
  "/v1/me": ["get"],
  "/v1/me/workspaces": ["get"],
  "/v1/workspaces/{workspace_id}": ["get"],
  "/v1/workspaces/{workspace_id}/channels": ["get"],
  "/v1/workspaces/{workspace_id}/channels/{channel_id}": ["get", "delete"],
  "/v1/workspaces/{workspace_id}/channels/whatsapp/onboarding-sessions": ["post"],
  "/v1/channels/whatsapp/meta/onboarding/complete": ["post"],
  "/v1/channels/whatsapp/meta/onboarding/{session_id}": ["get"],
  "/v1/channels/whatsapp/meta/onboarding/{session_id}/resume": ["post"],
};

const missing = [];
for (const [path, methods] of Object.entries(required)) {
  for (const method of methods) if (!document.paths?.[path]?.[method]) missing.push(`${method.toUpperCase()} ${path}`);
}
if (missing.length) throw new Error(`Duka control-plane contract is missing:\n${missing.join("\n")}`);
console.log(`Duka control-plane contract verified: ${Object.keys(required).length} paths`);
