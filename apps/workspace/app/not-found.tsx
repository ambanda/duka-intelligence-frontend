import Link from "next/link";

export default function NotFound() {
  return (
    <main className="auth-page">
      <section className="auth-panel">
        <p className="eyebrow">Not found</p>
        <h1>Workspace unavailable</h1>
        <p>This workspace does not exist or your principal is not assigned to it.</p>
        <Link className="duka-button duka-button--secondary auth-panel__button" href="/">Return to workspace home</Link>
      </section>
    </main>
  );
}
