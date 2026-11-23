"use client";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Plus, RefreshCw, Pause, Check, X, Save, ShieldCheck, Pencil } from "lucide-react";
import styles from "./shop-payments.module.css";
type Shop = { shop_id: string; display_name: string; currency: string; timezone: string; status: string };
type Account = { payment_connection_id: string; display_name: string; merchant_account_id: string; provider: string; environment: string; status: string; credential_secret_ref?: string; provider_config?: Record<string, unknown> };
type Method = { payment_method_id: string; shop_id: string; payment_connection_id: string; currency: string; environment: string; status: string; is_default: boolean };
type Payment = { payment_intent_id: string; shop_id: string; amount: string | number; currency: string; status: string; evidence_status: string; allocation_status: string };
type Inventory = { shops: Shop[]; connections: Account[]; methods: Method[]; payments: Payment[]; can_manage: boolean };
const configs = { mpesa: { business_short_code: "", party_b: "", transaction_type: "CustomerPayBillOnline" }, pesalink: { base_url: "", token_path: "", lipa_na_bank_initiate_path: "", payment_status_path: "", contract_version: "", signature_mode: "hmac_sha256", supported_currencies: ["KES"] } };
const button = "duka-button duka-button--secondary";
export function ShopPayments({ workspaceSlug, csrfToken }: { workspaceSlug: string; csrfToken: string }) {
  const [data, setData] = useState<Inventory>();
  const [error, setError] = useState(""); const [notice, setNotice] = useState(""); const [busy, setBusy] = useState(false);
  const [shop, setShop] = useState(""); const [form, setForm] = useState<"shop" | "account" | "method" | null>(null);
  const [provider, setProvider] = useState<"mpesa" | "pesalink">("mpesa");
  const [config, setConfig] = useState(JSON.stringify(configs.mpesa, null, 2));
  const [editing, setEditing] = useState<Account>(); const [proofs, setProofs] = useState<Record<string, string>>({});
  const base = `/api/bff/workspaces/${encodeURIComponent(workspaceSlug)}/shop-payments`;
  const request = useCallback(async (path = "", method = "GET", payload?: unknown) => {
    const response = await fetch(base + path, { method, cache: "no-store", headers: { "content-type": "application/json", "x-duka-csrf": csrfToken }, body: payload === undefined ? undefined : JSON.stringify(payload) });
    const result = await response.json(); if (!response.ok) throw new Error(result.error?.message || result.detail || "Payment operation failed."); return result;
  }, [base, csrfToken]);
  const load = useCallback(async () => { setData(await request() as Inventory); }, [request]);
  useEffect(() => { load().catch(e => setError(e.message)); }, [load]);
  async function action(path: string, method: string, payload?: unknown, message = "Saved.") {
    setBusy(true); setError(""); setNotice("");
    try { await request(path, method, payload); await load(); setNotice(message); return true; }
    catch (e) { setError(e instanceof Error ? e.message : "Payment operation failed."); return false; }
    finally { setBusy(false); }
  }
  function open(next: typeof form) { setEditing(undefined); setForm(next); setError(""); }
  function edit(account: Account) { setEditing(account); setProvider(account.provider as "mpesa" | "pesalink"); setConfig(JSON.stringify(account.provider_config || {}, null, 2)); setForm("account"); }
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); const values = new FormData(event.currentTarget); const value = (key: string) => String(values.get(key) || "").trim();
    try {
      let path = ""; let payload: unknown;
      if (form === "shop") { path = `/shops/${encodeURIComponent(value("id"))}`; payload = { display_name: value("display_name"), currency: value("currency"), timezone: value("timezone"), status: "active" }; }
      else if (form === "account") { path = `/connections/${encodeURIComponent(value("id"))}`; payload = { provider, environment: value("environment"), merchant_account_id: value("merchant_account_id"), display_name: value("display_name"), credential_secret_ref: value("secret_ref"), provider_config: JSON.parse(config), capabilities: ["collection", "status_query"], status: value("status") }; }
      else { const account = data?.connections.find(row => row.payment_connection_id === value("connection")); path = `/methods/${encodeURIComponent(value("id"))}`; payload = { shop_id: value("shop_id"), payment_connection_id: value("connection"), currency: value("currency"), environment: account?.environment, is_default: values.get("default") === "on" }; }
      if (await action(path, "PUT", payload)) { setForm(null); setEditing(undefined); }
    } catch (e) { setError(e instanceof Error ? e.message : "Invalid configuration."); }
  }
  const filtered = <T extends { shop_id: string }>(rows: T[]) => rows.filter(row => !shop || row.shop_id === shop);
  return <div className={styles.panel}>
    <div className={styles.toolbar}><label>Shop<select name="shop_filter" value={shop} onChange={e => setShop(e.target.value)}><option value="">All shops</option>{data?.shops.map(row => <option key={row.shop_id} value={row.shop_id}>{row.display_name}</option>)}</select></label>
      <button className={button} title="Refresh payments" disabled={busy} onClick={() => { setError(""); load().catch(e => setError(e.message)); }}><RefreshCw size={16} />Refresh</button>
      {data?.can_manage && <><button className={button} onClick={() => open("shop")}><Plus size={16} />Shop</button><button className={button} onClick={() => open("account")}><Plus size={16} />Merchant account</button><button className={button} onClick={() => open("method")}><Plus size={16} />Shop method</button></>}
    </div>{error && <p role="alert" className={styles.error}>{error}</p>}{notice && <p role="status" className={styles.notice}>{notice}</p>}{!data && !error && <p role="status">Loading payments...</p>}
    {form && <form className={styles.form} onSubmit={save} key={form + (editing?.payment_connection_id || "")}><h2>{form === "shop" ? "Shop" : form === "account" ? "Merchant account" : "Shop payment method"}</h2><div className={styles.fields}>
      <label>Identifier<input name="id" required pattern={"[A-Za-z0-9_.:\\-]+"} maxLength={120} readOnly={!!editing} defaultValue={editing?.payment_connection_id} /></label>
      {form !== "method" && <label>Display name<input name="display_name" maxLength={200} required defaultValue={editing?.display_name} /></label>}
      {form !== "account" && <label>Currency<input name="currency" required pattern="[A-Z]{3}" defaultValue="KES" /></label>}
      {form === "shop" && <label>Time zone<input name="timezone" required defaultValue="Africa/Nairobi" /></label>}
      {form === "account" && <><label>Provider<select name="provider" aria-label="Provider" value={provider} disabled={!!editing} onChange={e => { const next = e.target.value as typeof provider; setProvider(next); setConfig(JSON.stringify(configs[next], null, 2)); }}><option value="mpesa">M-Pesa</option><option value="pesalink">PesaLink</option></select></label>
        <label>Environment<select name="environment" defaultValue={editing?.environment || "sandbox"} disabled={!!editing}><option value="sandbox">Sandbox</option><option value="production">Production</option></select>{editing && <input type="hidden" name="environment" value={editing.environment} />}</label>
        <label>Merchant account ID<input name="merchant_account_id" required readOnly={!!editing} defaultValue={editing?.merchant_account_id} /></label><label>Account status<select name="status" defaultValue={editing?.status || "active"}><option value="active">Active</option><option value="draining">Draining</option><option value="disabled">Disabled</option></select></label>
        <label className={styles.wide}>Secret version reference<input name="secret_ref" required defaultValue={editing?.credential_secret_ref} placeholder="projects/PROJECT/secrets/duka-payments-TENANT-CONNECTION/versions/1" /></label>
        <label className={styles.wide}>Provider contract<textarea name="provider_config" rows={9} required value={config} onChange={e => setConfig(e.target.value)} spellCheck={false} /></label></>}
      {form === "method" && <><label>Method shop<select name="shop_id" required defaultValue={shop}><option value="">Select shop</option>{data?.shops.filter(row => row.status === "active").map(row => <option value={row.shop_id} key={row.shop_id}>{row.display_name}</option>)}</select></label><label>Merchant connection<select name="connection" required><option value="">Select account</option>{data?.connections.filter(row => row.status === "active").map(row => <option key={row.payment_connection_id} value={row.payment_connection_id}>{row.display_name} / {row.environment}</option>)}</select></label><label>Default for new collections<input name="default" type="checkbox" /></label></>}
    </div><div className={styles.toolbar}><button className="duka-button duka-button--primary" disabled={busy} type="submit"><Save size={16} />Save</button><button className={button} type="button" disabled={busy} onClick={() => setForm(null)}><X size={16} />Cancel</button></div></form>}
    {data && <><section className={styles.section}><h2>Shop methods</h2>{!filtered(data.methods).length && <p>No shop payment methods.</p>}{filtered(data.methods).map(row => {
      const account = data.connections.find(item => item.payment_connection_id === row.payment_connection_id);
      return <article className={styles.method} key={row.payment_method_id}><h3>{data.shops.find(item => item.shop_id === row.shop_id)?.display_name || row.shop_id} / {account?.display_name || row.payment_connection_id}</h3><p>{row.currency} / {row.environment} / {row.status.replaceAll("_", " ")}{row.is_default ? " / default" : ""}</p>
        {data.can_manage && <div className={styles.proof}><button className={button} disabled={busy} onClick={() => action(`/connections/${encodeURIComponent(row.payment_connection_id)}/check`, "POST", undefined, "Merchant authentication checked.")}><ShieldCheck size={16} />Check account</button><label>Confirmed collection ID<input name={`proof_${row.payment_method_id}`} value={proofs[row.payment_method_id] || ""} onChange={e => setProofs({ ...proofs, [row.payment_method_id]: e.target.value })} /></label>
          <button className={button} disabled={busy || !proofs[row.payment_method_id]} onClick={() => action(`/methods/${encodeURIComponent(row.payment_method_id)}/activate`, "POST", { test_payment_intent_id: proofs[row.payment_method_id] }, "Shop method activated.")}><Check size={16} />Activate</button><button className={button} title="Pause new collections" disabled={busy || row.status === "paused"} onClick={() => action(`/methods/${encodeURIComponent(row.payment_method_id)}/pause`, "POST", undefined, "Shop method paused.")}><Pause size={16} />Pause</button>
          <button className={button} disabled={busy} onClick={() => action(`/methods/${encodeURIComponent(row.payment_method_id)}`, "PUT", { shop_id: row.shop_id, payment_connection_id: row.payment_connection_id, currency: row.currency, environment: row.environment, is_default: !row.is_default }, "Default updated.")}>{row.is_default ? "Remove default" : "Make default"}</button>
        </div>}</article>;
    })}</section><section className={styles.section}><h2>Merchant accounts</h2><div className={styles.scroll}><table><thead><tr><th>Account</th><th>Provider</th><th>Environment</th><th>Status</th>{data.can_manage && <th>Manage</th>}</tr></thead><tbody>{data.connections.map(row => <tr key={row.payment_connection_id}><td>{row.display_name}<br />{row.merchant_account_id}</td><td>{row.provider === "mpesa" ? "M-Pesa" : "PesaLink"}</td><td>{row.environment}</td><td>{row.status}</td>{data.can_manage && <td><button className={button} title={`Edit ${row.display_name}`} aria-label={`Edit ${row.display_name}`} onClick={() => edit(row)}><Pencil size={16} /></button></td>}</tr>)}</tbody></table></div></section>
      <section className={styles.section}><h2>Collection history</h2>{!filtered(data.payments).length ? <p>No collections.</p> : <div className={styles.scroll}><table><thead><tr><th>Collection</th><th>Shop</th><th>Amount</th><th>Status</th><th>Evidence</th><th>Allocation</th></tr></thead><tbody>{filtered(data.payments).map(row => <tr key={row.payment_intent_id}><td>{row.payment_intent_id}</td><td>{row.shop_id}</td><td>{row.currency} {row.amount}</td><td>{row.status}</td><td>{row.evidence_status}</td><td>{row.allocation_status}</td></tr>)}</tbody></table></div>}</section></>}
  </div>;
}
