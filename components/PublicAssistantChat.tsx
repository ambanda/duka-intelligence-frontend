"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUp, Bot, Loader2, Mail, ShieldCheck, UserRound } from "lucide-react";
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
const SESSION_KEY = "duka_public_assistant_session_id";
const MESSAGES_KEY = "duka_public_assistant_messages";

const firstVisitMessage =
  "Work AI platform that unifies company knowledge, systems, and context, enabling AI to deliver real productivity gains across the enterprise.";

const returningMessage =
  "Welcome back to Duka. Thanks for checking out Duka Workspace AI platform. It is designed to help teams find knowledge and automate tasks efficiently. Ask Duka.";

function createVisitorId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `visitor_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function loadVisitorState() {
  if (typeof window === "undefined") {
    return { visitorId: "server_visitor", isReturning: false };
  }

  const existing = window.localStorage.getItem(VISITOR_KEY);
  if (existing) return { visitorId: existing, isReturning: true };

  const next = createVisitorId();
  window.localStorage.setItem(VISITOR_KEY, next);
  return { visitorId: next, isReturning: false };
}

function loadStoredMessages(): ChatMessage[] | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(MESSAGES_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as ChatMessage[];
    return Array.isArray(parsed) && parsed.length ? parsed : null;
  } catch {
    return null;
  }
}

function saveStoredMessages(messages: ChatMessage[]) {
  if (typeof window === "undefined") return;
  const compact = messages.slice(-30).map((message) => ({
    role: message.role,
    text: message.text,
    response: message.response
      ? {
          status: message.response.status,
          answer_type: message.response.answer_type,
          queries_remaining: message.response.queries_remaining,
          query_limit: message.response.query_limit,
          email_captured: message.response.email_captured,
          knowledge_object_ids: message.response.knowledge_object_ids,
        }
      : undefined,
  }));
  window.localStorage.setItem(MESSAGES_KEY, JSON.stringify(compact));
}

function formatAnswer(text: string): { sentences: string[]; keyPoints: string[] } {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return { sentences: [], keyPoints: [] };

  const [intro, keyPointText] = normalized.split(/Key points:/i);
  const sentences = intro
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);

  const keyPoints = keyPointText
    ? keyPointText
        .replace(/\.$/, "")
        .split(/;|\n|•|- /)
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 5)
    : [];

  return { sentences, keyPoints };
}

function AssistantBubble({ message }: { message: ChatMessage }) {
  const { sentences, keyPoints } = formatAnswer(message.text);
  const remaining = message.response?.queries_remaining;
  const showLimitHint = remaining !== null && remaining !== undefined && remaining <= 1;

  return (
    <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm text-slate-800 shadow-sm ring-1 ring-emerald-100">
      <div className="space-y-2 leading-6">
        {sentences.length || keyPoints.length ? (
          <>
            {sentences.map((sentence, index) => (
              <p key={`sentence-${index}`}>{sentence}</p>
            ))}
            {keyPoints.length ? (
              <ul className="mt-2 space-y-1.5">
                {keyPoints.map((point, index) => (
                  <li key={`point-${index}`} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        ) : (
          <p>{message.text}</p>
        )}
      </div>
      {showLimitHint ? (
        <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
          {remaining === 0 ? "Share contact to continue the demo conversation." : "One free question left before contact capture."}
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
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const state = loadVisitorState();
    setVisitorId(state.visitorId);

    const existingSession = window.localStorage.getItem(SESSION_KEY);
    if (existingSession) setSessionId(existingSession);

    const stored = loadStoredMessages();
    if (stored?.length) {
      setMessages(stored);
      return;
    }

    const greeting = state.isReturning ? returningMessage : firstVisitMessage;
    setMessages([{ role: "assistant", text: greeting }]);

    fetchPublicAssistantBootstrap()
      .then((payload) => {
        if (!state.isReturning && payload.opening_message) {
          setMessages([{ role: "assistant", text: payload.opening_message }]);
        }
      })
      .catch(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            text: "Duka public assistant API is not reachable right now. You can still book a demo or try again shortly.",
          },
        ]);
      });
  }, []);

  useEffect(() => {
    if (messages.length) saveStoredMessages(messages);
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [loading, leadRequired]);

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
      if (typeof window !== "undefined") window.localStorage.setItem(SESSION_KEY, response.session_id);
      setLeadRequired(response.status === "lead_required");
      setEmailCaptured(response.email_captured);
      setMessages((prev) => [...prev, { role: "assistant", text: response.answer, response }]);
    } catch {
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
    } catch {
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
    <div className={compact ? "flex h-full flex-col overflow-hidden rounded-3xl bg-[#efe7dc]" : "overflow-hidden rounded-3xl border border-emerald-100 bg-[#efe7dc] shadow-sm"}>
      <div className="flex items-center justify-between bg-[#075e54] px-4 py-3 text-white">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-emerald-100 text-[#075e54] ring-2 ring-white/20">
            <UserRound className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Duka Intelligence</p>
            <p className="text-xs text-emerald-100">AI agent</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-emerald-50">
          <ShieldCheck className="h-3.5 w-3.5" />
          Public KB
        </span>
      </div>

      <div className={compact ? "min-h-0 flex-1 space-y-3 overflow-y-auto p-3" : "max-h-[520px] space-y-3 overflow-y-auto p-4"}>
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
            {message.role === "assistant" ? (
              <AssistantBubble message={message} />
            ) : message.role === "system" ? (
              <div className="max-w-[88%] rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900 ring-1 ring-amber-200">
                {message.text}
              </div>
            ) : (
              <div className="max-w-[82%] rounded-2xl rounded-tr-sm bg-[#dcf8c6] px-4 py-3 text-sm leading-6 text-slate-900 shadow-sm">
                {message.text}
              </div>
            )}
          </div>
        ))}

        {loading ? (
          <div className="flex justify-start">
            <div className="inline-flex items-center gap-2 rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-sm text-slate-600 shadow-sm ring-1 ring-emerald-100">
              <Loader2 className="h-4 w-4 animate-spin text-[#075e54]" />
              Checking approved public knowledge...
            </div>
          </div>
        ) : null}

        {leadRequired && !emailCaptured ? (
          <form onSubmit={submitLead} className="rounded-2xl border border-orange-200 bg-orange-50 p-4 shadow-sm">
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
        className="flex gap-2 border-t border-black/5 bg-[#f7f7f7] p-3"
        onSubmit={(event) => {
          event.preventDefault();
          askQuestion(input);
        }}
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask Duka"
          className="min-w-0 flex-1 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#075e54]"
        />
        <button
          type="submit"
          disabled={!canSend}
          aria-label="Send message"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#075e54] text-white transition hover:bg-[#064d45] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
