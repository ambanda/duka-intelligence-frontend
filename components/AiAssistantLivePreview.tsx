"use client";

import { useMemo, useState } from "react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

const starterQuestions = [
  "What needs attention today?",
  "Find the latest customer issue summary.",
  "What changed in operations this week?",
  "Prepare an approved follow-up list.",
];

function getAnswer(question: string) {
  const q = question.toLowerCase();

  if (q.includes("attention") || q.includes("today")) {
    return "I found three priority items across governed enterprise knowledge: one delayed document, one customer follow-up group, and one operational movement. I can show cited sources or prepare the approved follow-up list.";
  }
  if (q.includes("customer") || q.includes("issue")) {
    return "Customer issues are grouped into response delays, account updates, and unresolved channel messages. Sources include chat and social summaries available to your role.";
  }
  if (q.includes("operations") || q.includes("changed")) {
    return "Operational activity increased in one workspace, with a service delay and two pending approvals. I can open the source trail or recommend next steps.";
  }
  if (q.includes("follow-up") || q.includes("list")) {
    return "I can prepare the follow-up list using approved knowledge objects only. The list will include owner, reason, source, and recommended next action for each item.";
  }

  return "I can search governed enterprise knowledge, answer with context, recommend next steps, and help complete approved tasks. If evidence or permission is missing, I will say so instead of guessing.";
}

export default function AiAssistantLivePreview() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi, I am a Duka Agent. Ask me to find an answer, summarize context, or prepare an approved action.",
    },
  ]);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  const askQuestion = (text: string) => {
    const question = text.trim();
    if (!question || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setInput("");
    setLoading(true);

    window.setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", text: getAnswer(question) }]);
      setLoading(false);
    }, 700);
  };

  return (
    <section className="mx-auto mt-12 max-w-6xl">
      <h2 className="text-3xl font-semibold text-gray-900">
        Duka Agent Preview
      </h2>
      <p className="mt-3 max-w-3xl text-gray-600">
        A simple preview of how employees can move from intent to trusted answer
        to approved action through WhatsApp or another familiar chat app.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
        <div className="flex items-center justify-between rounded-xl bg-[#101820] px-4 py-3 text-white">
          <div>
            <p className="text-sm font-semibold">Duka Agent</p>
            <p className="text-xs text-emerald-200">Intent to job done</p>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-100">
            Permission-aware
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {starterQuestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => askQuestion(q)}
              className="rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              {q}
            </button>
          ))}
        </div>

        <div className="mt-4 max-h-[340px] space-y-3 overflow-y-auto rounded-xl border border-slate-200 bg-[#fbfaf7] p-4">
          {messages.map((msg, idx) => (
            <div key={`${msg.role}-${idx}`} className={msg.role === "user" ? "text-right" : "text-left"}>
              <div className={msg.role === "user" ? "ml-auto inline-block max-w-[85%] rounded-xl bg-[#101820] px-4 py-2 text-sm text-white" : "inline-block max-w-[85%] rounded-xl bg-emerald-50 px-4 py-2 text-sm text-slate-700"}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading ? (
            <div className="text-left">
              <div className="inline-block max-w-[85%] rounded-xl bg-emerald-50 px-4 py-2 text-sm text-slate-600">
                Duka Agent is checking governed knowledge objects...
              </div>
            </div>
          ) : null}
        </div>

        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            askQuestion(input);
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask from enterprise knowledge..."
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 outline-none focus:border-orange-400"
          />
          <button
            type="submit"
            disabled={!canSend}
            className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Ask
          </button>
        </form>
      </div>
    </section>
  );
}