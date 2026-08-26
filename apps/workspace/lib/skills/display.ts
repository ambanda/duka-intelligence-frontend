import type { SkillBindingStatus } from "./contracts";

export function humanize(value: string): string {
  return value.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function bindingLabel(status: SkillBindingStatus): string {
  if (status === "not_configured") return "Not configured";
  return humanize(status);
}

export function bindingTone(status: SkillBindingStatus): "neutral" | "success" | "warning" | "danger" {
  if (status === "active") return "success";
  if (status === "draft") return "warning";
  if (status === "disabled") return "danger";
  return "neutral";
}

export function riskTone(risk: string): "neutral" | "success" | "warning" | "danger" {
  if (risk === "transactional") return "danger";
  if (risk === "regulated") return "warning";
  if (risk === "read_only") return "success";
  return "neutral";
}
