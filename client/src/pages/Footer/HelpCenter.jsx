import React from "react";

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">Help Center</h1>

        <p className="text-gray-600 mb-6">
          Find answers to common questions about bookings, payments and stays.
        </p>

        <div className="space-y-4 text-gray-700">
          <p>• How do I book a hotel?</p>
          <p>• How can I modify my booking?</p>
          <p>• What payment methods are accepted?</p>
          <p>• How do refunds work?</p>
          <p>• How do I contact support?</p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
