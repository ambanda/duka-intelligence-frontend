import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Data Processing Agreement (DPA)",
  description: "Data Processing Agreement for Duka Intelligence operated by Akili Data.",
};

export default function DpaPage() {
  return (
    <main className="px-6 py-16 md:py-20">
      <article className="max-w-4xl mx-auto rounded-2xl border border-gray-200 bg-white p-8 md:p-10 shadow-sm">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Data Processing Agreement (DPA) - Duka Intelligence
        </h1>
        <p className="mt-3 text-gray-700"><strong>Last Updated:</strong> 2026</p>
        <p className="mt-4 text-gray-700">
          This Data Processing Agreement ("DPA") forms part of the Terms and Conditions governing the use of the Duka Intelligence platform ("Platform").
        </p>
        <p className="mt-3 text-gray-700">
          The Platform is operated by Akili Data, located at 38286-00100 Nairobi, Kenya ("Processor", "we", "us", or "our").
        </p>
        <p className="mt-3 text-gray-700">
          This Agreement applies where a customer or user of the Platform ("Controller", "Customer", or "you") processes personal data using the Platform.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">1. Definitions</h2>
          <div className="mt-4 space-y-4 text-gray-700">
            <p><strong>Personal Data</strong><br />Any information relating to an identified or identifiable natural person.</p>
            <p><strong>Processing</strong><br />Any operation performed on personal data including collection, storage, analysis, or deletion.</p>
            <p><strong>Controller</strong><br />The organization that determines the purposes and means of processing personal data.</p>
            <p><strong>Processor</strong><br />Akili Data, which processes personal data on behalf of the Controller.</p>
            <p><strong>Sub-processor</strong><br />Any third party engaged by Akili Data to process personal data on behalf of the Controller.</p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">2. Scope of Processing</h2>
          <p className="mt-4 text-gray-700">
            Duka Intelligence provides analytics, reporting, and data insights based on business data integrated from external systems.
          </p>
          <p className="mt-3 text-gray-700">Processing activities may include:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Storage of business transaction data</li>
            <li>Analysis of sales and operational metrics</li>
            <li>Generation of dashboards and analytics</li>
            <li>Processing of AI-generated insights</li>
            <li>Data integration with third-party systems</li>
          </ul>
          <p className="mt-3 text-gray-700">Personal data processed may include:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Customer names</li>
            <li>Email addresses</li>
            <li>Purchase records</li>
            <li>Transaction identifiers</li>
            <li>Device or technical data</li>
          </ul>
          <p className="mt-3 text-gray-700">The Controller determines the type of data shared with the Platform.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">3. Roles and Responsibilities</h2>
          <p className="mt-4 text-gray-700"><strong>Controller Responsibilities</strong></p>
          <p className="mt-2 text-gray-700">The Customer agrees that:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>They have the legal right to process and share personal data.</li>
            <li>Data collected complies with applicable data protection laws.</li>
            <li>Appropriate notices and consents have been provided to individuals where required.</li>
          </ul>
          <p className="mt-4 text-gray-700"><strong>Processor Responsibilities</strong></p>
          <p className="mt-2 text-gray-700">Akili Data agrees to:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Process personal data only in accordance with the Customer&apos;s instructions.</li>
            <li>Maintain appropriate technical and organizational safeguards.</li>
            <li>Ensure confidentiality of personnel accessing personal data.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">4. Security Measures</h2>
          <p className="mt-4 text-gray-700">Akili Data implements appropriate safeguards including:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Encrypted data transmission</li>
            <li>Secure cloud infrastructure</li>
            <li>Role-based access control</li>
            <li>Monitoring and logging of system activity</li>
            <li>Regular security updates</li>
          </ul>
          <p className="mt-3 text-gray-700">While we apply industry-standard protections, no system can guarantee absolute security.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">5. Sub-processors</h2>
          <p className="mt-4 text-gray-700">
            Akili Data may use third-party service providers to operate the Platform, including:
          </p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Cloud hosting providers</li>
            <li>AI processing services</li>
            <li>Data infrastructure providers</li>
          </ul>
          <p className="mt-3 text-gray-700">
            All sub-processors are required to implement appropriate security and confidentiality measures.
          </p>
          <p className="mt-3 text-gray-700">
            The Customer authorizes Akili Data to engage such sub-processors for the purposes of operating the Platform.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">6. Data Transfers</h2>
          <p className="mt-4 text-gray-700">
            Where personal data is transferred outside Kenya, Akili Data ensures appropriate safeguards are in place to protect personal data in accordance with applicable data protection laws.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">7. Data Breach Notification</h2>
          <p className="mt-4 text-gray-700">In the event of a confirmed personal data breach affecting Customer data, Akili Data will:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Notify the Customer without undue delay</li>
            <li>Provide reasonable information about the breach</li>
            <li>Take steps to mitigate the impact</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">8. Data Retention and Deletion</h2>
          <p className="mt-4 text-gray-700">Personal data is retained only as long as necessary to provide the Platform services.</p>
          <p className="mt-3 text-gray-700">Upon termination of the Customer&apos;s account:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Data may be deleted, anonymized, or returned where technically feasible</li>
            <li>Certain data may be retained where required for legal or security purposes</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">9. Audit and Compliance</h2>
          <p className="mt-4 text-gray-700">
            Akili Data maintains internal security and operational controls designed to protect personal data.
          </p>
          <p className="mt-3 text-gray-700">
            Customers may request reasonable information regarding these safeguards where necessary for compliance with applicable data protection laws.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">10. Liability</h2>
          <p className="mt-4 text-gray-700">Each party remains responsible for compliance with applicable data protection laws.</p>
          <p className="mt-3 text-gray-700">
            Akili Data&apos;s liability relating to personal data processing is subject to the limitations described in the Terms and Conditions.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">11. Governing Law</h2>
          <p className="mt-4 text-gray-700">This Data Processing Agreement shall be governed by the laws of Kenya.</p>
          <p className="mt-3 text-gray-700">
            Any disputes arising from this Agreement shall be subject to the jurisdiction of the courts of Kenya.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">12. Contact</h2>
          <p className="mt-4 text-gray-700">For questions regarding this Data Processing Agreement:</p>
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
