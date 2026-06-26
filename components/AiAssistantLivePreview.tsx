"use client";

import { useMemo, useState } from "react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

const starterQuestions = [
  "What needs attention today?",
  "Summarize customer issues from chat and social channels.",
  "Find the latest report and explain the key changes.",
  "Prepare an approved follow-up list for my team.",
];

function getAnswer(question: string) {
  const q = question.toLowerCase();

  if (q.includes("attention") || q.includes("today")) {
    return "Three items need attention: a service delay, a document awaiting review, and a performance movement in one workspace. I can show the cited sources or prepare the approved follow-up list.";
  }
  if (q.includes("customer") || q.includes("social") || q.includes("chat")) {
    return "Customer issues are grouped into delivery questions, account updates, and unresolved support messages. Sources include the latest chat and social channel summaries available to your role.";
  }
  if (q.includes("report") || q.includes("changes")) {
    return "I found the latest workspace report. The main changes are higher activity, a small revenue shift, and two open operational risks. Source citations are attached for review.";
  }
  if (q.includes("follow-up") || q.includes("team")) {
    return "I can prepare the follow-up list using approved knowledge objects only. The list will include owner, reason, source, and recommended next action for each item.";
  }

  return "I can answer from governed knowledge objects available to your workspace. If the evidence is missing or your role cannot access it, I will say so instead of guessing.";
}

export default function AiAssistantLivePreview() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi, I am Duka. Ask me a workspace question or request an approved task.",
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
    <section className="max-w-6xl mx-auto mt-12">
      <h2 className="text-3xl font-semibold text-gray-900">
        Workspace Assistant Preview
      </h2>
      <p className="mt-3 max-w-3xl text-gray-600">
        A simple preview of how teams can ask questions and trigger approved
        tasks through WhatsApp or another familiar chat app.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between rounded-xl bg-slate-950 px-4 py-3 text-white">
          <div>
            <p className="text-sm font-semibold">Duka Assistant</p>
            <p className="text-xs text-emerald-200">Workspace chat channel</p>
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

        <div className="mt-4 max-h-[340px] space-y-3 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4">
          {messages.map((msg, idx) => (
            <div key={`${msg.role}-${idx}`} className={msg.role === "user" ? "text-right" : "text-left"}>
              <div
                className={
                  msg.role === "user"
                    ? "ml-auto inline-block max-w-[85%] rounded-xl bg-slate-900 px-4 py-2 text-sm text-white"
                    : "inline-block max-w-[85%] rounded-xl bg-emerald-50 px-4 py-2 text-sm text-slate-700"
                }
              >
                {msg.text}
              </div>
            </div>
          ))}
          {loading ? (
            <div className="text-left">
              <div className="inline-block max-w-[85%] rounded-xl bg-emerald-50 px-4 py-2 text-sm text-slate-600">
                Duka is checking governed knowledge objects...
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
            placeholder="Ask from your workspace knowledge..."
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 outline-none focus:border-orange-400"
          />
          <button
            type="submit"
            disabled={!canSend}
            className="rounded-xl bg-orange-500 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 hover:bg-orange-600"
          >
            Ask
          </button>
        </form>
      </div>
    </section>
  );
}
