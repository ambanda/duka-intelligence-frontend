"use client";

import type { JsonSchema, WhatsAppAsset } from "@duka/api-client";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import type { ChannelView } from "@/lib/channels/contracts";
import { humanize } from "@/lib/skills/display";

type Config = Record<string, unknown>;
type AssetLoader = (channelId: string) => Promise<WhatsAppAsset[]>;

function labelFor(name: string, schema: JsonSchema): string {
  return schema.title || humanize(name);
}

function asObject(value: unknown): Config {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Config : {};
}

function AssetField({ channelId, disabled, fieldName, loadAssets, onChange, value }: {
  channelId: string;
  disabled: boolean;
  fieldName: string;
  loadAssets: AssetLoader;
  onChange: (value: string) => void;
  value: unknown;
}) {
  const [assets, setAssets] = useState<WhatsAppAsset[] | null>(null);
  const [failed, setFailed] = useState(false);
  const assetType = fieldName.endsWith("flow_id") ? "flow" : "template";

  async function load() {
    if (assets || failed) return;
    try { setAssets(await loadAssets(channelId)); } catch { setFailed(true); }
  }

  const options = (assets ?? []).filter((asset) => asset.asset_type === assetType);
  return (
    <>
      <select disabled={disabled || failed} onChange={(event) => onChange(event.target.value)} onFocus={() => void load()} value={typeof value === "string" ? value : ""}>
        <option value="">{assets ? `Select ${assetType}` : `Load ${assetType}s`}</option>
        {options.map((asset) => <option key={asset.asset_id} value={assetType === "flow" ? asset.asset_id : asset.name}>{asset.name}{asset.language ? ` (${asset.language})` : ""}</option>)}
      </select>
      {failed && <small className="field-error">Assets are unavailable. Confirm that this is an active WhatsApp Cloud API channel.</small>}
    </>
  );
}

function SchemaField({ channels, disabled, fieldName, loadAssets, onChange, path, required, schema, value }: {
  channels: ChannelView[];
  disabled: boolean;
  fieldName: string;
  loadAssets: AssetLoader;
  onChange: (value: unknown) => void;
  path: string[];
  required: boolean;
  schema: JsonSchema;
  value: unknown;
}) {
  const label = labelFor(fieldName, schema);
  const channelId = path[0] === "channel_presentations" ? path[1] : null;
  const isAsset = channelId && (fieldName.endsWith("flow_id") || fieldName.endsWith("template"));

  if (schema.type === "object") {
    return <ObjectFields channels={channels} disabled={disabled} fieldName={fieldName} loadAssets={loadAssets} onChange={onChange} path={path} schema={schema} value={value} />;
  }

  if (schema.type === "boolean") {
    return <label className="schema-toggle"><input checked={value === true} disabled={disabled} onChange={(event) => onChange(event.target.checked)} type="checkbox" /><span><strong>{label}</strong>{schema.description && <small>{schema.description}</small>}</span></label>;
  }

  if (schema.type === "array" && schema.items?.enum) {
    const selected = Array.isArray(value) ? value : [];
    return (
      <fieldset className="schema-field schema-choice-group"><legend>{label}{required && <span aria-hidden="true"> *</span>}</legend>
        {schema.items.enum.map((option) => {
          const checked = selected.includes(option);
          return <label key={String(option)}><input checked={checked} disabled={disabled} onChange={() => onChange(checked ? selected.filter((item) => item !== option) : [...selected, option])} type="checkbox" /><span>{humanize(String(option))}</span></label>;
        })}
      </fieldset>
    );
  }

  return (
    <label className="schema-field"><span>{label}{required && <span aria-hidden="true"> *</span>}</span>
      {isAsset ? (
        <AssetField channelId={channelId} disabled={disabled} fieldName={fieldName} loadAssets={loadAssets} onChange={onChange} value={value} />
      ) : schema.enum ? (
        <select disabled={disabled} onChange={(event) => onChange(event.target.value)} value={value === undefined ? "" : String(value)}><option value="">Select an option</option>{schema.enum.map((option) => <option key={String(option)} value={String(option)}>{humanize(String(option))}</option>)}</select>
      ) : schema.type === "integer" || schema.type === "number" ? (
        <input disabled={disabled} max={schema.maximum} min={schema.minimum} onChange={(event) => onChange(event.target.value === "" ? undefined : schema.type === "integer" ? Number.parseInt(event.target.value, 10) : Number(event.target.value))} step={schema.type === "integer" ? 1 : "any"} type="number" value={typeof value === "number" ? value : ""} />
      ) : (
        <input disabled={disabled} maxLength={schema.maxLength} onChange={(event) => onChange(event.target.value || undefined)} type="text" value={typeof value === "string" ? value : ""} />
      )}
      {schema.description && <small>{schema.description}</small>}
      {path[0] === "connection_refs" && <small>Use the stable connection reference configured under Data sources.</small>}
    </label>
  );
}

function ObjectFields({ channels, disabled, fieldName, loadAssets, onChange, path, schema, value }: {
  channels: ChannelView[];
  disabled: boolean;
  fieldName: string;
  loadAssets: AssetLoader;
  onChange: (value: unknown) => void;
  path: string[];
  schema: JsonSchema;
  value: unknown;
}) {
  const objectValue = asObject(value);
  const [channelToAdd, setChannelToAdd] = useState("");
  const properties = schema.properties ?? {};
  const dynamicSchema = typeof schema.additionalProperties === "object" ? schema.additionalProperties : null;
  const availableChannels = channels.filter((channel) => !(channel.channel_id in objectValue));

  function setProperty(name: string, next: unknown) {
    const updated = { ...objectValue };
    if (next === undefined || next === "") delete updated[name]; else updated[name] = next;
    onChange(updated);
  }

  return (
    <fieldset className={`schema-object ${path.length === 1 ? "schema-object--section" : ""}`}>
      <legend>{humanize(fieldName)}</legend>
      {schema.description && <p>{schema.description}</p>}
      <div className="schema-fields">
        {Object.entries(properties).map(([name, child]) => <SchemaField channels={channels} disabled={disabled} fieldName={name} key={name} loadAssets={loadAssets} onChange={(next) => setProperty(name, next)} path={[...path, name]} required={schema.required?.includes(name) ?? false} schema={child} value={objectValue[name]} />)}
      </div>
      {dynamicSchema && (
        <div className="channel-presentation-editor">
          {Object.entries(objectValue).map(([channelId, presentation]) => {
            const channel = channels.find((item) => item.channel_id === channelId);
            return <div className="channel-presentation" key={channelId}><div className="channel-presentation__heading"><div><strong>{channel?.display_name || "WhatsApp channel"}</strong><span>{channel?.display_number || channelId}</span></div>{!disabled && <button aria-label="Remove channel presentation" className="icon-button" onClick={() => setProperty(channelId, undefined)} title="Remove channel" type="button"><Trash2 size={16} /></button>}</div><ObjectFields channels={channels} disabled={disabled} fieldName="Channel settings" loadAssets={loadAssets} onChange={(next) => setProperty(channelId, next)} path={[...path, channelId]} schema={dynamicSchema} value={presentation} /></div>;
          })}
          {!disabled && <div className="channel-add"><select aria-label="Channel to configure" onChange={(event) => setChannelToAdd(event.target.value)} value={channelToAdd}><option value="">Select connected channel</option>{availableChannels.map((channel) => <option key={channel.channel_id} value={channel.channel_id}>{channel.display_name} {channel.display_number ? `(${channel.display_number})` : ""}</option>)}</select><button className="duka-button duka-button--secondary" disabled={!channelToAdd} onClick={() => { setProperty(channelToAdd, {}); setChannelToAdd(""); }} type="button"><Plus size={16} />Add channel</button></div>}
          {!channels.length && <p className="field-help">Connect and activate a WhatsApp Business channel before configuring channel presentation.</p>}
        </div>
      )}
    </fieldset>
  );
}

export function SkillSchemaForm({ channels, disabled, loadAssets, onChange, schema, value }: {
  channels: ChannelView[];
  disabled: boolean;
  loadAssets: AssetLoader;
  onChange: (value: Config) => void;
  schema: JsonSchema;
  value: Config;
}) {
  const properties = schema.properties ?? {};
  if (!Object.keys(properties).length && typeof schema.additionalProperties !== "object") return <div className="skill-no-config"><strong>No setup required</strong><span>This reviewed skill can be enabled with its standard workspace policy.</span></div>;
  return <div className="skill-schema-form">{Object.entries(properties).map(([name, child]) => <SchemaField channels={channels} disabled={disabled} fieldName={name} key={name} loadAssets={loadAssets} onChange={(next) => { const updated = { ...value }; if (next === undefined || next === "") delete updated[name]; else updated[name] = next; onChange(updated); }} path={[name]} required={schema.required?.includes(name) ?? false} schema={child} value={value[name]} />)}</div>;
}
