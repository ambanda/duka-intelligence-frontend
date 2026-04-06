"use client";

import { useState } from "react";
import EmbeddedDashboardPreview from "@/components/EmbeddedDashboardPreview";

type EmbedFields = {
  provider_id: string;
  sector: string;
  shop_id: string;
  role: string;
  bundle_tier: string;
  request_id: string;
  request_signature: string;
  service: string;
  period: string;
};

const defaultFields: EmbedFields = {
  provider_id: "kapu",
  sector: "supermarket",
  shop_id: "__default_shop__",
  role: "provider_user",
  bundle_tier: "core",
  request_id: "<uuid>",
  request_signature: "<sig>",
  service: "revenue",
  period: "30d",
};

const fieldLabels: Record<keyof EmbedFields, string> = {
  provider_id: "Provider ID",
  sector: "Sector",
  shop_id: "Shop ID",
  role: "Role",
  bundle_tier: "Bundle Tier",
  request_id: "Request ID",
  request_signature: "Request Signature",
  service: "Service",
  period: "Period",
};

type ProductEmbedExperienceProps = {
  baseUrl: string;
  initialFields?: Partial<EmbedFields>;
};

export default function ProductEmbedExperience({
  baseUrl,
  initialFields,
}: ProductEmbedExperienceProps) {
  const [fields, setFields] = useState<EmbedFields>({
    ...defaultFields,
    ...initialFields,
  });

  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(fields)) {
    if (value.trim()) {
      searchParams.set(key, value.trim());
    }
  }

  const iframeSrc = `${baseUrl}?${searchParams.toString()}`;

  return (
    <div className="space-y-8">
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">
              Embed Controls
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900">
              Configure the live iframe parameters for this website
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Update the core query parameters below to preview different
              provider, tenant, and service combinations without changing the
              embed implementation.
            </p>

            <div className="mt-6 rounded-2xl bg-slate-950 p-4 text-sm text-slate-200">
              <p className="font-semibold text-white">Embed base URL</p>
              <p className="mt-2 break-all text-slate-300">{baseUrl}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {(Object.keys(fields) as Array<keyof EmbedFields>).map((field) => (
              <label key={field} className="block">
                <span className="text-sm font-semibold text-slate-700">
                  {fieldLabels[field]}
                </span>
                <input
                  type="text"
                  value={fields[field]}
                  onChange={(event) =>
                    setFields((current) => ({
                      ...current,
                      [field]: event.target.value,
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:bg-white"
                />
              </label>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">
          Generated iframe URL
        </p>
        <p className="mt-3 break-all text-sm leading-7 text-slate-300">
          {iframeSrc}
        </p>
      </section>

      <EmbeddedDashboardPreview src={iframeSrc} />
    </div>
  );
}
