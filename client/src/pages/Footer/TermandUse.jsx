import React from "react";
import { FileText, AlertCircle, Shield, CreditCard, Scale, Mail, Phone, CheckCircle } from "lucide-react";

const TermandUse = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-gray-900 rounded-full mb-6">
            <FileText className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Terms of Use</h1>
          <p className="text-gray-600 mb-4">
            Please read these terms carefully before using BookMyHotelRoom.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded p-4 max-w-2xl mx-auto flex gap-2 text-left">
            <AlertCircle className="text-yellow-700" />
            <p className="text-yellow-800 text-sm">
              By accessing or using our services, you agree to be bound by these terms.
              If you do not agree, please do not use our services.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing or using BookMyHotelRoom, you agree to these Terms of Use.
            If you do not agree, please do not use our site or services.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3">2. Service Description</h2>
          <p className="text-gray-700 mb-3">
            BookMyHotelRoom provides an online platform for booking hotel rooms.
            We act only as an intermediary and do not own or operate hotels.
          </p>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
            We are a booking platform only. All hotel services are provided by third-party partners.
          </p>
        </div>

        {/* Section 3 */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3">3. User Eligibility</h2>
          <p className="text-gray-700">
            You must be at least 18 years old to use our services.
          </p>
        </div>

        {/* Section 4 */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="text-blue-600" />
            <h2 className="text-xl font-semibold">4. Account Security</h2>
          </div>
          <p className="text-gray-700">
            You are responsible for maintaining the confidentiality of your account.
            Notify us immediately of any unauthorized use.
          </p>
        </div>

        {/* Section 5 */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="text-blue-600" />
            <h2 className="text-xl font-semibold">5. Booking & Payments</h2>
          </div>
          <p className="text-gray-700">
            Bookings are subject to availability and hotel policies. Payments are processed securely via third-party providers.
          </p>
        </div>

        {/* Section 6 */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-3">6. User Conduct</h2>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Do not use the site for illegal activities</li>
            <li>Do not post harmful or false content</li>
            <li>Do not attempt to hack or disrupt services</li>
            <li>Do not create fake bookings</li>
          </ul>
        </div>

        {/* Section 7 */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Scale className="text-blue-600" />
            <h2 className="text-xl font-semibold">7. Limitation of Liability</h2>
          </div>
          <p className="text-gray-700">
            Our services are provided “as is”. We are not liable for indirect or consequential damages.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-gray-900 rounded-xl p-6 text-white text-center">
          <h2 className="text-xl font-semibold mb-3">Contact</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a className="flex items-center justify-center gap-2" href="mailto:legal@bookmyhotelroom.com">
              <Mail size={16} /> legal@bookmyhotelroom.com
            </a>
            <a className="flex items-center justify-center gap-2" href="tel:+18001234567">
              <Phone size={16} /> +91 88948 10531
            </a>
          </div>
        </div>

        {/* Final */}
        <div className="bg-white rounded-xl shadow p-6 mt-8 text-center">
          <CheckCircle className="text-green-500 mx-auto mb-2" />
          <p className="text-gray-700">
            By continuing to use BookMyHotelRoom, you agree to these Terms of Use.
          </p>
        </div>

      </div>
    </div>
  );
};

export default TermandUse;
