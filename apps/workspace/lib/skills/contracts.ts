import type {
  JsonSchema,
  SkillBindingStatus,
  WhatsAppAsset,
  WorkspaceSkillDetail,
  WorkspaceSkillSummary,
} from "@duka/api-client";

export type { JsonSchema, SkillBindingStatus, WhatsAppAsset, WorkspaceSkillDetail, WorkspaceSkillSummary };

export interface SkillsView {
  workspace_id: string;
  skills: WorkspaceSkillSummary[];
}

export interface SkillDetailView {
  workspace_id: string;
  skill: WorkspaceSkillDetail;
}

export interface SkillValidationView {
  workspace_id: string;
  skill_id: string;
  valid: boolean;
  errors: string[];
  config_version: number;
}

export interface WhatsAppAssetsView {
  workspace_id: string;
  channel_id: string;
  assets: WhatsAppAsset[];
}

export interface BffFailure {
  error?: { code?: string; message?: string; detail?: string | null };
  request_id?: string;
}
