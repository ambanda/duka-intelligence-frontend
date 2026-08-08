import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("apps/workspace/.next/static");
const forbiddenNames = ["OIDC_CLIENT_SECRET", "WORKSPACE_SESSION_SECRET", "refreshToken", "accessTokenExpiresAt"];
const forbiddenValues = [process.env.OIDC_CLIENT_SECRET, process.env.WORKSPACE_SESSION_SECRET].filter((value) => value && value.length >= 8);

async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory() ? files(path.join(directory, entry.name)) : [path.join(directory, entry.name)]))).flat();
}

const findings = [];
for (const file of await files(root)) {
  if (!/\.(js|css|json|map)$/.test(file)) continue;
  const text = await readFile(file, "utf8");
  for (const value of [...forbiddenNames, ...forbiddenValues]) if (text.includes(value)) findings.push(`${path.relative(root, file)}: ${value}`);
}
if (findings.length) throw new Error(`Sensitive server identifiers found in browser bundle:\n${findings.join("\n")}`);
console.log("Workspace browser bundle contains no configured session or OIDC secrets");
