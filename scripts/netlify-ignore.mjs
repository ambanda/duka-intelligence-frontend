import { spawnSync } from "node:child_process";

const target = process.argv[2];
const base = process.env.CACHED_COMMIT_REF;
const head = process.env.COMMIT_REF;

if (!base || !head || !["website", "workspace"].includes(target)) process.exit(1);

const result = spawnSync("git", ["diff", "--name-only", base, head], { encoding: "utf8" });
if (result.status !== 0) process.exit(1);

const shared = ["packages/", "package.json", "package-lock.json", ".moon/", "scripts/netlify-ignore.mjs"];
const relevant = target === "website"
  ? ["apps/website/", "netlify.toml", ...shared]
  : ["apps/workspace/", ...shared];
const changed = result.stdout.split(/\r?\n/).filter(Boolean);

// Netlify ignore commands exit 0 to cancel a build and 1 to continue it.
process.exit(changed.some((file) => relevant.some((prefix) => file === prefix || file.startsWith(prefix))) ? 1 : 0);
