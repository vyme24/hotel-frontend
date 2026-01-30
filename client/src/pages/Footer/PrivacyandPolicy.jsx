import React from "react";
import { Shield, Lock, Eye, Mail, Phone, AlertCircle } from "lucide-react";

const PrivacyandPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-full mb-6">
            <Shield className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-gray-600 mb-4">
            This Privacy Policy explains how BookMyHotelRoom collects, uses, and protects your personal information.
          </p>
          <p className="text-sm text-gray-500">Effective: October 26, 2024</p>
        </div>

        {/* Section 1 */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
          <p className="text-gray-700">
            Welcome to BookMyHotelRoom. We are committed to protecting your privacy. This policy explains how we collect,
            use, and safeguard your information when you use our services.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Information We Collect</h2>
          <ul className="space-y-2 text-gray-700 list-disc pl-5">
            <li>Personal details like name, email, phone number</li>
            <li>Booking and payment-related information</li>
            <li>Browser, device and IP data</li>
            <li>Third-party data if you connect social accounts</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">3. How We Use Your Information</h2>
          <ul className="space-y-2 text-gray-700 list-disc pl-5">
            <li>To process hotel bookings</li>
            <li>To communicate about reservations</li>
            <li>To improve our services</li>
            <li>To prevent fraud</li>
            <li>To send promotions with consent</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="text-blue-600" />
            <h2 className="text-xl font-semibold">4. Data Security</h2>
          </div>
          <p className="text-gray-700">
            We use industry-standard security like encryption and secure servers. However, no system is 100% secure.
          </p>
        </div>

        {/* Section 5 */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Eye className="text-blue-600" />
            <h2 className="text-xl font-semibold">5. Your Rights</h2>
          </div>
          <ul className="space-y-2 text-gray-700 list-disc pl-5">
            <li>Access your personal data</li>
            <li>Correct incorrect information</li>
            <li>Request deletion</li>
            <li>Opt-out from marketing</li>
          </ul>

          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded flex items-center gap-2">
            <AlertCircle className="text-yellow-700" />
            <span className="text-yellow-800 text-sm">
              Contact us at privacy@bookmyhotelroom.com
            </span>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-blue-600 rounded-xl p-6 text-white text-center">
          <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
          <p className="text-blue-100 mb-4">
            For any questions related to this Privacy Policy, reach out to us.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:privacy@bookmyhotelroom.com"
              className="flex items-center justify-center gap-2 bg-white text-blue-600 px-4 py-2 rounded"
            >
              <Mail size={16} /> privacy@bookmyhotelroom.com
            </a>
            <a
              href="tel:+18001234567"
              className="flex items-center justify-center gap-2 border border-white px-4 py-2 rounded"
            >
              <Phone size={16} /> +1 (800) 123-4567
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PrivacyandPolicy;
