"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import PublicAssistantChat from "@/components/PublicAssistantChat";

export default function FloatingAssistantWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 print:hidden">
      {open ? (
        <div className="relative h-[min(680px,calc(100vh-7rem))] w-[min(calc(100vw-2rem),420px)] overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-900/25 ring-1 ring-black/10">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close Duka Intelligence assistant"
            className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
          >
            <X className="h-4 w-4" />
          </button>
          <PublicAssistantChat mode="floating" />
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open Duka Intelligence assistant"
        className="inline-flex items-center gap-2 rounded-full bg-[#075e54] px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-900/20 transition hover:bg-[#064d45]"
      >
        <MessageCircle className="h-5 w-5 text-emerald-100" />
        Ask Duka
      </button>
    </div>
  );
}
