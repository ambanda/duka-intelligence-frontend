# Phase 4: Workspace Application

The authenticated workspace is an independently deployable dynamic Next.js application at `apps/workspace`.

## Deployment boundary

- Keep the existing Netlify site rooted at the repository with the root `netlify.toml`. It continues to publish `apps/website/out`.
- Create a second Netlify site from the same repository and branch.
- Set its package directory to `apps/workspace` and leave the base directory at the repository root.
- Netlify should use `apps/workspace/netlify.toml`, run `npm run build:workspace`, and publish `apps/workspace/.next` through its Next.js runtime.
- Do not set `output: export` for the workspace application. Authentication, server-side authorization, and BFF routes require a dynamic runtime.

## Current security posture

- Production fails closed until OIDC session verification is implemented.
- The local development session is available only with `WORKSPACE_AUTH_MODE=development` and never when `NODE_ENV=production`.
- Workspace membership is resolved server-side and unauthorized workspace slugs return a non-disclosing not-found response.
- `/api/session` returns a public session projection and never returns an access token.
- The browser does not supply tenant, workspace, role, or permission authority.

## Local run

Copy variable names from `apps/workspace/.env.example` into `apps/workspace/.env.local`, set `WORKSPACE_AUTH_MODE=development`, then run:

```powershell
npm run dev:workspace
```

The workspace is available at `http://localhost:3001`.
