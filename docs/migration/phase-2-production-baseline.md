# Phase 2: Public Website Production Baseline

## Purpose

This record protects the existing Duka public website while the frontend is converted into an npm-workspace repository. Production must remain on the current Netlify site until the migrated website deploy preview passes this baseline.

## Source Baseline

- Repository: `ambanda/duka-intelligence-frontend`
- Baseline commit: `05f4fc93c464f5957fe9f47d1485bb711b71a1ca`
- Migration branch: `migration/frontend-workspaces`
- Framework: Next.js 16.1.6 App Router
- Rendering model: static export
- Production build command: `npm run build`
- Netlify publish directory: `out`
- Netlify Node version: `20.20.0`
- Local baseline Node version: recorded in `public-site-baseline.json`
- Public API environment variable: `NEXT_PUBLIC_DUKA_PUBLIC_API_BASE_URL`
- Expected public API origin: `https://api.dukaintelligence.co.ke`

## Public Route Contract

The migration must preserve:

```text
/
/about
/ai-assistant
/aup
/contact
/dpa
/industries
/integrations
/platform
/pricing
/privacy
/product
/terms
/trust
/robots.txt
/sitemap.xml
```

The generated 404 page and Next.js route payloads must also remain available through the static export.

## SEO Contract

- Default title: `Duka Intelligence`
- Canonical origin: `https://dukaintelligence.co.ke`
- Robots policy: index and follow
- Sitemap: `https://dukaintelligence.co.ke/sitemap.xml`
- Organization structured data remains present.
- Existing Open Graph image, description, icons and legal-page metadata remain unchanged during migration.

## Public Assistant Contract

The migration must not change:

- Floating `Ask Duka` entry point.
- Bootstrap request: `GET /public/chat/bootstrap`.
- Conversation request: `POST /public/chat`.
- Lead capture request: `POST /public/leads`.
- Existing visitor, session and message-history persistence.
- Query-limit, lead-capture and fallback behavior supplied by the Duka API.
- Public website calls remain independent from workspace OIDC authentication.

## Repository-Controlled Netlify Configuration

Current `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "20.20.0"
```

Before changing the Netlify site configuration, record or screenshot these account-level settings because they are not stored in Git:

- Netlify site ID, team and production domain.
- Production branch and deploy-context overrides.
- Environment-variable names and scopes. Do not copy secret values into Git.
- DNS aliases, redirects, headers, plugins, build hooks and notifications.
- Deploy retention and rollback target.

## Verification

Baseline verification on 2026-08-02:

- `npm run build` passed and generated 18 static Next.js outputs.
- The baseline verifier confirmed all 16 public route and machine-readable asset contracts.
- The production assistant bootstrap endpoint returned `status=success`.
- The production assistant retained a five-query anonymous limit and four suggested prompts.
- No production Netlify configuration or domain routing was changed.
- Local verification used Node 22.18.0; deploy-preview verification must still use Netlify's pinned Node 20.20.0.

Run from the repository root:

```powershell
npm run build
node .\scripts\verify-public-baseline.mjs
```

To intentionally refresh the recorded hashes while still on the protected baseline:

```powershell
node .\scripts\verify-public-baseline.mjs --write
```

Hash changes alone do not prove a regression because framework chunk IDs and sitemap timestamps may change. Route presence, SEO, assistant behavior and visual deploy-preview parity are the release gates.

## Migration Release Gate

Do not change the production Netlify package directory or publish settings until all conditions pass:

1. `apps/website` builds successfully using the pinned Netlify Node version.
2. Every public route exists in the deploy preview.
3. SEO metadata, sitemap, robots and structured data match this baseline.
4. The public assistant opens, restores its session and reaches all three public API endpoints.
5. Desktop and mobile visual checks show no migration regression.
6. The current production deploy remains available as the rollback target.

## Rollback

If preview parity fails, keep production on the existing Netlify configuration and baseline deploy. Do not partially point the public domain at the workspace application or the new monorepo package directory.
