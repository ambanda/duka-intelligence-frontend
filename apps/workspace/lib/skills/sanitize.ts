import type { WhatsAppAssetsResponse, WorkspaceSkillDetailResponse, WorkspaceSkillListResponse } from "@duka/api-client";

import type { SkillDetailView, SkillsView, WhatsAppAssetsView } from "./contracts";

export function sanitizeSkills(value: WorkspaceSkillListResponse): SkillsView {
  return {
    workspace_id: value.workspace_id,
    skills: value.skills.map((skill) => ({
      skill_id: skill.skill_id,
      sector: skill.sector,
      skill_name: skill.skill_name,
      description: skill.description,
      interaction_profile: skill.interaction_profile,
      workflow_id: skill.workflow_id,
      workflow_version: skill.workflow_version,
      risk_level: skill.risk_level,
      supported_channels: [...skill.supported_channels],
      binding_status: skill.binding_status,
      enabled: skill.enabled,
      config_version: skill.config_version,
    })),
  };
}

export function sanitizeSkillDetail(value: WorkspaceSkillDetailResponse): SkillDetailView {
  const { skill } = value;
  const summary = sanitizeSkills({ workspace_id: value.workspace_id, skills: [skill] }).skills[0];
  if (!summary) throw new Error("Skill response is empty.");
  return {
    workspace_id: value.workspace_id,
    skill: {
      ...summary,
      allowed_roles: [...skill.allowed_roles],
      required_permission_set: skill.required_permission_set,
      config_schema: structuredClone(skill.config_schema),
      published_config: structuredClone(skill.published_config),
      draft_config: structuredClone(skill.draft_config),
      validation_errors: [...skill.validation_errors],
      published_at: skill.published_at,
      published_by_principal_id: skill.published_by_principal_id,
    },
  };
}

export function sanitizeWhatsappAssets(value: WhatsAppAssetsResponse): WhatsAppAssetsView {
  return {
    workspace_id: value.workspace_id,
    channel_id: value.channel_id,
    assets: value.assets.map((asset) => ({
      asset_id: asset.asset_id,
      name: asset.name,
      asset_type: asset.asset_type,
      status: asset.status,
      language: asset.language,
    })),
  };
}
