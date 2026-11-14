"use client";

import { field as text, type OperationRow as Row } from "./operations-client";

export function TemplateParameterField({ definition, value, onChange, disabled }: { definition: Row; value: unknown; onChange: (value: unknown) => void; disabled: boolean }) {
  const key = text(definition, "key"), label = text(definition, "label"), type = text(definition, "value_type");
  const required = Boolean(definition.required);
  const object = value && typeof value === "object" ? value as Row : {};
  const update = (property: string, next: unknown) => onChange({ ...object, [property]: next });
  if (type === "location") return <fieldset disabled={disabled}><legend>{label}</legend><label>Latitude<input name={`${key}-latitude`} type="number" step="any" min={-90} max={90} required={required} value={String(object.latitude ?? "")} onChange={(e) => update("latitude", Number(e.target.value))} /></label><label>Longitude<input name={`${key}-longitude`} type="number" step="any" min={-180} max={180} required={required} value={String(object.longitude ?? "")} onChange={(e) => update("longitude", Number(e.target.value))} /></label><label>Location name<input name={`${key}-name`} required={required} value={text(object, "name")} onChange={(e) => update("name", e.target.value)} /></label><label>Address<input name={`${key}-address`} required={required} value={text(object, "address")} onChange={(e) => update("address", e.target.value)} /></label></fieldset>;
  if (type === "currency") return <fieldset disabled={disabled}><legend>{label}</legend><label>Display amount<input name={`${key}-display`} required={required} value={text(object, "fallback_value")} onChange={(e) => update("fallback_value", e.target.value)} /></label><label>Currency code<input name={`${key}-code`} required={required} maxLength={3} value={text(object, "code")} onChange={(e) => update("code", e.target.value.toUpperCase())} /></label><label>Amount<input name={`${key}-amount`} type="number" min={0} step="0.001" required={required} value={object.amount_1000 === undefined ? "" : Number(object.amount_1000) / 1000} onChange={(e) => update("amount_1000", Math.round(Number(e.target.value) * 1000))} /></label></fieldset>;
  const media = ["image", "video", "document"].includes(type);
  const shown = media ? String(object.link || object.id || "") : type === "date_time" ? String(object.fallback_value || "") : String(value || "");
  return <label>{label}{required ? " *" : ""}<input name={key} disabled={disabled} required={required} type={type === "date_time" ? "datetime-local" : "text"} value={shown} placeholder={media ? "Meta media ID or HTTPS URL" : undefined} onChange={(e) => onChange(media ? (e.target.value.startsWith("https://") ? { link: e.target.value } : { id: e.target.value }) : type === "date_time" ? { fallback_value: e.target.value } : e.target.value)} /></label>;
}
