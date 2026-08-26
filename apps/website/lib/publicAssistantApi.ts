export type PublicChatResponse = {
  status: "success" | "lead_required" | string;
  visitor_id: string;
  session_id: string;
  answer: string;
  answer_type: string;
  queries_remaining: number | null;
  query_limit: number;
  email_captured: boolean;
  knowledge_object_ids: string[];
  suggested_followups: string[];
  cta: Record<string, unknown>;
  required_fields: string[];
  optional_fields: string[];
  model_provider?: string | null;
  model_name?: string | null;
  fallback_used: boolean;
  metadata: Record<string, unknown>;
};

export type PublicBootstrapResponse = {
  status: string;
  opening_message: string;
  suggested_prompts: string[];
  query_limit: number;
};

export type PublicLeadResponse = {
  status: string;
  lead_id: string;
  visitor_id: string;
  session_id?: string | null;
  email_captured: boolean;
  message: string;
};

const DEFAULT_API_BASE_URL = "https://api.dukaintelligence.co.ke";

export function getPublicAssistantApiBaseUrl() {
  return (process.env.NEXT_PUBLIC_DUKA_PUBLIC_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/+$/, "");
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(detail || `Request failed with ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export async function fetchPublicAssistantBootstrap(): Promise<PublicBootstrapResponse> {
  const response = await fetch(`${getPublicAssistantApiBaseUrl()}/public/chat/bootstrap`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
  return parseResponse<PublicBootstrapResponse>(response);
}

export async function sendPublicAssistantMessage(params: {
  visitorId: string;
  sessionId?: string | null;
  message: string;
}): Promise<PublicChatResponse> {
  const response = await fetch(`${getPublicAssistantApiBaseUrl()}/public/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      visitor_id: params.visitorId,
      session_id: params.sessionId,
      message: params.message,
    }),
  });
  return parseResponse<PublicChatResponse>(response);
}

export async function capturePublicAssistantLead(params: {
  visitorId: string;
  sessionId?: string | null;
  email: string;
  name?: string;
  organization?: string;
  sector?: string;
  useCase?: string;
  phone?: string;
}): Promise<PublicLeadResponse> {
  const response = await fetch(`${getPublicAssistantApiBaseUrl()}/public/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      visitor_id: params.visitorId,
      session_id: params.sessionId,
      email: params.email,
      name: params.name || undefined,
      organization: params.organization || undefined,
      sector: params.sector || undefined,
      use_case: params.useCase || undefined,
      phone: params.phone || undefined,
    }),
  });
  return parseResponse<PublicLeadResponse>(response);
}
