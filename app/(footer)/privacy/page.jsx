"use client";
import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 sm:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Page Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-center text-indigo-400">
          Privacy Policy
        </h1>

        {/* Intro Paragraph */}
        <p className="text-gray-200 text-lg leading-relaxed mb-8 text-center">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.
        </p>

        <div className="space-y-8 bg-gray-900/60 border border-gray-800 rounded-2xl shadow-lg p-8 sm:p-10">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-3">1. Information We Collect</h2>
            <p className="text-gray-300 leading-relaxed">
              We collect information you provide directly to us, such as your name, email address, and payment details. We also collect information automatically about your use of our services, including device information, IP address, and browsing behavior.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-300 leading-relaxed">
              We use the information we collect to provide and improve our services, process transactions, communicate with you, and ensure security. We may also use aggregated or anonymized data for analytics and research purposes.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-3">3. Sharing Your Information</h2>
            <p className="text-gray-300 leading-relaxed">
              We do not sell your personal information. We may share information with trusted third-party service providers to operate our services, comply with legal obligations, or protect our rights.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-3">4. Your Choices</h2>
            <p className="text-gray-300 leading-relaxed">
              You can update your account information, manage your communication preferences, and request deletion of your personal data. Please contact our support team for assistance with these requests.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-3">5. Security</h2>
            <p className="text-gray-300 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your data. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-3">6. Updates to This Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-3">Contact Us</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy, please contact us at{" "}
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
