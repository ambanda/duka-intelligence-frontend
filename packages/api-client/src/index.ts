export interface WorkspaceSummary {
  tenant_id: string;
  client_id: string | null;
  workspace_id: string;
  organization_id: string | null;
  sectors: string[];
  shop_ids: string[];
  roles: string[];
  permission_sets: string[];
  channel_count: number;
}

export interface MeResponse {
  principal_id: string;
  email: string | null;
  display_name: string | null;
  workspace_count: number;
}

export interface WorkspaceListResponse {
  principal_id: string;
  workspaces: WorkspaceSummary[];
}

export interface WorkspaceDetailResponse {
  workspace: WorkspaceSummary;
}

export interface WebhookHealth {
  status: string;
  healthy: boolean;
  last_received_at: string | null;
}

export interface ChannelOnboardingStatus {
  session_id: string;
  status: string;
  required_action: string | null;
  error_code: string | null;
  error_summary: string | null;
  expires_at: string | null;
  completed_at: string | null;
}

export interface ChannelSummary {
  channel_id: string;
  channel_type: string;
  transport: string;
  display_number: string | null;
  display_name: string;
  status: string;
  channel_account_id: string;
  provider_account_id: string | null;
  provider_business_id: string | null;
  tenant_id: string;
  client_id: string | null;
  workspace_id: string;
  organization_id: string | null;
  sector: string;
  default_shop_id: string;
  webhook_health: WebhookHealth;
  onboarding_status: ChannelOnboardingStatus | null;
  token_expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PendingOnboardingSession {
  session_id: string;
  status: string;
  sector: string;
  shop_id: string;
  bot_phone_number: string | null;
  display_name: string | null;
  required_action: string | null;
  error_code: string | null;
  error_summary: string | null;
  expires_at: string;
  updated_at: string;
}

export interface WorkspaceChannelsResponse {
  workspace_id: string;
  channels: ChannelSummary[];
  pending_onboarding_sessions: PendingOnboardingSession[];
}

export interface ChannelDetailResponse {
  channel: ChannelSummary;
}

export type SkillBindingStatus = "not_configured" | "draft" | "active" | "disabled";

export interface WorkspaceSkillSummary {
  skill_id: string;
  sector: string;
  skill_name: string;
  description: string;
  interaction_profile: string;
  workflow_id: string | null;
  workflow_version: number | null;
  risk_level: string;
  supported_channels: string[];
  binding_status: SkillBindingStatus;
  enabled: boolean;
  config_version: number | null;
}

export interface WorkspaceSkillListResponse {
  workspace_id: string;
  skills: WorkspaceSkillSummary[];
}

export interface WorkspaceSkillDetail extends WorkspaceSkillSummary {
  allowed_roles: string[];
  required_permission_set: string;
  config_schema: JsonSchema;
  published_config: Record<string, unknown>;
  draft_config: Record<string, unknown>;
  validation_errors: string[];
  published_at: string | null;
  published_by_principal_id: string | null;
}

export interface WorkspaceSkillDetailResponse {
  workspace_id: string;
  skill: WorkspaceSkillDetail;
}

export interface WorkspaceSkillDraftInput {
  config: Record<string, unknown>;
  expected_version?: number | null;
}

export interface WorkspaceSkillValidationResponse {
  workspace_id: string;
  skill_id: string;
  valid: boolean;
  errors: string[];
  config_version: number;
}

export interface WorkspaceSkillPublishInput {
  expected_version: number;
}

export interface WhatsAppAsset {
  asset_id: string;
  name: string;
  asset_type: "flow" | "template";
  status: string;
  language: string | null;
}

export interface WhatsAppAssetsResponse {
  workspace_id: string;
  channel_id: string;
  assets: WhatsAppAsset[];
}

export type WhatsAppTemplateCategory = "UTILITY" | "MARKETING";
export type WhatsAppTemplateParameterFormat = "named" | "positional";
export type WhatsAppTemplateValueType = "text" | "currency" | "date_time";

export interface WhatsAppTemplateParameterDefinition {
  name: string;
  label?: string | null;
  example: string;
  value_type: WhatsAppTemplateValueType;
}

export interface WhatsAppTemplateHeaderDefinition {
  format: "TEXT" | "IMAGE" | "VIDEO" | "DOCUMENT" | "LOCATION";
  text?: string | null;
  parameters: WhatsAppTemplateParameterDefinition[];
  example_media_handle?: string | null;
}

export interface WhatsAppTemplateButtonDefinition {
  type: "QUICK_REPLY" | "URL" | "PHONE_NUMBER" | "COPY_CODE";
  text?: string | null;
  url?: string | null;
  phone_number?: string | null;
  example?: string | null;
  action_key?: string | null;
}

export interface WhatsAppTemplateDefinition {
  parameter_format: WhatsAppTemplateParameterFormat;
  header?: WhatsAppTemplateHeaderDefinition | null;
  body: { text: string; parameters: WhatsAppTemplateParameterDefinition[] };
  footer_text?: string | null;
  buttons: WhatsAppTemplateButtonDefinition[];
}

export interface WhatsAppTemplateSendField {
  key: string;
  component: "header" | "body" | "button";
  value_type: "text" | "currency" | "date_time" | "image" | "video" | "document" | "location" | "quick_reply" | "url_suffix" | "copy_code";
  label: string;
  required: boolean;
  position?: number;
  parameter_name?: string;
  index?: number;
}

export interface WhatsAppTemplateSendSchema {
  version: number;
  parameter_format: WhatsAppTemplateParameterFormat;
  fields: WhatsAppTemplateSendField[];
}

export interface WhatsAppTemplatePreflightIssue {
  severity: "error" | "warning";
  code: string;
  message: string;
  path: string;
}

export interface WhatsAppTemplatePreflightResponse {
  valid: boolean;
  issues: WhatsAppTemplatePreflightIssue[];
  components: Array<Record<string, unknown>>;
  send_schema: WhatsAppTemplateSendSchema;
}

export interface WhatsAppMessageTemplate {
  template_record_id: string;
  channel_id: string;
  provider_template_id: string | null;
  name: string;
  language: string;
  category: WhatsAppTemplateCategory | "AUTHENTICATION";
  components: Array<Record<string, unknown>>;
  layout_type: string;
  parameter_format: WhatsAppTemplateParameterFormat;
  definition: WhatsAppTemplateDefinition | Record<string, never>;
  send_schema: WhatsAppTemplateSendSchema;
  validation_errors: WhatsAppTemplatePreflightIssue[];
  draft_version: number;
  quality_score: string;
  quality_updated_at: string | null;
  status: string;
  source: string;
  rejection_reason: string | null;
  submitted_at: string | null;
  last_reconciled_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface WhatsAppMessageTemplateListResponse {
  templates: WhatsAppMessageTemplate[];
}

export interface CreateWhatsAppMessageTemplateRequest {
  name: string;
  language: string;
  category: WhatsAppTemplateCategory;
  header_text?: string | null;
  header_example?: string | null;
  body_text: string;
  body_examples: string[];
  footer_text?: string | null;
  quick_replies: string[];
  idempotency_key: string;
}

export interface CreateWhatsAppTemplateDraftRequest {
  name: string;
  language: string;
  category: WhatsAppTemplateCategory;
  definition: WhatsAppTemplateDefinition;
  idempotency_key: string;
}

export interface UpdateWhatsAppTemplateDraftRequest extends Omit<CreateWhatsAppTemplateDraftRequest, "idempotency_key"> {
  draft_version: number;
}

export interface WhatsAppTemplateReconciliationResponse {
  channel_id: string;
  reconciled: number;
  approved: number;
  pending: number;
  rejected: number;
}

export interface WhatsAppContact {
  contact_id: string;
  phone_number_e164: string;
  contact_type: string;
  identity_status: string;
  marketing_consent_status: string;
  status: string;
  last_seen_at: string;
}

export interface WhatsAppContactListResponse {
  contacts: WhatsAppContact[];
}

export interface SendWorkspaceWhatsAppTemplateRequest {
  recipient: string;
  template_record_id: string;
  body_parameters: string[];
  header_parameters: string[];
  values?: Record<string, unknown>;
  purpose: string;
  business_reference: string;
  idempotency_key: string;
}

export interface WorkspaceWhatsAppMessage {
  request_id: string;
  message_record_id: string;
  provider_message_id: string | null;
  template_name: string;
  template_category: string;
  processing_status: string;
  delivery_status: string | null;
  error_code: string | null;
  sent_at: string | null;
  delivered_at: string | null;
  read_at: string | null;
  created_at: string | null;
}

export interface WorkspaceWhatsAppMessageListResponse {
  messages: WorkspaceWhatsAppMessage[];
}

export interface JsonSchema {
  type?: "object" | "array" | "string" | "integer" | "number" | "boolean";
  title?: string;
  description?: string;
  enum?: Array<string | number | boolean>;
  properties?: Record<string, JsonSchema>;
  required?: string[];
  items?: JsonSchema;
  additionalProperties?: boolean | JsonSchema;
  minimum?: number;
  maximum?: number;
  maxLength?: number;
  minItems?: number;
  minProperties?: number;
  default?: unknown;
}

export interface CreateOnboardingSessionRequest {
  sector?: string | null;
  shop_id?: string | null;
}

export interface CreateOnboardingSessionResponse {
  session_id: string;
  status: string;
  state: string;
  expires_at: string;
  meta_app_id: string;
  meta_configuration_id: string;
  embedded_signup_version: "v3" | "v4";
  graph_api_version: string;
}

export interface CompleteEmbeddedSignupRequest {
  session_id: string;
  state: string;
  authorization_code: string;
  waba_id: string;
  phone_number_id?: string | null;
  meta_business_id?: string | null;
  completion_type?: "phone_complete" | "phone_pending" | "waba_only" | null;
  meta_event_name?: string | null;
  registration_pin?: string | null;
}

export interface OnboardingStatusResponse {
  session_id: string;
  channel_id: string | null;
  status: string;
  workspace_id: string;
  embedded_signup_version: "v3" | "v4";
  completion_type: string | null;
  phone_setup_status: string;
  waba_id: string | null;
  phone_number_id: string | null;
  bot_phone_number: string | null;
  display_name: string | null;
  expires_at: string;
  error_code: string | null;
  error_summary: string | null;
  required_action: string | null;
}

export class DukaApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code: string,
    readonly requestId: string,
    readonly detail: string | null = null,
  ) {
    super(message);
    this.name = "DukaApiError";
  }
}

export interface DukaApiClientOptions {
  baseUrl: string;
  getAccessToken?: () => Promise<string | null>;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
  requestIdFactory?: () => string;
  developmentPrincipalId?: string;
}

export class DukaApiClient {
  private readonly baseUrl: string;
  private readonly getAccessToken?: () => Promise<string | null>;
  private readonly timeoutMs: number;
  private readonly fetchImpl: typeof fetch;
  private readonly requestIdFactory: () => string;
  private readonly developmentPrincipalId?: string;

  constructor(options: DukaApiClientOptions) {
    this.baseUrl = options.baseUrl.replace(/\/$/, "");
    this.getAccessToken = options.getAccessToken;
    this.timeoutMs = options.timeoutMs ?? 10_000;
    this.fetchImpl = options.fetchImpl ?? fetch;
    this.requestIdFactory = options.requestIdFactory ?? (() => crypto.randomUUID());
    this.developmentPrincipalId = options.developmentPrincipalId;
  }

  getMe(): Promise<MeResponse> {
    return this.get("/v1/me");
  }

  listWorkspaces(): Promise<WorkspaceListResponse> {
    return this.get("/v1/me/workspaces");
  }

  getWorkspace(workspaceId: string): Promise<WorkspaceDetailResponse> {
    return this.get(`/v1/workspaces/${encodeURIComponent(workspaceId)}`);
  }

  listChannels(workspaceId: string): Promise<WorkspaceChannelsResponse> {
    return this.get(`/v1/workspaces/${encodeURIComponent(workspaceId)}/channels`);
  }

  getChannel(workspaceId: string, channelId: string): Promise<ChannelDetailResponse> {
    return this.get(
      `/v1/workspaces/${encodeURIComponent(workspaceId)}/channels/${encodeURIComponent(channelId)}`,
    );
  }

  listSkills(workspaceId: string): Promise<WorkspaceSkillListResponse> {
    return this.get(`/v1/workspaces/${encodeURIComponent(workspaceId)}/skills`);
  }

  getSkill(workspaceId: string, skillId: string): Promise<WorkspaceSkillDetailResponse> {
    return this.get(`/v1/workspaces/${encodeURIComponent(workspaceId)}/skills/${encodeURIComponent(skillId)}`);
  }

  saveSkillDraft(
    workspaceId: string,
    skillId: string,
    payload: WorkspaceSkillDraftInput,
  ): Promise<WorkspaceSkillDetailResponse> {
    return this.request(
      "PUT",
      `/v1/workspaces/${encodeURIComponent(workspaceId)}/skills/${encodeURIComponent(skillId)}/draft`,
      payload,
    );
  }

  validateSkill(workspaceId: string, skillId: string): Promise<WorkspaceSkillValidationResponse> {
    return this.request(
      "POST",
      `/v1/workspaces/${encodeURIComponent(workspaceId)}/skills/${encodeURIComponent(skillId)}/validate`,
    );
  }

  publishSkill(
    workspaceId: string,
    skillId: string,
    payload: WorkspaceSkillPublishInput,
  ): Promise<WorkspaceSkillDetailResponse> {
    return this.request(
      "POST",
      `/v1/workspaces/${encodeURIComponent(workspaceId)}/skills/${encodeURIComponent(skillId)}/publish`,
      payload,
    );
  }

  disableSkill(workspaceId: string, skillId: string): Promise<WorkspaceSkillDetailResponse> {
    return this.request(
      "POST",
      `/v1/workspaces/${encodeURIComponent(workspaceId)}/skills/${encodeURIComponent(skillId)}/disable`,
    );
  }

  listWhatsappAssets(workspaceId: string, channelId: string): Promise<WhatsAppAssetsResponse> {
    return this.get(
      `/v1/workspaces/${encodeURIComponent(workspaceId)}/channels/${encodeURIComponent(channelId)}/whatsapp-assets`,
    );
  }

  listWhatsappMessageTemplates(
    workspaceId: string,
    channelId: string,
  ): Promise<WhatsAppMessageTemplateListResponse> {
    return this.get(
      `/v1/workspaces/${encodeURIComponent(workspaceId)}/channels/${encodeURIComponent(channelId)}/message-templates`,
    );
  }

  createWhatsappMessageTemplate(
    workspaceId: string,
    channelId: string,
    payload: CreateWhatsAppMessageTemplateRequest,
  ): Promise<WhatsAppMessageTemplate> {
    return this.request(
      "POST",
      `/v1/workspaces/${encodeURIComponent(workspaceId)}/channels/${encodeURIComponent(channelId)}/message-templates`,
      payload,
    );
  }

  createWhatsappTemplateDraft(
    workspaceId: string,
    channelId: string,
    payload: CreateWhatsAppTemplateDraftRequest,
  ): Promise<WhatsAppMessageTemplate> {
    return this.request(
      "POST",
      `/v1/workspaces/${encodeURIComponent(workspaceId)}/channels/${encodeURIComponent(channelId)}/message-templates/drafts`,
      payload,
    );
  }

  updateWhatsappTemplateDraft(
    workspaceId: string,
    channelId: string,
    templateRecordId: string,
    payload: UpdateWhatsAppTemplateDraftRequest,
  ): Promise<WhatsAppMessageTemplate> {
    return this.request(
      "PUT",
      `/v1/workspaces/${encodeURIComponent(workspaceId)}/channels/${encodeURIComponent(channelId)}/message-templates/${encodeURIComponent(templateRecordId)}/draft`,
      payload,
    );
  }

  validateWhatsappTemplateDraft(
    workspaceId: string,
    channelId: string,
    templateRecordId: string,
  ): Promise<WhatsAppTemplatePreflightResponse> {
    return this.request(
      "POST",
      `/v1/workspaces/${encodeURIComponent(workspaceId)}/channels/${encodeURIComponent(channelId)}/message-templates/${encodeURIComponent(templateRecordId)}/validate`,
    );
  }

  submitWhatsappTemplateDraft(
    workspaceId: string,
    channelId: string,
    templateRecordId: string,
    idempotencyKey: string,
  ): Promise<WhatsAppMessageTemplate> {
    return this.request(
      "POST",
      `/v1/workspaces/${encodeURIComponent(workspaceId)}/channels/${encodeURIComponent(channelId)}/message-templates/${encodeURIComponent(templateRecordId)}/submit`,
      { idempotency_key: idempotencyKey },
    );
  }

  reconcileWhatsappMessageTemplates(
    workspaceId: string,
    channelId: string,
  ): Promise<WhatsAppTemplateReconciliationResponse> {
    return this.request(
      "POST",
      `/v1/workspaces/${encodeURIComponent(workspaceId)}/channels/${encodeURIComponent(channelId)}/message-templates/reconcile`,
    );
  }

  async deleteWhatsappMessageTemplate(
    workspaceId: string,
    channelId: string,
    templateRecordId: string,
  ): Promise<void> {
    await this.request(
      "DELETE",
      `/v1/workspaces/${encodeURIComponent(workspaceId)}/channels/${encodeURIComponent(channelId)}/message-templates/${encodeURIComponent(templateRecordId)}`,
    );
  }

  listWhatsappContacts(
    workspaceId: string,
    channelId: string,
  ): Promise<WhatsAppContactListResponse> {
    return this.get(
      `/v1/workspaces/${encodeURIComponent(workspaceId)}/channels/${encodeURIComponent(channelId)}/contacts`,
    );
  }

  listWorkspaceWhatsappMessages(
    workspaceId: string,
    channelId: string,
  ): Promise<WorkspaceWhatsAppMessageListResponse> {
    return this.get(
      `/v1/workspaces/${encodeURIComponent(workspaceId)}/channels/${encodeURIComponent(channelId)}/messages`,
    );
  }

  sendWorkspaceWhatsappTemplate(
    workspaceId: string,
    channelId: string,
    payload: SendWorkspaceWhatsAppTemplateRequest,
  ): Promise<WorkspaceWhatsAppMessage> {
    return this.request(
      "POST",
      `/v1/workspaces/${encodeURIComponent(workspaceId)}/channels/${encodeURIComponent(channelId)}/messages`,
      payload,
    );
  }

  getWorkspaceWhatsappMessage(
    workspaceId: string,
    channelId: string,
    requestId: string,
  ): Promise<WorkspaceWhatsAppMessage> {
    return this.get(
      `/v1/workspaces/${encodeURIComponent(workspaceId)}/channels/${encodeURIComponent(channelId)}/messages/${encodeURIComponent(requestId)}`,
    );
  }

  createWhatsappOnboardingSession(
    workspaceId: string,
    payload: CreateOnboardingSessionRequest,
  ): Promise<CreateOnboardingSessionResponse> {
    return this.request("POST", `/v1/workspaces/${encodeURIComponent(workspaceId)}/channels/whatsapp/onboarding-sessions`, payload);
  }

  completeWhatsappOnboarding(payload: CompleteEmbeddedSignupRequest): Promise<OnboardingStatusResponse> {
    return this.request("POST", "/v1/channels/whatsapp/meta/onboarding/complete", payload);
  }

  getWhatsappOnboardingStatus(sessionId: string): Promise<OnboardingStatusResponse> {
    return this.get(`/v1/channels/whatsapp/meta/onboarding/${encodeURIComponent(sessionId)}`);
  }

  resumeWhatsappOnboarding(sessionId: string, registrationPin: string): Promise<OnboardingStatusResponse> {
    return this.request("POST", `/v1/channels/whatsapp/meta/onboarding/${encodeURIComponent(sessionId)}/resume`, {
      registration_pin: registrationPin,
    });
  }

  verifyChannel(workspaceId: string, channelId: string): Promise<OnboardingStatusResponse> {
    return this.request(
      "POST",
      `/v1/workspaces/${encodeURIComponent(workspaceId)}/channels/${encodeURIComponent(channelId)}/verify`,
      { activation_evidence: "webhook" },
    );
  }

  async disconnectChannel(workspaceId: string, channelId: string, reason?: string): Promise<void> {
    await this.request(
      "DELETE",
      `/v1/workspaces/${encodeURIComponent(workspaceId)}/channels/${encodeURIComponent(channelId)}`,
      reason ? { reason } : undefined,
    );
  }

  private async get<T>(path: string): Promise<T> {
    return this.request("GET", path);
  }

  private async request<T>(method: "DELETE" | "GET" | "POST" | "PUT", path: string, body?: unknown): Promise<T> {
    const requestId = this.requestIdFactory();
    const token = await this.getAccessToken?.();
    let lastError: unknown;

    const attempts = method === "GET" ? 2 : 1;
    for (let attempt = 0; attempt < attempts; attempt += 1) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
      try {
        const response = await this.fetchImpl(`${this.baseUrl}${path}`, {
          method,
          headers: {
            Accept: "application/json",
            "x-request-id": requestId,
            ...(body === undefined ? {} : { "Content-Type": "application/json" }),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(this.developmentPrincipalId ? { "x-duka-principal-id": this.developmentPrincipalId } : {}),
          },
          body: body === undefined ? undefined : JSON.stringify(body),
          cache: "no-store",
          signal: controller.signal,
        });

        if (response.ok) {
          if (response.status === 204) return undefined as T;
          return (await response.json()) as T;
        }

        const retryable = method === "GET" && [502, 503, 504].includes(response.status);
        if (retryable && attempt === 0) {
          continue;
        }

        const errorBody = await response.json().catch(() => null) as { detail?: unknown; error?: { code?: unknown; message?: unknown } } | null;
        const detail = typeof errorBody?.detail === "string"
          ? errorBody.detail
          : typeof errorBody?.error?.message === "string"
            ? errorBody.error.message
            : null;
        const code = typeof errorBody?.error?.code === "string" ? errorBody.error.code : "duka_api_request_failed";
        throw new DukaApiError(
          detail ?? `Duka API request failed with status ${response.status}.`,
          response.status,
          code,
          requestId,
          detail,
        );
      } catch (error) {
        lastError = error;
        if (error instanceof DukaApiError) {
          throw error;
        }
        if (attempt >= attempts - 1) {
          throw new DukaApiError(
            error instanceof Error ? error.message : "Duka API request failed.",
            0,
            "duka_api_unreachable",
            requestId,
          );
        }
      } finally {
        clearTimeout(timeout);
      }
    }

    throw new DukaApiError(
      lastError instanceof Error ? lastError.message : "Duka API request failed.",
      0,
      "duka_api_unreachable",
      requestId,
    );
  }
}
