import React from "react";

const CancellationPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">Cancellation Policy</h1>

        <p className="text-gray-600 mb-6">
          Each hotel has its own cancellation rules. Please read them carefully before booking.
        </p>

        <div className="space-y-3 text-gray-700">
          <p>• Some bookings are fully refundable.</p>
          <p>• Some hotels charge a cancellation fee.</p>
          <p>• Free cancellation is available for selected rooms.</p>
          <p>• Refunds are processed within 5–7 business days.</p>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Always check the cancellation terms on the booking page before confirming.
        </p>
      </div>
    </div>
  );
};

export default CancellationPolicy;
