export interface MessageTemplateView {
  template_record_id: string;
  provider_template_id: string | null;
  name: string;
  language: string;
  category: string;
  components: Array<Record<string, unknown>>;
  layout_type: string;
  parameter_format: "named" | "positional";
  definition: Record<string, unknown>;
  send_schema: {
    version: number;
    parameter_format: "named" | "positional";
    fields: Array<{
      key: string;
      component: "header" | "body" | "button";
      value_type: "text" | "currency" | "date_time" | "image" | "video" | "document" | "location" | "quick_reply" | "url_suffix" | "copy_code";
      label: string;
      required: boolean;
      position?: number;
      parameter_name?: string;
      index?: number;
    }>;
  };
  validation_errors: Array<{ severity: "error" | "warning"; code: string; message: string; path: string }>;
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

export interface MessageTemplateListView {
  templates: MessageTemplateView[];
}

export interface WhatsAppContactView {
  contact_id: string;
  recipient: string;
  display_phone_number: string;
  contact_type: string;
  identity_status: string;
  marketing_consent_status: string;
  last_seen_at: string;
}

export interface WhatsAppContactListView {
  contacts: WhatsAppContactView[];
}

export interface WorkspaceMessageView {
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

export interface WorkspaceMessageListView {
  messages: WorkspaceMessageView[];
}
