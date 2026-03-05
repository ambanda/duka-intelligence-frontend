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
          <p className="mt-4 text-gray-700">When you use the platform, we may process the following types of data.</p>

          <div className="mt-5 space-y-5 text-gray-700">
            <div>
              <p><strong>Business and Operational Data</strong></p>
              <p>Including:</p>
              <ul className="mt-2 space-y-1 list-disc pl-6">
                <li>Sales transactions</li>
                <li>Product data</li>
                <li>Inventory records</li>
                <li>Order volumes</li>
                <li>Pricing information</li>
              </ul>
            </div>

            <div>
              <p><strong>Customer Data</strong></p>
              <p>Where applicable:</p>
              <ul className="mt-2 space-y-1 list-disc pl-6">
                <li>Email addresses</li>
                <li>Names</li>
                <li>Postal addresses</li>
                <li>Phone numbers</li>
                <li>Purchase history</li>
              </ul>
            </div>

            <div>
              <p><strong>Account Information</strong></p>
              <ul className="mt-2 space-y-1 list-disc pl-6">
                <li>User names</li>
                <li>Email addresses</li>
                <li>Login credentials</li>
              </ul>
            </div>

            <div>
              <p><strong>Technical Data</strong></p>
              <ul className="mt-2 space-y-1 list-disc pl-6">
                <li>IP address</li>
                <li>Device information</li>
                <li>Browser type</li>
                <li>Cookies and usage analytics</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">3. How We Use Your Data</h2>
          <p className="mt-4 text-gray-700">We process data for the following purposes:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li><strong>Providing Platform Services:</strong> Including dashboards, analytics, reports, and APIs.</li>
            <li><strong>Data Integration:</strong> Synchronizing data from POS systems and external APIs.</li>
            <li><strong>Platform Improvement:</strong> Monitoring performance, diagnosing issues, and improving product functionality.</li>
            <li><strong>Security and Compliance:</strong> Preventing fraud, ensuring system security, and complying with legal obligations.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">4. Legal Basis for Processing</h2>
          <p className="mt-4 text-gray-700">Where applicable, we process personal data based on:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Performance of a contract with users</li>
            <li>Legitimate business interests in improving services</li>
            <li>User consent where required</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">5. Sharing Data with Third Parties</h2>
          <p className="mt-4 text-gray-700">
            We may share data with trusted service providers when necessary to operate the platform.
          </p>
          <p className="mt-3 text-gray-700">Examples include:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Cloud hosting providers</li>
            <li>Infrastructure and analytics services</li>
            <li>Integration partners</li>
          </ul>
          <p className="mt-3 text-gray-700">We only share the minimum data necessary for these services.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">6. Data Retention</h2>
          <p className="mt-4 text-gray-700">
            We retain data only for as long as necessary to provide our services and meet legal obligations.
          </p>
          <p className="mt-3 text-gray-700">General retention principles include:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Operational retail data retained while accounts remain active</li>
            <li>Account data retained until account closure</li>
            <li>Logs retained temporarily for security and performance monitoring</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">7. Security</h2>
          <p className="mt-4 text-gray-700">We implement technical and organizational safeguards including:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Secure hosting environments</li>
            <li>Encrypted data transmission</li>
            <li>Access control systems</li>
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
          <p className="mt-3 text-gray-700"><strong>Last Updated:</strong> March 5, 2026</p>
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
