"use client";

import { useMemo, useState } from "react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

const starterQuestions = [
  "Why did sales decline this week?",
  "Which products are driving profitability?",
  "What operational risks should I monitor?",
  "What branches are underperforming?",
];

function getAnswer(question: string) {
  const q = question.toLowerCase();

  if (q.includes("sales") && q.includes("decline")) {
    return "Sales declined 8.4% week-over-week. The largest driver was beverage stock-outs in 3 branches, followed by lower weekend traffic in Eastland branch.";
  }
  if (q.includes("profit") || q.includes("profitability")) {
    return "Top profitability drivers this week are packaged beverages, cooking oil, and household essentials. Margin expansion is strongest in Westlands and CBD branches.";
  }
  if (q.includes("risk")) {
    return "Key operational risks are rising stock-out frequency, declining repeat purchases in 2 branches, and delayed supplier lead times in high-velocity categories.";
  }
  if (q.includes("branches") || q.includes("underperform")) {
    return "Underperforming branches are Eastland and Rongai, each below target by more than 6%. Main contributors are lower basket size and inventory availability gaps.";
  }

  return "DukaAI identified notable movement in sales, stock availability, and branch performance. Refine your question by branch, category, or date range for sharper insights.";
}

export default function AiAssistantLivePreview() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi, I am DukaAI. Ask me an operational business question.",
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
        Live DukaAI Preview
      </h2>
      <p className="mt-3 max-w-3xl text-gray-600">
        Demonstrative preview: type a question or use examples below to simulate conversational analysis.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5 shadow-sm">
        <div className="flex flex-wrap gap-2">
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

        <div className="mt-4 max-h-[340px] space-y-3 overflow-y-auto rounded-xl border border-slate-200 bg-white p-4">
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
                DukaAI is thinking...
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
            placeholder="Type your business question..."
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
