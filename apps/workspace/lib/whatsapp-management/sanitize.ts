import "server-only";

import type {
  WhatsAppContact,
  WhatsAppContactListResponse,
  WhatsAppMessageTemplate,
  WhatsAppMessageTemplateListResponse,
  WorkspaceWhatsAppMessage,
  WorkspaceWhatsAppMessageListResponse,
} from "@duka/api-client";

import type {
  MessageTemplateListView,
  MessageTemplateView,
  WhatsAppContactListView,
  WhatsAppContactView,
  WorkspaceMessageListView,
  WorkspaceMessageView,
} from "./contracts";

function displayPhoneNumber(phone: string): string {
  if (phone.length <= 7) return phone;
  return `${phone.slice(0, 4)} *** ${phone.slice(-4)}`;
}

export function sanitizeMessageTemplate(template: WhatsAppMessageTemplate): MessageTemplateView {
  return {
    template_record_id: template.template_record_id,
    provider_template_id: template.provider_template_id,
    name: template.name,
    language: template.language,
    category: template.category,
    components: template.components.map((component) => ({ ...component })),
    layout_type: template.layout_type,
    parameter_format: template.parameter_format,
    definition: { ...template.definition },
    send_schema: {
      ...template.send_schema,
      fields: template.send_schema.fields.map((field) => ({ ...field })),
    },
    validation_errors: template.validation_errors.map((issue) => ({ ...issue })),
    draft_version: template.draft_version,
    quality_score: template.quality_score,
    quality_updated_at: template.quality_updated_at,
    status: template.status,
    source: template.source,
    rejection_reason: template.rejection_reason,
    submitted_at: template.submitted_at,
    last_reconciled_at: template.last_reconciled_at,
    created_at: template.created_at,
    updated_at: template.updated_at,
  };
}

export function sanitizeMessageTemplates(response: WhatsAppMessageTemplateListResponse): MessageTemplateListView {
  return { templates: response.templates.map(sanitizeMessageTemplate) };
}

export function sanitizeWhatsAppContact(contact: WhatsAppContact): WhatsAppContactView {
  return {
    contact_id: contact.contact_id,
    recipient: contact.phone_number_e164,
    display_phone_number: displayPhoneNumber(contact.phone_number_e164),
    contact_type: contact.contact_type,
    identity_status: contact.identity_status,
    marketing_consent_status: contact.marketing_consent_status,
    last_seen_at: contact.last_seen_at,
  };
}

export function sanitizeWhatsAppContacts(response: WhatsAppContactListResponse): WhatsAppContactListView {
  return { contacts: response.contacts.map(sanitizeWhatsAppContact) };
}

export function sanitizeWorkspaceMessage(message: WorkspaceWhatsAppMessage): WorkspaceMessageView {
  return {
    request_id: message.request_id,
    message_record_id: message.message_record_id,
    provider_message_id: message.provider_message_id,
    template_name: message.template_name,
    template_category: message.template_category,
    processing_status: message.processing_status,
    delivery_status: message.delivery_status,
    error_code: message.error_code,
    sent_at: message.sent_at,
    delivered_at: message.delivered_at,
    read_at: message.read_at,
    created_at: message.created_at,
  };
}

export function sanitizeWorkspaceMessages(response: WorkspaceWhatsAppMessageListResponse): WorkspaceMessageListView {
  return { messages: response.messages.map(sanitizeWorkspaceMessage) };
}
