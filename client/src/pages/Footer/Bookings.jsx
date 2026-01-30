import React from "react";

const Bookings = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>

        <p className="text-gray-600 mb-6">
          Here you can view and manage all your hotel bookings.
        </p>

        <p className="text-gray-700">
          Login to your account to:
        </p>

        <div className="mt-4 space-y-2 text-gray-700">
          <p>• View upcoming stays</p>
          <p>• Download booking invoices</p>
          <p>• Modify your reservation</p>
          <p>• Cancel bookings</p>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
