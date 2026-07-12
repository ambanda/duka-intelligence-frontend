"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, CheckCircle2, Loader2, Mail, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import {
  capturePublicAssistantLead,
  fetchPublicAssistantBootstrap,
  sendPublicAssistantMessage,
  type PublicChatResponse,
} from "@/lib/publicAssistantApi";

type ChatMessage = {
  role: "assistant" | "user" | "system";
  text: string;
  response?: PublicChatResponse;
};

type PublicAssistantChatProps = {
  mode?: "inline" | "floating";
};

const VISITOR_KEY = "duka_public_assistant_visitor_id";

const fallbackPrompts = [
  "What can Duka do?",
  "Can Duka work through WhatsApp?",
  "What systems can Duka connect to?",
  "How is pricing structured?",
];

function createVisitorId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `visitor_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function getVisitorId() {
  if (typeof window === "undefined") return "server_visitor";
  const existing = window.localStorage.getItem(VISITOR_KEY);
  if (existing) return existing;
  const next = createVisitorId();
  window.localStorage.setItem(VISITOR_KEY, next);
  return next;
}

function formatAnswer(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  const [intro, keyPointText] = normalized.split(/Key points:/i);
  const introSentences = intro
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);

  const keyPoints = keyPointText
    ? keyPointText
        .replace(/\.$/, "")
        .split(/;|\n|•|- /)
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

  return [
    ...introSentences.slice(0, 3).map((item) => ({ type: "sentence" as const, text: item })),
    ...keyPoints.slice(0, 5).map((item) => ({ type: "point" as const, text: item })),
  ];
}

function AssistantAnswer({ message }: { message: ChatMessage }) {
  const parts = formatAnswer(message.text);
  const response = message.response;

  return (
    <div className="max-w-[92%] rounded-2xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm ring-1 ring-slate-200">
      <div className="space-y-2">
        {parts.length > 0 ? (
          parts.map((part, index) => (
            <div key={`${part.type}-${index}`} className="flex gap-2 leading-6">
              {part.type === "point" ? (
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
              ) : (
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-500" />
              )}
              <span>{part.text}</span>
            </div>
          ))
        ) : (
          <p>{message.text}</p>
        )}
      </div>

      {response?.suggested_followups?.length ? (
        <div className="mt-3 border-t border-slate-100 pt-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Next questions</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {response.suggested_followups.slice(0, 3).map((item) => (
              <span key={item} className="rounded-full bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {response?.queries_remaining !== null && response?.queries_remaining !== undefined ? (
        <p className="mt-3 text-xs text-slate-400">
          {response.queries_remaining} free question{response.queries_remaining === 1 ? "" : "s"} left today before contact capture.
        </p>
      ) : null}
    </div>
  );
}

export default function PublicAssistantChat({ mode = "inline" }: PublicAssistantChatProps) {
  const compact = mode === "floating";
  const [visitorId, setVisitorId] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadOrganization, setLeadOrganization] = useState("");
  const [leadUseCase, setLeadUseCase] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadRequired, setLeadRequired] = useState(false);
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState(fallbackPrompts);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Work AI platform that unifies company knowledge, systems, and context, enabling AI to deliver real productivity gains across the enterprise.",
    },
  ]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = getVisitorId();
    setVisitorId(id);

    fetchPublicAssistantBootstrap()
      .then((payload) => {
        setSuggestedPrompts(payload.suggested_prompts?.length ? payload.suggested_prompts : fallbackPrompts);
        setMessages([
          {
            role: "assistant",
            text: payload.opening_message,
          },
        ]);
      })
      .catch(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            text: "Public assistant API is not reachable right now. You can still book a demo or try again shortly.",
          },
        ]);
      });
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading, leadRequired]);

  const canSend = useMemo(() => input.trim().length > 0 && !loading && !!visitorId, [input, loading, visitorId]);

  async function askQuestion(rawText: string) {
    const question = rawText.trim();
    if (!question || loading || !visitorId) return;

    setInput("");
    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", text: question }]);

    try {
      const response = await sendPublicAssistantMessage({ visitorId, sessionId, message: question });
      setSessionId(response.session_id);
      setLeadRequired(response.status === "lead_required");
      setEmailCaptured(response.email_captured);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: response.answer,
          response,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          text: "I could not reach the Duka public assistant API. Please try again shortly or use the demo form.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!leadEmail.trim() || !visitorId) return;

    setLeadLoading(true);
    try {
      await capturePublicAssistantLead({
        visitorId,
        sessionId,
        email: leadEmail.trim(),
        organization: leadOrganization.trim() || undefined,
        useCase: leadUseCase.trim() || undefined,
      });
      setLeadRequired(false);
      setEmailCaptured(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Thanks. You can continue asking questions, and we can tailor a demo around your organization, channel, and first workspace use case.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          text: "I could not save the contact details. Please check the email and try again.",
        },
      ]);
    } finally {
      setLeadLoading(false);
    }
  }

  return (
    <div className={compact ? "h-full" : "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"}>
      <div className="flex items-center justify-between rounded-2xl bg-slate-950 px-4 py-3 text-white">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-orange-500 text-white">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Duka Intelligence</p>
            <p className="text-xs text-emerald-200">AI agent</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-100">
          <ShieldCheck className="h-3.5 w-3.5" />
          Grounded KB
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {suggestedPrompts.slice(0, compact ? 3 : 4).map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => askQuestion(prompt)}
            className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className={compact ? "mt-4 h-[360px] space-y-3 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-3" : "mt-4 max-h-[440px] space-y-3 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-4"}>
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
            {message.role === "assistant" ? (
              <AssistantAnswer message={message} />
            ) : message.role === "system" ? (
              <div className="max-w-[92%] rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-amber-200">
                {message.text}
              </div>
            ) : (
              <div className="max-w-[85%] rounded-2xl bg-slate-900 px-4 py-3 text-sm text-white">
                {message.text}
              </div>
            )}
          </div>
        ))}

        {loading ? (
          <div className="flex justify-start">
            <div className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm text-slate-600 shadow-sm ring-1 ring-slate-200">
              <Loader2 className="h-4 w-4 animate-spin text-orange-500" />
              Checking approved public knowledge...
            </div>
          </div>
        ) : null}

        {leadRequired && !emailCaptured ? (
          <form onSubmit={submitLead} className="rounded-2xl border border-orange-200 bg-orange-50 p-4">
            <div className="flex items-start gap-3">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-orange-600" />
              <div>
                <p className="font-semibold text-slate-900">Continue with contact</p>
                <p className="mt-1 text-sm leading-6 text-slate-700">
                  Share your email so we can keep the demo useful and tailor follow-up around your organization.
                </p>
              </div>
            </div>
            <div className="mt-3 grid gap-2">
              <input
                type="email"
                value={leadEmail}
                onChange={(event) => setLeadEmail(event.target.value)}
                placeholder="Work email"
                required
                className="rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-500"
              />
              <input
                value={leadOrganization}
                onChange={(event) => setLeadOrganization(event.target.value)}
                placeholder="Organization (optional)"
                className="rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-500"
              />
              <input
                value={leadUseCase}
                onChange={(event) => setLeadUseCase(event.target.value)}
                placeholder="Use case (optional)"
                className="rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm outline-none focus:border-orange-500"
              />
              <button
                type="submit"
                disabled={leadLoading || !leadEmail.trim()}
                className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {leadLoading ? "Saving..." : "Continue conversation"}
              </button>
            </div>
          </form>
        ) : null}
        <div ref={endRef} />
      </div>

      <form
        className="mt-4 flex gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          askQuestion(input);
        }}
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask Duka about integrations, WhatsApp, pricing, or use cases..."
          className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 outline-none transition focus:border-orange-400"
        />
        <button
          type="submit"
          disabled={!canSend}
          aria-label="Send message"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-500 text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </form>

      <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
        <MessageCircle className="h-3.5 w-3.5" />
        <span>The public assistant answers from approved Duka knowledge only.</span>
      </div>
    </div>
  );
}
