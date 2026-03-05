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
            <p><strong>Platform</strong><br />The Duka Intelligence software platform that provides retail analytics, data processing, dashboards, APIs, and reporting services.</p>
            <p><strong>User / You</strong><br />Any individual or organization accessing or using the platform.</p>
            <p><strong>Retail Data</strong><br />Business data including sales, inventory, pricing, transactions, or related operational metrics originating from connected POS systems.</p>
            <p><strong>Third-Party Services</strong><br />External systems, APIs, or software integrated with the platform.</p>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">2. Scope of Service</h2>
          <p className="mt-4 text-gray-700">
            Duka Intelligence provides tools that transform retail operational data into analytics and insights.
          </p>
          <p className="mt-3 text-gray-700">The platform may include services such as:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Embedded analytics dashboards</li>
            <li>Retail intelligence reports</li>
            <li>Data APIs for partners and applications</li>
            <li>Automated reporting tools</li>
          </ul>
          <p className="mt-3 text-gray-700">
            We reserve the right to update, modify, suspend, or discontinue features of the platform at any time.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">3. Account and Access</h2>
          <p className="mt-4 text-gray-700">To use certain features of the platform, you may be required to create an account.</p>
          <p className="mt-3 text-gray-700">You agree to:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Provide accurate and complete information</li>
            <li>Maintain the confidentiality of your account credentials</li>
            <li>Notify us immediately if you suspect unauthorized access</li>
          </ul>
          <p className="mt-3 text-gray-700">You are responsible for all activities that occur under your account.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">4. User Obligations</h2>
          <p className="mt-4 text-gray-700">
            You are responsible for the accuracy and legality of any data you connect or upload to the platform.
          </p>
          <p className="mt-3 text-gray-700">You agree not to:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Attempt unauthorized access to systems or data</li>
            <li>Use the platform for unlawful activities</li>
            <li>Upload harmful, malicious, or illegal content</li>
            <li>Interfere with the operation or security of the platform</li>
          </ul>
          <p className="mt-3 text-gray-700">Violation of these terms may result in suspension or termination of access.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">5. Subscription and Payment</h2>
          <p className="mt-4 text-gray-700">Access to certain services may require payment or subscription fees.</p>
          <p className="mt-3 text-gray-700">Where applicable:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Fees are billed according to the selected plan</li>
            <li>Payments may be recurring unless cancelled</li>
            <li>Failure to make payment may result in suspension of service</li>
          </ul>
          <p className="mt-3 text-gray-700">Pricing and subscription terms may be updated from time to time.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">6. Data Ownership and Privacy</h2>
          <p className="mt-4 text-gray-700">You retain ownership of all business data you provide or connect to the platform.</p>
          <p className="mt-3 text-gray-700">
            Duka Intelligence processes this data in order to provide analytics services, insights, dashboards, and related functionality.
          </p>
          <p className="mt-3 text-gray-700">Our handling of personal data is further described in our Privacy Policy.</p>
          <p className="mt-3 text-gray-700">
            We implement security safeguards but cannot guarantee complete protection from all cybersecurity risks.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">7. Intellectual Property</h2>
          <p className="mt-4 text-gray-700">
            All intellectual property rights related to the platform, software, analytics models, and documentation remain the property of Duka Intelligence or its licensors.
          </p>
          <p className="mt-3 text-gray-700">
            You are granted a limited, non-exclusive, non-transferable license to use the platform in accordance with these Terms.
          </p>
          <p className="mt-3 text-gray-700">You may not:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Reverse engineer the platform</li>
            <li>Copy or redistribute proprietary software</li>
            <li>Attempt to recreate the platform&apos;s technology</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">8. Liability and Disclaimer</h2>
          <p className="mt-4 text-gray-700">The platform is provided "as is" and "as available."</p>
          <p className="mt-3 text-gray-700">We do not guarantee:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Uninterrupted operation</li>
            <li>Error-free analytics results</li>
            <li>Continuous availability</li>
          </ul>
          <p className="mt-3 text-gray-700">To the maximum extent permitted under Kenyan law:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Duka Intelligence is not liable for indirect, incidental, or consequential damages</li>
            <li>This includes loss of profits, business interruption, or data loss</li>
            <li>Total liability shall not exceed the amount paid by the user for the service within the 12 months preceding the claim.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">9. Termination</h2>
          <p className="mt-4 text-gray-700">You may terminate your use of the platform at any time.</p>
          <p className="mt-3 text-gray-700">We may suspend or terminate accounts if:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>These Terms are violated</li>
            <li>Payment obligations are not met</li>
            <li>Misuse of the platform is detected</li>
          </ul>
          <p className="mt-3 text-gray-700">Upon termination:</p>
          <ul className="mt-3 space-y-2 text-gray-700 list-disc pl-6">
            <li>Access to the platform will end</li>
            <li>Certain data may be deleted or anonymized after a reasonable retention period</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-900">10. Third-Party Services</h2>
          <p className="mt-4 text-gray-700">The platform may rely on or integrate with external providers.</p>
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
            If significant changes occur, we will notify users through the platform or via email.
          </p>
          <p className="mt-3 text-gray-700">
            Continued use of the platform after changes indicates acceptance of the revised Terms.
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
