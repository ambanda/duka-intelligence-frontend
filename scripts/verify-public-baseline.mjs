import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const websiteRoot = existsSync(join(root, "apps", "website", "package.json"))
  ? join(root, "apps", "website")
  : root;
const outputRoot = join(websiteRoot, "out");
const baselinePath = join(root, "docs", "migration", "public-site-baseline.json");

const routes = [
  ["/", "index.html"],
  ["/about", "about.html"],
  ["/ai-assistant", "ai-assistant.html"],
  ["/aup", "aup.html"],
  ["/contact", "contact.html"],
  ["/dpa", "dpa.html"],
  ["/industries", "industries.html"],
  ["/integrations", "integrations.html"],
  ["/platform", "platform.html"],
  ["/pricing", "pricing.html"],
  ["/privacy", "privacy.html"],
  ["/product", "product.html"],
  ["/terms", "terms.html"],
  ["/trust", "trust.html"],
  ["/robots.txt", "robots.txt"],
  ["/sitemap.xml", "sitemap.xml"],
];

const requiredHomeContent = [
  "<title>Duka Intelligence</title>",
  "Duka Intelligence unifies enterprise knowledge into a governed AI platform",
  "https://dukaintelligence.co.ke",
  "Open Duka Intelligence assistant",
  "Ask Duka",
];

const assistantContract = {
  environmentVariable: "NEXT_PUBLIC_DUKA_PUBLIC_API_BASE_URL",
  defaultApiBaseUrl: "https://api.dukaintelligence.co.ke",
  endpoints: ["/public/chat/bootstrap", "/public/chat", "/public/leads"],
  browserPersistence: [
    "duka_public_assistant_visitor_id",
    "duka_public_assistant_session_id",
    "duka_public_assistant_messages",
  ],
};

function gitValue(args, fallback) {
  try {
    return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
  } catch {
    return fallback;
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function sha256(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

assert(existsSync(outputRoot), `Static output is missing: ${outputRoot}`);

const routeOutput = routes.map(([route, output]) => {
  const path = join(outputRoot, output);
  assert(existsSync(path), `Missing static output for ${route}: ${output}`);
  return {
    route,
    output,
    bytes: statSync(path).size,
    sha256: sha256(path),
  };
});

const home = readFileSync(join(outputRoot, "index.html"), "utf8");
for (const content of requiredHomeContent) {
  assert(home.includes(content), `Home output no longer contains: ${content}`);
}

const apiSource = readFileSync(join(websiteRoot, "lib", "publicAssistantApi.ts"), "utf8");
const chatSource = readFileSync(join(websiteRoot, "components", "PublicAssistantChat.tsx"), "utf8");
assert(apiSource.includes(assistantContract.environmentVariable), "Public assistant API environment variable changed");
assert(apiSource.includes(assistantContract.defaultApiBaseUrl), "Public assistant default API URL changed");
for (const endpoint of assistantContract.endpoints) {
  assert(apiSource.includes(endpoint), `Public assistant endpoint changed: ${endpoint}`);
}
for (const storageKey of assistantContract.browserPersistence) {
  assert(chatSource.includes(storageKey), `Public assistant persistence key changed: ${storageKey}`);
}

const netlify = readFileSync(join(root, "netlify.toml"), "utf8");
assert(netlify.includes('command = "npm run build"'), "Netlify build command changed");
assert(
  netlify.includes('publish = "apps/website/out"'),
  "Netlify publish directory is not the website workspace output",
);
assert(netlify.includes('NODE_VERSION = "20.20.0"'), "Netlify Node version changed");

const nextConfig = readFileSync(join(websiteRoot, "next.config.js"), "utf8");
assert(nextConfig.includes('output: "export"'), "Website is no longer configured as a static export");

const snapshot = {
  schemaVersion: 1,
  capturedAt: new Date().toISOString(),
  branch: gitValue(["branch", "--show-current"], "migration/frontend-workspaces"),
  baseCommit: gitValue(["rev-parse", "HEAD"], "05f4fc93c464f5957fe9f47d1485bb711b71a1ca"),
  localNodeVersion: process.version,
  netlifyNodeVersion: "20.20.0",
  websiteRoot: relative(root, websiteRoot) || ".",
  buildCommand: "npm run build",
  publishDirectory: relative(root, outputRoot).replaceAll("\\", "/"),
  routeOutput,
  metadataContract: {
    title: "Duka Intelligence",
    canonicalOrigin: "https://dukaintelligence.co.ke",
    robots: "index, follow",
    sitemap: "https://dukaintelligence.co.ke/sitemap.xml",
  },
  assistantContract,
};

if (process.argv.includes("--write")) {
  writeFileSync(baselinePath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  console.log(`Wrote ${relative(root, baselinePath)}`);
} else {
  console.log(`Public website baseline verified: ${routeOutput.length} routes/assets`);
}
