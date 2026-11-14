"use client";

import { useCallback } from "react";

export type OperationRow = Record<string, unknown>;
export const field = (row: OperationRow, key: string) => String(row[key] ?? "");
export const rows = (value: unknown): OperationRow[] => Array.isArray(value) ? value as OperationRow[] : [];
export const labels = (value: unknown): string[] => Array.isArray(value) ? value.map(String) : [];

export function useOperations(workspaceSlug: string, csrfToken: string) {
  return useCallback(async (path: string, method = "GET", body?: unknown): Promise<OperationRow> => {
    const response = await fetch(`/api/bff/workspaces/${encodeURIComponent(workspaceSlug)}/operations/${path}`, {
      method, cache: "no-store", headers: { "Content-Type": "application/json", "x-duka-csrf": csrfToken },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error?.message || result.detail || "Workspace operation failed.");
    return result;
  }, [workspaceSlug, csrfToken]);
}
