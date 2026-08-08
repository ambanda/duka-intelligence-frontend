import Link from "next/link";

const messages: Record<string, string> = {
  invalid_login_transaction: "The sign-in attempt expired or could not be verified. Start a new sign-in.",
  oidc_callback_failed: "Your identity provider responded, but Duka could not create an authorized workspace session.",
  oidc_not_configured: "Organization sign-in has not been configured for this deployment.",
  oidc_start_failed: "Duka could not reach the configured identity provider.",
};

export default async function AuthErrorPage({ searchParams }: { searchParams: Promise<{ code?: string }> }) {
  const { code = "authentication_failed" } = await searchParams;
  return (
    <main className="auth-page">
      <section className="auth-panel">
        <p className="eyebrow">Authentication</p>
        <h1>Sign-in was not completed</h1>
        <p>{messages[code] ?? "The sign-in request could not be completed securely."}</p>
        <Link className="duka-button duka-button--secondary auth-panel__button" href="/sign-in">Try again</Link>
      </section>
    </main>
  );
}
