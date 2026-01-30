import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

        <p className="text-gray-600 mb-8">
          We are here to help you. Reach us anytime for support or queries.
        </p>

        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <Phone className="text-blue-600" />
            <span>+1 (800) 123-4567</span>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-blue-600" />
            <span>support@bookmyhotelroom.com</span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="text-blue-600" />
            <span>New Delhi, India</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
