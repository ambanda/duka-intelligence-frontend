# Phases 6-11: Authenticated Workspace

## Authentication

The workspace uses provider-neutral OpenID Connect Authorization Code flow with PKCE, state, and nonce. The callback exchanges the code on the server and immediately calls Duka `/v1/me` and `/v1/me/workspaces`. PostgreSQL-backed principal roles remain authoritative.

The encrypted session is an `HttpOnly`, `SameSite=Lax`, host-only cookie that contains server tokens. Browser-visible session data excludes access, refresh, and ID tokens. Production cookies use the `__Host-` prefix and `Secure` flag. Access tokens refresh server-side when a BFF request approaches expiry; refresh failure clears the session.

## BFF and CSRF

All privileged operations use `/api/bff/*`. The BFF resolves URL slugs against authenticated memberships and sends the authoritative workspace ID to Duka. Mutations require the encrypted session's CSRF token, an exact allowed Origin, and same-origin fetch metadata. Request bodies are limited to 64 KB and safe reads alone are retried.

## WhatsApp onboarding

Meta Embedded Signup runs in the browser, but the one-time authorization code is submitted directly to the BFF and exchanged by Duka. Full provider asset IDs and credential metadata remain server-side. The UI receives masked WABA identifiers and a reduced status contract. PIN resume, status polling, verification, and disconnect use audited Duka endpoints.

## Workspace skills

The Skills surface discovers only the reviewed catalog for the authenticated workspace sector. Browser requests use same-origin BFF routes; the BFF resolves the workspace slug from the encrypted session and sends the authoritative workspace ID and OIDC token to Duka.

Administrators configure bindings through `draft -> validate -> publish`, with `config_version` providing optimistic concurrency. The UI renders the catalog JSON Schema as business controls and resolves approved WhatsApp templates and published Flows through authorized channel endpoints. Provider credentials, tenant authority, raw tool names, and unrestricted JSON are never exposed to the browser.

Calendar and payment fields currently store validated stable connection references. Before transactional production onboarding, add control-plane connection discovery so administrators choose an authorized connection rather than entering its reference manually.

## Required production variables

- `DUKA_API_BASE_URL`
- `WORKSPACE_APP_URL`
- `WORKSPACE_SESSION_SECRET` (at least 32 random characters)
- `OIDC_ISSUER_URL`
- `OIDC_CLIENT_ID`
- `OIDC_CLIENT_SECRET` when required by the provider
- `OIDC_REDIRECT_URI=https://app.dukaintelligence.co.ke/auth/callback`
- `OIDC_SCOPE`
- `OIDC_AUDIENCE` matching the Duka API audience

Configure matching issuer, audience, and JWKS values in the Duka API. Add the `duka_principal_id` claim to the first administrator or ensure its OIDC `sub` matches an existing Duka principal.

The public website uses `NEXT_PUBLIC_DUKA_WORKSPACE_URL` for its header and footer sign-in entry points. Production should set it to `https://app.dukaintelligence.co.ke`; local development uses `http://localhost:3001`. Authentication and cookies remain isolated to the workspace application domain.

## Deployment

The public website and workspace are separate Netlify sites from the same repository. The workspace uses `apps/workspace/netlify.toml` and `app.dukaintelligence.co.ke`; the website remains a static export. Build-ignore rules prevent unrelated app-only changes from rebuilding the other site. Configure production, deploy-preview, and branch-deploy OIDC callback/origin variables independently.
