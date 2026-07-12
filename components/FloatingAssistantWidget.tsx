"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import PublicAssistantChat from "@/components/PublicAssistantChat";

export default function FloatingAssistantWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 print:hidden">
      {open ? (
        <div className="w-[min(calc(100vw-2rem),420px)] overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/20">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Duka Intelligence</p>
              <p className="text-xs text-slate-500">AI agent</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close Duka Intelligence assistant"
              className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <PublicAssistantChat mode="floating" />
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open Duka Intelligence assistant"
        className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-900/20 transition hover:bg-slate-800"
      >
        <MessageCircle className="h-5 w-5 text-orange-300" />
        Ask Duka
      </button>
    </div>
  );
}
