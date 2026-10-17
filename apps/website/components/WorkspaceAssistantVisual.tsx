import {
  BarChart3,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  MessageCircle,
  ShoppingBag,
  UserCheck,
} from "lucide-react";

import { serviceCentres } from "@/lib/brand";

const centreIcons = [MessageCircle, ShoppingBag, ClipboardCheck];

export default function WorkspaceAssistantVisual() {
  return (
    <div className="border-y border-white/15 py-6 text-white">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-orange-300">One assistant, three service centres</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">
            A customer starts on WhatsApp. Your team sees the work.
          </h2>
        </div>
        <p className="max-w-sm text-sm text-slate-300">
          Every step stays connected to the right business, customer and outcome.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr_0.8fr] lg:items-stretch">
        <section className="rounded-lg border border-emerald-300/25 bg-emerald-950/35 p-4" aria-label="Customer WhatsApp experience">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-200">
            <MessageCircle className="h-5 w-5" />
            Customer on WhatsApp
          </div>
          <div className="mt-4 space-y-3 text-sm">
            <div className="ml-8 rounded-lg bg-white px-3 py-2 text-slate-900">
              I would like to book a consultation.
            </div>
            <div className="mr-5 rounded-lg bg-emerald-100 px-3 py-2 text-slate-900">
              Here are the services and available times for this business.
            </div>
            <div className="ml-8 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-slate-900">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              Booking confirmed
            </div>
          </div>
        </section>

        <section className="flex flex-col justify-center py-2" aria-label="Duka customer journey">
          <div className="grid gap-2 sm:grid-cols-3 sm:items-stretch">
            {serviceCentres.map((centre, index) => {
              const CentreIcon = centreIcons[index];

              return (
                <div key={centre.id} className="flex min-h-28 flex-col items-center justify-center border-b border-white/15 px-3 py-3 text-center sm:border-b-0 sm:border-r sm:last:border-r-0">
                  <CentreIcon className="h-5 w-5 text-orange-300" />
                  <span className="mt-3 text-sm font-semibold text-white">{centre.name}</span>
                  <span className="mt-1 text-xs text-slate-300">{centre.capability}</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-lg border border-orange-300/25 bg-orange-950/25 p-4" aria-label="Staff operations experience">
          <div className="flex items-center gap-2 text-sm font-semibold text-orange-200">
            <ClipboardCheck className="h-5 w-5" />
            Staff and managers
          </div>
          <div className="mt-4 divide-y divide-white/10 text-sm">
            <div className="flex items-center gap-3 py-3">
              <CalendarCheck2 className="h-5 w-5 text-orange-300" />
              <span>Service Desk booking added to today&apos;s schedule</span>
            </div>
            <div className="flex items-center gap-3 py-3">
              <UserCheck className="h-5 w-5 text-orange-300" />
              <span>Back Office staff notified and assigned</span>
            </div>
            <div className="flex items-center gap-3 py-3">
              <BarChart3 className="h-5 w-5 text-orange-300" />
              <span>Journey and utilization updated</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
