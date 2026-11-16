import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";

const subprocessTimeoutMs = 10_000;

it("builds both sites for explicit releases but skips irrelevant ordinary changes", () => {
  const directory = mkdtempSync(join(tmpdir(), "duka-netlify-release-"));
  const script = fileURLToPath(new URL("../../../scripts/netlify-ignore.mjs", import.meta.url));
  const git = (...args: string[]) => execFileSync("git", ["-C", directory, ...args], {
    encoding: "utf8", timeout: subprocessTimeoutMs, windowsHide: true,
  }).trim();
  try {
    git("init", "-b", "main");
    git("config", "user.name", "Release test"); git("config", "user.email", "release@example.invalid");
    git("commit", "--allow-empty", "-m", "baseline");
    const base = git("rev-parse", "HEAD");
    writeFileSync(join(directory, "notes.md"), "Not an application change.");
    git("add", "notes.md"); git("commit", "-m", "docs: notes");
    const ordinaryCommit = git("rev-parse", "HEAD");
    for (const target of ["website", "workspace"]) {
      const result = spawnSync(process.execPath, [script, target], {
        cwd: directory, encoding: "utf8", timeout: subprocessTimeoutMs, windowsHide: true,
        env: { ...process.env, CACHED_COMMIT_REF: base, COMMIT_REF: ordinaryCommit },
      });
      if (result.error) throw result.error;
      expect(result.status, result.stderr || result.stdout).toBe(0);
    }
    git("commit", "--allow-empty", "-m", "[duka-deploy] publish release");
    const releaseCommit = git("rev-parse", "HEAD");
    for (const target of ["website", "workspace"]) {
      const result = spawnSync(process.execPath, [script, target], {
        cwd: directory, encoding: "utf8", timeout: subprocessTimeoutMs, windowsHide: true,
        env: { ...process.env, CACHED_COMMIT_REF: base, COMMIT_REF: releaseCommit },
      });
      if (result.error) throw result.error;
      expect(result.status, result.stderr || result.stdout).toBe(1);
    }
  } finally {
    const target = resolve(directory);
    if (dirname(target) !== resolve(tmpdir()) || !basename(target).startsWith("duka-netlify-release-")) throw new Error("Unexpected test cleanup path");
    rmSync(target, { recursive: true, force: true });
  }
// This process-level check includes Git startup and temporary-repository I/O on Windows.
}, 30_000);
