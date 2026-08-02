import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Duka Intelligence, operated by Akili Data.",
};

export default function PrivacyPage() {
  return (
    <main className="px-6 py-16 md:py-20">
      <article className="max-w-4xl mx-auto rounded-2xl border border-gray-200 bg-white p-8 md:p-10 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Privacy Policy</h1>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900">1. Data Controller</h2>
          <p className="mt-4 text-gray-700">The data controller responsible for processing personal data is:</p>
          <p className="mt-3 text-gray-700">
            Akili Data<br />
            Operator of the Duka Intelligence Platform<br />
            38286-00100<br />
            Nairobi<br />
            Kenya<br />
            Email: tsah@dukaintelligence.co.ke
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">2. Data We Collect</h2>
          <p className="mt-4 text-gray-700">When you use the Platform, we may process the following types of data depending on your configuration, integrations, and authorized use.</p>

          <div className="mt-5 space-y-5 text-gray-700">
            <div>
              <p><strong>Business and Operational Data</strong></p>
              <p>Including:</p>
              <ul className="mt-2 space-y-1 list-disc pl-6">
                <li>Business records, transactions, operational metrics, and internal system data</li>
                <li>Customer, member, supplier, product, service, task, or workflow records</li>
                <li>Reports, spreadsheets, documents, files, and structured datasets</li>
                <li>Knowledge objects, summaries, citations, lineage, freshness, and quality metadata</li>
              </ul>
            </div>

            <div>
              <p><strong>Communications and Channel Data</strong></p>
              <p>Where connected or authorized:</p>
              <ul className="mt-2 space-y-1 list-disc pl-6">
                <li>Email messages and metadata</li>
                <li>Chat, WhatsApp, collaboration, and support conversations</li>
                <li>Social media messages, comments, inquiries, engagement signals, and related metadata</li>
                <li>Response drafts, follow-up items, and workflow activity generated through the Platform</li>
              </ul>
            </div>

            <div>
              <p><strong>Personal and Account Information</strong></p>
              <p>Where applicable:</p>
              <ul className="mt-2 space-y-1 list-disc pl-6">
                <li>Names, email addresses, phone numbers, job roles, and organization details</li>
                <li>User names, login credentials, workspace membership, and access permissions</li>
                <li>Customer or contact information contained in connected systems or communications</li>
              </ul>
            </div>

            <div>
              <p><strong>Technical and Usage Data</strong></p>
              <ul className="mt-2 space-y-1 list-disc pl-6">
                <li>IP address</li>
                <li>Device information</li>
                <li>Browser type</li>
                <li>Cookies and usage analytics</li>
                <li>Logs, audit records, query history, and security events</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">3. How We Use Your Data</h2>
          <p className="mt-4 text-gray-700">We process data for the following purposes:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li><strong>Providing Platform Services:</strong> Including connectors, ingestion, knowledge processing, governed retrieval, Duka Agents, dashboards, APIs, chat interfaces, and workflow support.</li>
            <li><strong>Data Integration:</strong> Synchronizing data from authorized business systems, documents, communication channels, social channels, cloud storage, and external APIs.</li>
            <li><strong>AI-Assisted Features:</strong> Supporting search, retrieval, summarization, recommendations, response drafting, workflow routing, and approved task execution.</li>
            <li><strong>Governance and Security:</strong> Applying access controls, tenant isolation, citations, lineage, freshness checks, audit logs, fraud prevention, and system security.</li>
            <li><strong>Platform Improvement:</strong> Monitoring performance, diagnosing issues, improving product functionality, and maintaining service reliability.</li>
            <li><strong>Legal Compliance:</strong> Meeting legal, regulatory, contractual, and security obligations.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">4. Legal Basis for Processing</h2>
          <p className="mt-4 text-gray-700">Where applicable, we process personal data based on:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Performance of a contract with users or customers</li>
            <li>Legitimate business interests in providing, securing, and improving services</li>
            <li>User consent where required</li>
            <li>Compliance with applicable legal obligations</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">5. Sharing Data with Third Parties</h2>
          <p className="mt-4 text-gray-700">
            We may share data with trusted service providers when necessary to operate the Platform.
          </p>
          <p className="mt-3 text-gray-700">Examples include:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Cloud hosting providers</li>
            <li>Infrastructure, database, storage, monitoring, and security services</li>
            <li>AI processing services</li>
            <li>Communication, messaging, social, and integration partners</li>
          </ul>
          <p className="mt-3 text-gray-700">We only share the minimum data necessary for these services, subject to applicable agreements and safeguards.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">6. Data Retention</h2>
          <p className="mt-4 text-gray-700">
            We retain data only for as long as necessary to provide our services, meet legal obligations, resolve disputes, maintain security, and comply with contractual requirements.
          </p>
          <p className="mt-3 text-gray-700">General retention principles include:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Customer Data retained while accounts or applicable services remain active</li>
            <li>Account data retained until account closure or as required for legal and operational purposes</li>
            <li>Logs and audit records retained for security, compliance, troubleshooting, and performance monitoring</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">7. Security</h2>
          <p className="mt-4 text-gray-700">We implement technical and organizational safeguards including:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Secure hosting environments</li>
            <li>Encrypted data transmission</li>
            <li>Access control systems</li>
            <li>Tenant or workspace separation where applicable</li>
            <li>Monitoring, logging, and operational controls</li>
          </ul>
          <p className="mt-3 text-gray-700">However, no digital system can guarantee absolute security.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">8. Your Rights</h2>
          <p className="mt-4 text-gray-700">Depending on applicable law, you may have the right to:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Access your personal data</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your data</li>
            <li>Restrict processing</li>
            <li>Object to certain processing activities</li>
          </ul>
          <p className="mt-3 text-gray-700">Requests can be submitted using the contact details below.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">9. Changes to this Policy</h2>
          <p className="mt-4 text-gray-700">We may update this Privacy Policy from time to time.</p>
          <p className="mt-3 text-gray-700">Any updates will be published on this page with a revised Last Updated date.</p>
          <p className="mt-3 text-gray-700"><strong>Last Updated:</strong> July 23, 2026</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">10. Contact</h2>
          <p className="mt-4 text-gray-700">For questions about this Privacy Policy or our data practices, please contact:</p>
          <p className="mt-3 text-gray-700">
            Duka Intelligence<br />
            38286-00100<br />
            Nairobi<br />
            Kenya<br />
            Email: tsah@dukaintelligence.co.ke
          </p>
        </section>
      </article>
    </main>
  );
}