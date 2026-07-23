import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions for the Duka Intelligence platform operated by Akili Data.",
};

export default function TermsPage() {
  return (
    <main className="px-6 py-16 md:py-20">
      <article className="max-w-4xl mx-auto rounded-2xl border border-gray-200 bg-white p-8 md:p-10 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Terms and Conditions - Duka Intelligence
        </h1>
        <p className="mt-4 text-gray-700">
          These Terms and Conditions ("Terms") govern the use of the Duka Intelligence platform, available at dukaintelligence.co.ke.
        </p>
        <p className="mt-3 text-gray-700">
          The platform is owned and operated by Akili Data, a business registered in Kenya.
        </p>
        <p className="mt-3 text-gray-700">
          In these Terms, "we", "us", or "our" refers to Akili Data, the operator of the Duka Intelligence platform.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">1. Definitions</h2>
          <div className="mt-4 space-y-4 text-gray-700">
            <p><strong>Platform</strong><br />The Duka Intelligence software platform, including the Core Platform, integrations, knowledge processing services, Duka Agents, dashboards, APIs, chat interfaces, and related workflow features.</p>
            <p><strong>User / You</strong><br />Any individual or organization accessing or using the Platform.</p>
            <p><strong>Customer Data</strong><br />Data, documents, communications, records, files, messages, social channel content, metadata, or other organizational information provided, connected, uploaded, generated, or processed through the Platform.</p>
            <p><strong>Duka Agents</strong><br />AI-powered assistants made available through the Platform to search, retrieve, summarize, recommend, draft, route, or support approved actions based on governed knowledge and configured permissions.</p>
            <p><strong>Third-Party Services</strong><br />External systems, APIs, software, communication channels, cloud services, or data sources integrated with or used by the Platform.</p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">2. Scope of Service</h2>
          <p className="mt-4 text-gray-700">
            Duka Intelligence provides tools that help organizations connect, process, govern, search, and act on enterprise knowledge through AI-assisted workflows.
          </p>
          <p className="mt-3 text-gray-700">The Platform may include services such as:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Connectors for business systems, documents, communication channels, social channels, and APIs</li>
            <li>Structured and unstructured data processing</li>
            <li>Governed knowledge objects, access controls, citations, lineage, and freshness indicators</li>
            <li>Duka Agents for search, retrieval, summaries, recommendations, drafting, and approved workflow support</li>
            <li>Dashboards, chat interfaces, knowledge APIs, and embedded workflow surfaces</li>
          </ul>
          <p className="mt-3 text-gray-700">
            We reserve the right to update, modify, suspend, or discontinue features of the Platform at any time.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">3. Account and Access</h2>
          <p className="mt-4 text-gray-700">To use certain features of the Platform, you may be required to create an account or be authorized by an organization.</p>
          <p className="mt-3 text-gray-700">You agree to:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Provide accurate and complete information</li>
            <li>Maintain the confidentiality of your account credentials</li>
            <li>Use only accounts, workspaces, data, and features you are authorized to access</li>
            <li>Notify us immediately if you suspect unauthorized access</li>
          </ul>
          <p className="mt-3 text-gray-700">You are responsible for all activities that occur under your account.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">4. User Obligations</h2>
          <p className="mt-4 text-gray-700">
            You are responsible for the accuracy, legality, permissions, and authorization of any data, systems, communication channels, or content you connect or upload to the Platform.
          </p>
          <p className="mt-3 text-gray-700">You agree not to:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Attempt unauthorized access to systems, accounts, workspaces, or data</li>
            <li>Use the Platform for unlawful, harmful, deceptive, or abusive activities</li>
            <li>Upload harmful, malicious, illegal, or rights-infringing content</li>
            <li>Interfere with the operation, security, reliability, or integrity of the Platform</li>
            <li>Use Duka Agents to make automated decisions where human review is legally or organizationally required</li>
          </ul>
          <p className="mt-3 text-gray-700">Violation of these Terms may result in suspension or termination of access.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">5. Subscription and Payment</h2>
          <p className="mt-4 text-gray-700">Access to certain services may require payment, subscription fees, implementation fees, usage fees, or a custom commercial proposal.</p>
          <p className="mt-3 text-gray-700">Where applicable:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Fees are billed according to the selected plan, proposal, or agreement</li>
            <li>Payments may be recurring unless cancelled according to the applicable terms</li>
            <li>Failure to make payment may result in suspension of service</li>
          </ul>
          <p className="mt-3 text-gray-700">Pricing and subscription terms may be updated from time to time.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">6. Data Ownership and Privacy</h2>
          <p className="mt-4 text-gray-700">You retain ownership of Customer Data you provide, upload, connect, or authorize for processing through the Platform.</p>
          <p className="mt-3 text-gray-700">
            Duka Intelligence processes Customer Data to provide platform services, integrations, knowledge processing, governed retrieval, Duka Agent functionality, dashboards, APIs, workflow support, security, and related operations.
          </p>
          <p className="mt-3 text-gray-700">Our handling of personal data is further described in our Privacy Policy.</p>
          <p className="mt-3 text-gray-700">
            We implement security safeguards but cannot guarantee complete protection from all cybersecurity risks.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">7. Intellectual Property</h2>
          <p className="mt-4 text-gray-700">
            All intellectual property rights related to the Platform, software, connectors, Duka Agents, knowledge processing methods, models, user interfaces, documentation, and related technology remain the property of Duka Intelligence, Akili Data, or their licensors.
          </p>
          <p className="mt-3 text-gray-700">
            You are granted a limited, non-exclusive, non-transferable license to use the Platform in accordance with these Terms.
          </p>
          <p className="mt-3 text-gray-700">You may not:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Reverse engineer the Platform</li>
            <li>Copy or redistribute proprietary software</li>
            <li>Attempt to recreate the Platform&apos;s technology</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">8. AI Outputs, Liability, and Disclaimer</h2>
          <p className="mt-4 text-gray-700">The Platform is provided "as is" and "as available." AI-generated outputs, recommendations, summaries, retrieved answers, drafts, and workflow suggestions are provided for informational and operational support.</p>
          <p className="mt-3 text-gray-700">We do not guarantee:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Uninterrupted operation</li>
            <li>Error-free, complete, or always current outputs</li>
            <li>Continuous availability</li>
            <li>That AI-generated recommendations are suitable for every decision or use case</li>
          </ul>
          <p className="mt-3 text-gray-700">Users remain responsible for reviewing outputs and making decisions based on their own judgment, policies, and applicable laws.</p>
          <p className="mt-3 text-gray-700">To the maximum extent permitted under Kenyan law:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Duka Intelligence is not liable for indirect, incidental, or consequential damages</li>
            <li>This includes loss of profits, business interruption, or data loss</li>
            <li>Total liability shall not exceed the amount paid by the user for the service within the 12 months preceding the claim.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">9. Termination</h2>
          <p className="mt-4 text-gray-700">You may terminate your use of the Platform at any time.</p>
          <p className="mt-3 text-gray-700">We may suspend or terminate accounts if:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>These Terms are violated</li>
            <li>Payment obligations are not met</li>
            <li>Misuse of the Platform is detected</li>
          </ul>
          <p className="mt-3 text-gray-700">Upon termination:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Access to the Platform will end</li>
            <li>Certain data may be deleted, returned, retained, or anonymized after a reasonable retention period, subject to applicable law and technical feasibility</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">10. Third-Party Services</h2>
          <p className="mt-4 text-gray-700">The Platform may rely on or integrate with external providers, including cloud providers, AI processing services, communications providers, data systems, social platforms, and APIs.</p>
          <p className="mt-3 text-gray-700">Duka Intelligence is not responsible for:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Availability of third-party services</li>
            <li>Errors or downtime caused by external providers</li>
            <li>Terms governing those services</li>
          </ul>
          <p className="mt-3 text-gray-700">
            Your use of such services may be subject to their own terms and conditions.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">11. Governing Law and Jurisdiction</h2>
          <p className="mt-4 text-gray-700">These Terms are governed by the laws of the Republic of Kenya.</p>
          <p className="mt-3 text-gray-700">
            Any disputes arising in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Kenya.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">12. Changes to the Terms</h2>
          <p className="mt-4 text-gray-700">We may update these Terms from time to time.</p>
          <p className="mt-3 text-gray-700">
            If significant changes occur, we will notify users through the Platform or via email.
          </p>
          <p className="mt-3 text-gray-700">
            Continued use of the Platform after changes indicates acceptance of the revised Terms.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">13. Contact</h2>
          <p className="mt-4 text-gray-700">For questions regarding these Terms, please contact us:</p>
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