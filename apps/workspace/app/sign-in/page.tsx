import Image from "next/image";
import Link from "next/link";

import { oidcConfigured } from "@/lib/auth/config";
import { getServerSession } from "@/lib/auth/session";

export default async function SignInPage({ searchParams }: { searchParams: Promise<{ signedOut?: string }> }) {
  const session = await getServerSession();
  const workspace = session?.memberships[0];
  const { signedOut } = await searchParams;
  const websiteUrl = process.env.NEXT_PUBLIC_DUKA_WEBSITE_URL ?? "https://dukaintelligence.co.ke";
  const canSignIn = oidcConfigured();

  return (
    <main className="auth-page">
      <section className="auth-panel" aria-labelledby="sign-in-heading">
        <Image src="/logo-icon-square.png" alt="Duka Intelligence" width={44} height={44} priority />
        <div className="auth-panel__heading">
          <p className="eyebrow">Duka Workspace</p>
          <h1 id="sign-in-heading">Sign in to your workspace</h1>
          <p>Manage authorized knowledge, skills, channels, users, and access from one operational console.</p>
        </div>
        {signedOut === "1" ? <p className="auth-notice">You have signed out securely.</p> : null}
        {workspace ? (
          <Link className="duka-button duka-button--primary auth-panel__button" href={`/w/${workspace.workspaceSlug}/overview`}>
            Continue to {workspace.displayName}
          </Link>
        ) : canSignIn ? (
          <Link className="duka-button duka-button--primary auth-panel__button" href="/auth/sign-in">
            Continue with organization sign-in
          </Link>
        ) : (
          <button className="duka-button duka-button--primary auth-panel__button" disabled>
            Organization sign-in is being configured
          </button>
        )}
        <p className="auth-panel__note">Duka verifies your identity, then loads workspace access from authoritative principal assignments.</p>
        <a className="text-link" href={websiteUrl}>Return to Duka Intelligence</a>
      </section>
    </main>
  );
}
