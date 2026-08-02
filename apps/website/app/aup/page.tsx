import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Acceptable Use Policy (AUP)",
  description: "Acceptable Use Policy for Duka Intelligence operated by Akili Data.",
};

export default function AupPage() {
  return (
    <main className="px-6 py-16 md:py-20">
      <article className="max-w-4xl mx-auto rounded-2xl border border-gray-200 bg-white p-8 md:p-10 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Acceptable Use Policy (AUP) - Duka Intelligence
        </h1>
        <p className="mt-3 text-gray-700"><strong>Last Updated:</strong> 2026</p>
        <p className="mt-4 text-gray-700">
          This Acceptable Use Policy ("AUP") governs the use of the Duka Intelligence platform operated by Akili Data.
        </p>
        <p className="mt-3 text-gray-700">By using the Platform, you agree to comply with this policy.</p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">1. Purpose</h2>
          <p className="mt-4 text-gray-700">
            Duka Intelligence is designed to unify and govern enterprise knowledge, power Duka Agents, support enterprise search, social media listening, operational knowledge workflows, and approved AI-assisted actions.
          </p>
          <p className="mt-3 text-gray-700">
            Users must use the Platform responsibly, only with authorized data and systems, and in compliance with applicable laws, organizational policies, and third-party terms.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">2. Prohibited Activities</h2>
          <p className="mt-4 text-gray-700">Users may not use the Platform to:</p>

          <div className="mt-5 space-y-6 text-gray-700">
            <div>
              <p><strong>Illegal Activities</strong></p>
              <ul className="mt-2 space-y-2 list-disc pl-6">
                <li>Violate any applicable law or regulation</li>
                <li>Process, retrieve, or connect data obtained illegally</li>
                <li>Facilitate fraud, money laundering, harassment, discrimination, or other criminal activity</li>
              </ul>
            </div>

            <div>
              <p><strong>Unauthorized Access</strong></p>
              <ul className="mt-2 space-y-2 list-disc pl-6">
                <li>Attempt to gain unauthorized access to systems, accounts, workspaces, channels, or data</li>
                <li>Connect systems, inboxes, files, social accounts, or APIs without proper authorization</li>
                <li>Probe, scan, or test vulnerabilities of the Platform</li>
                <li>Circumvent security, authentication, access controls, or workspace permissions</li>
              </ul>
            </div>

            <div>
              <p><strong>Harmful Content</strong></p>
              <p className="mt-2">Users may not upload, connect, generate, or process:</p>
              <ul className="mt-2 space-y-2 list-disc pl-6">
                <li>Malware or malicious software</li>
                <li>Content designed to disrupt systems</li>
                <li>Data intended to harm individuals, organizations, or public safety</li>
                <li>Content that infringes intellectual property, privacy, confidentiality, or contractual rights</li>
              </ul>
            </div>

            <div>
              <p><strong>Abuse of Services</strong></p>
              <p className="mt-2">Users may not:</p>
              <ul className="mt-2 space-y-2 list-disc pl-6">
                <li>Overload or interfere with the Platform</li>
                <li>Use automated tools that disrupt normal operation</li>
                <li>Resell or exploit the service without authorization</li>
                <li>Use the Platform to create competing services through unauthorized copying or reverse engineering</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">3. Data Responsibility</h2>
          <p className="mt-4 text-gray-700">
            Users are responsible for ensuring that any data, system, document, communication channel, social channel, or API connected to the Platform:
          </p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Is lawfully collected and authorized for processing</li>
            <li>Does not violate privacy, confidentiality, intellectual property, or contractual rights</li>
            <li>Complies with applicable data protection laws</li>
            <li>Is accessed and used according to the user&apos;s role, permissions, and organizational policies</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">4. AI and Agent Usage</h2>
          <p className="mt-4 text-gray-700">Where the Platform provides AI-generated outputs, Duka Agent responses, recommendations, drafts, summaries, or workflow suggestions:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Outputs are informational and operational support, and should not be treated as guaranteed facts, predictions, legal advice, financial advice, or professional advice.</li>
            <li>Users remain responsible for reviewing outputs before relying on them or taking action.</li>
            <li>Users must not use AI outputs to make decisions where human review is required by law, regulation, contract, or organizational policy.</li>
            <li>Users must not attempt to bypass configured access controls, citations, approval flows, or allowed-action boundaries.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">5. Enforcement</h2>
          <p className="mt-4 text-gray-700">Akili Data reserves the right to:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Suspend or terminate accounts violating this policy</li>
            <li>Remove, disable, or restrict data, content, integrations, agents, or workflows that violate this policy</li>
            <li>Investigate suspected misuse</li>
            <li>Limit or block access to protect users, customers, third parties, or the Platform</li>
          </ul>
          <p className="mt-3 text-gray-700">Serious violations may be reported to relevant authorities.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">6. Changes to This Policy</h2>
          <p className="mt-4 text-gray-700">Akili Data may update this Acceptable Use Policy periodically.</p>
          <p className="mt-3 text-gray-700">
            Continued use of the Platform after updates constitutes acceptance of the revised policy.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">7. Contact</h2>
          <p className="mt-4 text-gray-700">If you have questions regarding this Acceptable Use Policy:</p>
          <p className="mt-3 text-gray-700">
            Akili Data<br />
            38286-00100 Nairobi<br />
            Kenya<br />
            Email: tsah@dukaintelligence.co.ke
          </p>
        </section>
      </article>
    </main>
  );
}