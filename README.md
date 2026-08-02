# Duka Intelligence Frontend

Frontend monorepo for Duka Intelligence.

## Applications

- `apps/website`: public, SEO-optimized Next.js website deployed as a static export.
- `apps/workspace`: authenticated operational application, added in the next migration phase.

## Shared Packages

- `packages/ui`: shared visual primitives.
- `packages/api-client`: generated and typed Duka API contracts.
- `packages/auth`: provider-neutral authentication and session contracts.
- `packages/config`: shared frontend tooling configuration.

## Commands

```bash
npm install
npm run dev
npm run build
npm run verify:website
npm run build:moon
```

The root uses npm workspaces for dependency management and moonrepo for project-aware task orchestration. Netlify builds from the repository root and publishes `apps/website/out`.
