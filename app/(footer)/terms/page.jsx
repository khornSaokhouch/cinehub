"use client";
import React from "react";

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 sm:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Page Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center text-indigo-400">
          Terms of Use
        </h1>

        {/* Intro Paragraph */}
        <p className="text-gray-200 text-lg leading-relaxed mb-8 text-center">
          Welcome! These Terms of Use govern your access and use of our services. By using our platform, you agree to comply with these terms.
        </p>

        <div className="space-y-8 bg-gray-900/60 border border-gray-800 rounded-2xl shadow-lg p-8 sm:p-10">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-3">1. Acceptance of Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              By accessing or using our services, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree, please do not use our platform.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-3">2. User Accounts</h2>
            <p className="text-gray-300 leading-relaxed">
              You are responsible for maintaining the confidentiality of your account credentials. Any activity under your account is your responsibility. You agree to notify us immediately of any unauthorized use.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-3">3. Use of Services</h2>
            <p className="text-gray-300 leading-relaxed">
              You agree to use our services for lawful purposes only. You may not engage in any activity that disrupts, harms, or interferes with the platform or other users.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-3">4. Intellectual Property</h2>
            <p className="text-gray-300 leading-relaxed">
              All content, features, and functionality are the property of our company or our licensors and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without permission.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-3">5. Termination</h2>
            <p className="text-gray-300 leading-relaxed">
              We reserve the right to suspend or terminate your access to the platform at any time, without notice, for violation of these Terms or for any reason we deem necessary.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-3">6. Limitation of Liability</h2>
            <p className="text-gray-300 leading-relaxed">
              To the maximum extent permitted by law, we shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of our services.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-3">7. Changes to Terms</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update these Terms of Use from time to time. Changes will be posted on this page with the date of the latest revision. Continued use of the platform constitutes acceptance of the updated terms.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-3">Contact Us</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about these Terms of Use, please contact us at{" "}
              <a href="mailto:support@example.com" className="text-indigo-400 hover:text-indigo-300 underline">
                support@example.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
